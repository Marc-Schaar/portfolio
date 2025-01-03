class Endboss extends MovebaleObject {
    x = 3650;
    y = 140;
    baseY = this.y;
    width = 300;
    height = 300;

    offset = {
        LEFT: 60,
        RIGHT: 2.5,
        UP: 35,
        DOWN: 2.5,
    };

    damage = 90;
    energy = 100;
    chickenSound = new Audio("./assets/audio/chicken.mp3");
    audioVolume = 0.25;

    IMAGES_WALKING = [
        "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_HURT = [
        "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    /**
     * Initializes the Endboss with its properties, images, and sounds.
     * Loads walking, alert, hurt, and dead animations.
     * Sets up gravity and sound volume.
     */
    constructor() {
        super().loadImage(
            "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applayGravity();

        this.chickenSound.volume = this.audioVolume;
    }

    /**
     * Main animation loop for the Endboss. It checks the state of the Endboss and
     * updates the animation accordingly (hurt, dead, alert, or walking).
     * The loop runs every 500ms.
     */
    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.handleHurt();
            } else if (this.isDead()) {
                this.handleDead();
            } else if (this.toNear() && this.energy > 75) {
                this.handleAlert();
            } else {
                this.handleWalking();
            }
        }, 1000 / 2);
    }

    /**
     * Handles the Endboss's behavior when it is hurt.
     * Plays the hurt animation and causes the Endboss to jump.
     */
    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.hasJumped) {
            this.jump(140);
            this.hasJumped = true;
        } else if (this.y >= this.baseY) {
            this.hasJumped = false;
        }
    }

    /**
     * Handles the Endboss's behavior when it is dead.
     * Plays the dead animation and slightly lowers its position.
     */
    handleDead() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 10;
        }, 1000 / 20);
    }

    /**
     * Handles the Endboss's alert state.
     * Plays the alert animation and halts its movement.
     */
    handleAlert() {
        this.playAnimation(this.IMAGES_ALERT);
        this.speed = 0;
        this.x -= this.speed;
    }

    /**
     * Handles the Endboss's normal walking behavior.
     * Plays the walking animation and moves the Endboss to the left.
     */
    handleWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.speed = 0.05;

        setInterval(() => {
            if (this.x > 500) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }
}
