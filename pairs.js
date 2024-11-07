import Form from "./form.js";
import Board from "./board.js";
import Timer from "./timer.js";
import {createTag, shuffle} from "./helper.js";

export default class Pairs {
    constructor(container = document.getElementById("pairs")) {
        this.container = container;
        const css = createTag("link", [], {
            rel: "stylesheet",
            href: "style.css"
        });
        document.head.append(css);
    }

    start() {
        this.container.innerHTML = "";
        let totalCardsCount = 0;
        let successCardsCount = 0;
        const startForm = new Form();
        this.container.append(startForm.create());
        startForm.onGameStart = (count, seconds) => {
            totalCardsCount = Number(count);
            const openedCards = [];
            const cardsNumberArray = this._getCardsNumberArray(totalCardsCount);
            const board = new Board(cardsNumberArray);
            board.onCardSelect = card => {
                if (card.opened) {
                    return true;
                }
                if (openedCards.length === 2) {
                    openedCards.forEach(card => card.close());
                    openedCards.splice(0, openedCards.length);
                }
                if (openedCards.length < 2) {
                    card.open();
                    openedCards.push(card);
                }
                if (openedCards.length === 2) {
                    if (openedCards[0].number === openedCards[1].number) {
                        openedCards.forEach(card => success(card));
                        openedCards.splice(0, openedCards.length);
                    }
                }
            }
            this.container.innerHTML = "";
            this.container.append(board.create());
            if (seconds) {
                const timer = new Timer(seconds);
                timer.onFinish = () => {
                    this.finish()
                };
                this.container.append(timer.create());
                timer.start();
            }

            const success = card => {
                card.setSuccess();
                successCardsCount++;
                if (successCardsCount === totalCardsCount) {
                    this.finish();
                }
            }
        }
    }

    finish() {
        if (!this.container.querySelector(".finish")) {
            this.container.style.position = "relative";
            this.container.append(this._createFinishElement(getComputedStyle(this.container)));
        }
        if (!this.container.querySelector("button")) {
            const button = this._createFinishButton();
            button.addEventListener('click', event => {
                event.preventDefault();
                this.start();
            });
            this.container.append(button);
        }
    }

    _createFinishElement(containerStyle) {
        const finishElement = createTag("div", ["finish"]);
        finishElement.style.height = containerStyle.height;
        finishElement.style.width = containerStyle.width;
        const messageElement = createTag("h2", [], {textContent: "GAME OVER"});
        finishElement.append(messageElement);
        return finishElement;
    }

    _createFinishButton() {
        return createTag('button', [], {textContent: "Начать заново"});
    }

    _getCardsNumberArray(cardsCount) {
        const cardsNumberArray = [];
        const pairsCount = cardsCount / 2;
        for (let i = 0; i < pairsCount; i++) {
            cardsNumberArray[i] = i;
            cardsNumberArray[i + pairsCount] = i;
        }
        shuffle(cardsNumberArray)
        return cardsNumberArray;
    }
}
