import {createTag} from "./helper.js";

export default class {
    constructor(cardNumber, cardSelectHandler) {
        this._cardNumber = cardNumber;
        this._open = false;
        this._success = false;
        this._cardSelectHandler = cardSelectHandler;
    }

    set cardElement(cardElement) {
        cardElement.addEventListener("click", event => {
            event.preventDefault();
            this._cardSelectHandler(this);
        });
        this._cardElement = cardElement;
    }
    get cardElement() {
        return this._cardElement;
    }

    get number() {
        return this._cardNumber;
    }

    set opened(value) {
        this._opened = value;
    }
    get opened() {
        return this._opened;
    }

    set success(value) {
        this._success = value;
    }
    get success() {
        return this._success;
    }

    create() {
        const cardElement = createTag("div", ["col"]);
        this.cardElement = cardElement;
        return cardElement;
    }

    open() {
        this.opened = true;
        this.openCardElement();
    }

    close() {
        this.opened = false;
        this.closeCardElement();
    }

    openCardElement() {
        this.cardElement.classList.add("open");
        this.cardElement.innerText = this.number;
    }

    closeCardElement() {
        this.cardElement.classList.remove("open");
        this.cardElement.innerText = "";
    }

    setSuccess() {
        this.success = true;
    }
}
