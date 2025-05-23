import { inject, Injectable } from '@angular/core';
import { UserService } from '../user/shared.service';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { NavigationService } from '../navigation/navigation.service';
import { User } from '../../models/user/user';
import { arrayUnion, deleteDoc, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { signInAnonymously, signInWithEmailAndPassword } from '@firebase/auth';
import { FireServiceService } from '../firebase/fire-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService: UserService = inject(UserService);
  private auth: Auth = inject(Auth);
  private navigationService: NavigationService = inject(NavigationService);
  private firestore: Firestore = inject(Firestore);
  private shared: UserService = inject(UserService);
  private fireService = inject(FireServiceService);
  googleAuthProvider = new GoogleAuthProvider();
  error = false;
  isLoading = false;

  /**
   * Logs in a user using email and password.
   * Sets the user online and redirects to the dashboard on success.
   * Sets an error flag on failure.
   *
   * @param email - User's email address
   * @param password - User's password
   */
  public async logInWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      await this.shared.setOnlineStatus();
      this.shared.redirectiontodashboard();
    } catch (error) {
      this.error = true;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Logs in a user with Google authentication.
   * Updates user profile and sets online status.
   * Creates a user document in Firestore if needed.
   * Sets an error flag on failure.
   */
  public async logInWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.googleAuthProvider);
      const firebaseUser = result.user;
      await updateProfile(firebaseUser, {
        photoURL: 'img/profilephoto.png',
      });

      const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
      await setDoc(userDocRef, {
        fullname: firebaseUser.displayName,
        email: firebaseUser.email,
        profilephoto: 'img/profilephoto.png',
        online: true,
      });
      await this.shared.setOnlineStatus();
      this.shared.redirectiontodashboard();
    } catch (error) {
      this.error = true;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Logs in the user anonymously as a guest.
   * Creates a guest profile in Firestore and redirects to the dashboard.
   * Sets loading state and logs errors if any occur.
   */
  public async loginAsGuest() {
    this.isLoading = true;
    try {
      const result = await signInAnonymously(this.auth);
      await updateProfile(result.user, {
        displayName: 'Gast',
        photoURL: 'img/profilephoto.png',
      });

      const userDocRef = doc(this.firestore, `users/${result.user.uid}`);
      await setDoc(userDocRef, {
        fullname: 'Gast',
        email: null,
        profilephoto: 'img/profilephoto.png',
        online: true,
        isAnonymous: true,
      });
      await this.shared.setOnlineStatus();
      this.shared.redirectiontodashboard();
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Registers a new user with email and password.
   * Updates user profile and creates the user document in Firestore.
   * Adds the user to a default channel.
   *
   * @param user - The user data for registration
   */
  public async register(user: User): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);
    const firebaseUser = userCredential.user;
    await updateProfile(firebaseUser, {
      displayName: user.fullname,
      photoURL: user.profilephoto,
    });
    const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
    await setDoc(userDocRef, {
      fullname: user.fullname,
      email: user.email,
      profilephoto: user.profilephoto,
      online: false,
      id: firebaseUser.uid,
    });
    const defaultChannelRef = doc(this.firestore, `channels/KqvcY68R1jP2UsQkv6Nz`);
    await updateDoc(defaultChannelRef, {
      member: arrayUnion({
        fullname: user.fullname,
        email: user.email,
        profilephoto: user.profilephoto,
        online: false,
        id: firebaseUser.uid,
      }),
    });
  }

  /**
   * Logs out the currently authenticated user.
   * Updates online status, deletes anonymous user data, and redirects to the login page.
   */
  public async logOut() {
    this.navigationService.isInitialize = false;
    const currentUser = this.userService.getUser();
    currentUser.online = false;
    await this.fireService.updateOnlineStatus(currentUser);
    if (this.auth.currentUser?.isAnonymous) {
      await deleteDoc(doc(this.firestore, `users/${currentUser.id}`));
      await this.auth.currentUser.delete();
    } else {
      await signOut(this.auth);
    }
    this.userService.redirectiontologinpage();
  }
}
