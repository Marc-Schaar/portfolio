class WinMsg extends MovebaleObject {
    x = 0;
    y = 480;
    width = 720;
    height = 480;

    /**
     * Initializes the WinMsg object by loading the corresponding image.
     */
    constructor() {
        super().loadImage("./assets/img/9_intro_outro_screens/win/win_2.png");
    }
}
