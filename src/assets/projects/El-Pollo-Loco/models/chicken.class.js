class Chicken extends MovebaleObject {
    x = 400 + Math.random() * (2000 - 400); // Random starting position for x-axis

    y = 370; // Vertical position of the chicken
    width = 60; // Width of the chicken
    height = 60; // Height of the chicken

    speed = 0.3 + Math.random() * 0.25; // Random speed for chicken movement
    damage = 5; // Damage the chicken causes upon interaction

    chickenSound = new Audio("./assets/audio/chicken.mp3"); // Sound effect for chicken
    audioVolume = 0.2; // Volume for the chicken sound

    IMAGES_WALKING = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ]; // Images for the walking animation

    IMAGES_DEAD = [
        "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ]; // Image for the dead chicken

    /**
     * Initializes the chicken with random movement and sound effects.
     * It also loads walking and death animations and starts the animation loop.
     */
    constructor() {
        super().loadImage(
            "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING); // Load walking animations
        this.loadImages(this.IMAGES_DEAD); // Load dead animation
        this.animate(); // Start the animation loop
        this.moveLeft(this.speed); // Move the chicken left
        this.chickenSound.volume = this.audioVolume; // Set volume for the chicken sound
    }

    /**
     * Main animation loop for the chicken.
     * It handles the walking animation and checks if the chicken is dead.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                super.handleDeath();
            }
        }, 1000 / 10);
    }

    /**
     * Plays the chicken's sound effect.
     * The sound is played with a set volume level.
     */
    playChickenSound() {
        this.chickenSound.play();
    }

    /**
     * Handles the death of the chicken.
     * It plays the death animation and stops further movement.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD); // Play death animation
        this.chickenSound.pause(); // Stop the chicken sound
    }
}
