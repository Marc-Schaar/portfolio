class Coinbar extends StatusBar {
    width = 45;
    height = 45;
    y = 100;

    /**
     * Initializes the Coinbar object.
     * Loads the coin icon image for the status bar.
     */
    constructor() {
        super().loadImage("./assets/img/7_statusbars/3_icons/icon_coin.png");
    }
}
