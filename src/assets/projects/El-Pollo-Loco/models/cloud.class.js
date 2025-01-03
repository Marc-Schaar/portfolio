class Cloud extends MovebaleObject {
    y = 10;
    x = 0;
    width = 720;
    height = 300;
    speed = 0.06;

    /**
     * Initializes the cloud object.
     * It loads the cloud image and moves the cloud to the left with a specified speed.
     */
    constructor() {
        super().loadImage("./assets/img/5_background/layers/4_clouds/1.png");
        this.moveLeft(this.speed);
    }
}
