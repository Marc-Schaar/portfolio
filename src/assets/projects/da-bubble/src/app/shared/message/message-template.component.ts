import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user/shared.service';
import { FireServiceService } from '../../services/firebase/fire-service.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Message } from '../../models/message/message';
import { FormsModule } from '@angular/forms';
import { DialogReciverComponent } from '../../dialogs/dialog-reciver/dialog-reciver.component';
import { MatDialog } from '@angular/material/dialog';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { NavigationService } from '../../services/navigation/navigation.service';
import emojiData from 'unicode-emoji-json';
import { LinkifyPipe } from '../../pipes/linkify.pipe';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-message-template',
  imports: [CommonModule, MatIconModule, FormsModule, LinkifyPipe],
  templateUrl: './message-template.component.html',
  styleUrl: './message-template.component.scss',
})
export class MessageTemplateComponent implements OnInit {
  public userService: UserService = inject(UserService);
  private fireService: FireServiceService = inject(FireServiceService);
  private router: Router = inject(Router);
  private dialog = inject(MatDialog);
  public navigationService: NavigationService = inject(NavigationService);
  private firestore: Firestore = inject(Firestore);
  menuOpen: boolean = false;
  reactionMenuOpen: boolean = false;
  reactionMenuOpenInFooter: boolean = false;
  isEditing: boolean = false;
  showAllReactions: boolean = false;
  userId: string | undefined = '';
  inputEdit: string = '';
  emojis: string[] = [
    'emoji _nerd face_',
    'emoji _person raising both hands in celebration_',
    'emoji _rocket_',
    'emoji _white heavy check mark_',
  ];
  public emojiDataBase: any;
  public preSelectedEmojis: Record<string, string> = {
    thumbsUp: '\u{1F44D}',
    checkMark: '\u{2705}',
    rocket: '\u{1F680}',
    nerd: '\u{1F913}',
  };
  public preSelectedEmojiList = Object.values(this.preSelectedEmojis);
  @Input() message: any;
  @Input() currentChannelId: string = '';
  @Input() parentMessageId: string = '';
  @Input() isThread: boolean = false;
  @Input() channelType: 'direct' | 'channel' | 'thread' | null = null;

  /**
   * Initializes the component by setting the current user ID
   * and loading the emoji database.
   */
  constructor() {
    this.userId = this.userService.auth.currentUser?.uid;
    this.emojiDataBase = emojiData;
  }

  /**
   * Lifecycle hook called after component initialization.
   * Ensures the navigation service is initialized.
   */
  ngOnInit(): void {
    if (!this.navigationService.isInitialize) {
      this.navigationService.initialize();
    }
  }

  /**
   * Enables editing mode for a specific message.
   * @param message - The message to edit
   * @param index - Index of the message in the message list
   */
  public editMessage(message: Message) {
    this.menuOpen = false;
    this.isEditing = true;
    this.inputEdit = message.message;
  }

  public async updateMessage(message: any) {
    this.isThread ? this.updateThreadMessage(message) : this.updateChannelMessage(message);
  }

  /**
   * Updates the message after editing.
   * @param message - The message to update.
   */
  private updateThreadMessage(message: any) {
    let messageRef = this.fireService.getMessageThreadRef(this.currentChannelId, this.parentMessageId, message.id);
    if (messageRef) {
      this.isEditing = false;
      try {
        this.fireService.updateMessage(messageRef, this.inputEdit);
        this.inputEdit = '';
      } catch (error) {}
    }
  }

  /**
   * Updates the content of an edited message.
   * @param message - The message to update
   */

  private updateChannelMessage(message: any) {
    let messageRef = this.fireService.getMessageRef(this.currentChannelId, message.id);
    if (messageRef) {
      this.isEditing = false;
      this.fireService.updateMessage(messageRef, this.inputEdit);
      this.inputEdit = '';
    }
  }

  /**
   * Opens the thread view for a specific message.
   * @param messageId - ID of the message to open
   * @param $event - The click event
   */
  public openThread(messageId: string) {
    if (!this.navigationService.isMobile) this.navigationService.toggleThread('open');
    this.userService.setUrl('thread', this.currentChannelId, this.userId, messageId);
  }

  /**
   * Adds a reaction to a message or removes it if already reacted.
   * @param message - The message to react to
   * @param emoji - The emoji reaction
   */
  public addReaction(message: any, emoji: string) {
    let messageRef;
    this.isThread
      ? (messageRef = this.fireService.getMessageThreadRef(this.currentChannelId, this.parentMessageId, message.id))
      : (messageRef = this.fireService.getMessageRef(this.currentChannelId, message.id));

    let newReaction = { emoji: emoji, from: this.userService.auth.currentUser?.uid || 'n/a' };
    if (!this.hasReacted(newReaction.emoji, message.reaction)) {
      message.reaction.push(newReaction);
      if (messageRef) {
        this.fireService.updateReaction(messageRef, message.reaction);
        this.reactionMenuOpen = false;
      }
    } else this.removeReaction(message, emoji);
  }

  /**
   * Checks if the user has already reacted with a specific emoji.
   * @param emoji - The emoji to check
   * @param reactions - The list of reactions
   * @returns True if the user has reacted, otherwise false
   */
  public hasReacted(emoji: any, reactions: any[]): boolean | undefined {
    if (this.channelType !== 'direct') return reactions.some((reaction) => reaction.from === this.userId && reaction.emoji === emoji);
    return;
  }

  /**
   * Removes a specific emoji reaction from a message.
   * @param message - The message to update
   * @param emoji - The emoji to remove
   */
  public removeReaction(message: any, emoji: string): any {
    let messageRef;
    this.isThread
      ? (messageRef = this.fireService.getMessageThreadRef(this.currentChannelId, this.parentMessageId, message.id))
      : (messageRef = this.fireService.getMessageRef(this.currentChannelId, message.id));

    let reactionIndex = message.reaction.findIndex((r: any) => r.from === this.userId && r.emoji === emoji);
    if (reactionIndex >= 0) {
      message.reaction.splice(reactionIndex, 1);
      if (messageRef) {
        this.fireService.updateReaction(messageRef, message.reaction);
      }
    }
  }

  /**
   * Filters unique emojis from the reactions array.
   * @param reactions - Array of emoji reactions
   * @returns Filtered array with unique emojis
   */
  public uniqueEmojis(reactions: any[]): any[] {
    return reactions.filter((reaction, index) => index === reactions.findIndex((r) => r.emoji === reaction.emoji));
  }

  /**
   * Counts how many times an emoji was used in a reaction list.
   * @param emoji - The emoji to count
   * @param reactions - The array of reactions
   * @returns Number of times the emoji was used
   */
  public countEmoji(emoji: any, reactions: any[]) {
    return reactions.filter((e) => e.emoji === emoji.emoji).length;
  }

  /**
   * Counts how many unique emojis exist in a list.
   * @param iterable - The array to check
   * @returns Count of unique emojis
   */
  public countUniqueEmojis(iterable: any[]): number {
    return new Set(iterable.map((e) => e.emoji)).size;
  }

  /**
   * Returns the names of users who have reacted to a specific emoji.
   * @param targetEmoji - The emoji to check reactions for
   * @param reactions - The list of reactions to check
   * @returns A list of user names who have reacted with the target emoji
   */
  public getReactionNamesForEmoji(targetEmoji: string, reactions: any[]): string[] | any {
    let allUsers = this.userService.users;
    let currentUserId = this.userId;
    let reactionsWithEmoji = reactions.filter((reaction: any) => reaction.emoji === targetEmoji);
    let userIds = reactionsWithEmoji.map((reaction: any) => reaction.from);
    let hasCurrentUserReacted = userIds.includes(currentUserId);

    let otherUsers = allUsers
      .filter((user: any) => userIds.includes(user.key) && user.key !== currentUserId)
      .map((user: any) => user.fullname);

    if (hasCurrentUserReacted) {
      if (otherUsers.length === 0) return ['Du'];
      else otherUsers.push('und du');
    }
    return otherUsers.length > 0 ? otherUsers : [];
  }

  /**
   * Cancels editing mode and resets input.
   */
  public cancel() {
    this.isEditing = false;
    this.menuOpen = false;
  }

  /**
   * Displays the receiver's profile.
   */
  public async showProfile() {
    const reciverData = await this.getReceiverIdByName();
    this.dialog.open(DialogReciverComponent, {
      data: {
        reciever: reciverData,
        recieverId: reciverData?.id,
      },
      width: '400px',
      panelClass: ['center-dialog'],
    });
  }

  /**
   * Retrieves a user document from Firestore by matching the full name.
   * Queries the 'users' collection where 'fullname' equals the provided message name.
   *
   * @returns A promise that resolves to the user data object including the document ID,
   *          or null if no matching user is found.
   */
  private async getReceiverIdByName() {
    const usersCollection = this.fireService.getCollectionRef('users');
    const q = query(usersCollection!, where('fullname', '==', this.message.name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { ...doc.data(), id: doc.id };
    } else return null;
  }

  /**
   * Handles click events on mention buttons within a message.
   * Determines whether a mention button was clicked and, if so,
   * extracts its symbol (@ or #) and the associated name,
   * then delegates to navigation logic.
   *
   * @param event - The MouseEvent triggered by the click.
   */
  onMentionClick(event: MouseEvent | TouchEvent) {
    const btn = (event.target as HTMLElement).closest('.tag-btn');
    if (!btn) return;

    const fullTag = btn.textContent?.trim();
    if (!fullTag) return;

    const symbol = fullTag.charAt(0);
    const name = fullTag.slice(1).trim();
    this.showProfileOrChannel(symbol, name);
  }

  /**
   * Routes the click on a mention based on its symbol.
   * If the symbol is '@', performs a user lookup;
   * if '#', performs a channel lookup.
   *
   * @param symbol - The mention symbol, either '@' or '#'.
   * @param name - The username or channel name to lookup.
   */
  async showProfileOrChannel(symbol: string, name: string) {
    switch (symbol) {
      case '@':
        await this.caseUser(name);
        break;

      case '#':
        await this.caseChannel(name);
        break;
    }
  }

  /**
   * Looks up a user in Firestore by their full name,
   * sets the navigation service’s receiver ID to the found user’s document ID,
   * and switches the UI to a direct chat view.
   *
   * @param name - The user’s full name to query.
   */
  async caseUser(name: string) {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('fullname', '==', name));
    const snapshot = await getDocs(q);
    const userDoc = snapshot.docs[0];
    this.navigationService.setUrl('direct', userDoc.id);
    this.navigationService.showDirect();
  }

  /**
   * Looks up a channel in Firestore by its name,
   * sets the navigation service’s receiver ID to the found channel’s document ID,
   * and switches the UI to the channel view.
   *
   * @param name - The channel’s name to query.
   */
  async caseChannel(name: string) {
    const channelsRef = collection(this.firestore, 'channels');
    const q = query(channelsRef, where('name', '==', name));
    const snapshot = await getDocs(q);
    const channelDoc = snapshot.docs[0];
    this.navigationService.setUrl('channel', channelDoc.id);
    this.navigationService.showChannel();
  }
}
