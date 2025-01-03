class Coin extends DrawableObject {
    x = 200 + Math.random() * 2000;
    y = 50 + Math.random() * 150;

    /**
     * Initializes the coin object.
     * It loads the coin image at a random position on the screen.
     */
    constructor() {
        super().loadImage("./assets/img/8_coin/coin_1.png");
    }
}
