class EndbossBar extends StatusBar {
    x = 520;
    y = 0;
    IMAGES_ENDBOSS_BAR = [
        "./assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "./assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];

    /**
     * Initializes the EndbossBar with its images and sets the initial health to 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS_BAR);
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage of the Endboss and updates the displayed image.
     * @param {number} percentage - The health percentage (0-100) of the Endboss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS_BAR[this.resolveImageIndex(percentage)];
        this.img = this.imgChache[path];
    }
}
