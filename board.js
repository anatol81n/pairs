import {createTag, shuffle} from "./helper.js";
import AmazingCard from "./card2.js";
import images from "./images.js";

export default class {
    constructor(cardsNumberArray) {
        this._cardsNumberArray = cardsNumberArray;
    }

    get cardsNumberArray() {
        return this._cardsNumberArray;
    }

    set onCardSelect(handler) {
        this._cardSelectHandler = handler;
    }
    get cardSelectHandler() {
        return this._cardSelectHandler;
    }

    create() {
        const cardsCount = this.cardsNumberArray.length;
        const board = createTag('div', ["board"]);
        const rows = Math.floor(Math.sqrt(cardsCount));
        const cols = Math.ceil(cardsCount / rows);
        shuffle(images);
        for (let i = 0, numberIndex = 0; i < rows; i++) {
            const row = createTag("div", ["row"]);
            board.append(row);
            for (let j = 0; j < cols && numberIndex < cardsCount; j++, numberIndex++) {
                const cardNumber = this.cardsNumberArray[numberIndex];
                const card = new AmazingCard(cardNumber, images[cardNumber], this.cardSelectHandler);
                const col = card.create();
                row.append(col);
                console.log(numberIndex)
            }
        }
        return board;
    }
}
