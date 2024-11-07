import Card from "./card.js";
import {ImageError} from "./error.js";

export default class extends Card {
    constructor(cardNumber, cardImage, cardSelectHandler) {
        super(cardNumber, cardSelectHandler);
        fetch(cardImage)
            .then(response => {
                if (response.status >= 400) {
                    throw ImageError
                }
                return response.blob();
            })
            .then(blob => {
                this._cardImage = URL.createObjectURL(blob);
            })
            .catch(error => {
                if (error instanceof ImageError) {
                    this._cardImage = null;
                }
            });
    }

    openCardElement() {
        super.openCardElement();
        if (this._cardImage) {
            this.cardElement.innerHTML = `<img src="${this._cardImage}">`;
        } else {
            this.cardElement.classList.add("default-image");
        }
    }

    closeCardElement() {
        super.closeCardElement();
        this.cardElement.classList.remove("default-image");
    }
}
