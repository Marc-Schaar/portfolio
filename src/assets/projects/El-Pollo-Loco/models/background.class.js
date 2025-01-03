class BackgroundObject extends MovebaleObject {
    width = 720;
    height = 480;

    /**
     * Creates a background object with a specified image and position.
     * @param {string} imagePath - The path to the image to be used for this background object.
     * @param {number} x - The x-coordinate for the position of the object.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath); // Load the image using the inherited method from MoveableObject
        this.x = x; // Set the x-coordinate
        this.y = 480 - this.height; // Set the y-coordinate so it's positioned at the bottom of the canvas
    }
}
