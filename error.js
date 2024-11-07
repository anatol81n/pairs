export class ImageError extends Error {
    constructor(message) {
        super(message);
        this.name = "ImageError";
    }
}
