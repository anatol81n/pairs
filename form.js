import {createTag} from "./helper.js";

export default class {
    constructor() {
        this.MIN_COUNT = 4;
        this.MAX_COUNT = 100;
        this.DEFAULT_COUNT = 16;
        this.TIME_LEFT = 60;
    }

    set onGameStart(handler) {
        this._gameStartHandler = handler;
    }
    get gameStartHandler() {
        return this._gameStartHandler;
    }

    create() {
        const form = createTag('form', ["initForm"]);
        const countControl = createTag("div", ["form-control"]);
        const countControlTitle = createTag("h4", [], {
            textContent: "Количество карточек"
        });
        const countControlInput = createTag("input", [], {
            name: "count",
            type: "range",
            value: String(this.DEFAULT_COUNT),
            min: String(this.MIN_COUNT),
            max: String(this.MAX_COUNT),
            step: "2"
        });
        const countControlValue = createTag('div', [], {
            "textContent": String(this.DEFAULT_COUNT)
        });
        countControlInput.addEventListener('input', () => {
            countControlValue.textContent = countControlInput.value;
        });
        countControl.append(countControlTitle, countControlValue, countControlInput);

        const timerControl = createTag("div", ["form-control"]);
        const timerControlTitle = createTag("h4", [], {
            textContent: "Включить таймер"
        });
        const timerControlInput = createTag('input', [], {
            name: "timer",
            type: "checkbox"
        });
        timerControl.append(timerControlTitle, timerControlInput);

        const startControl = createTag("div", ["form-control"]);
        const startButton = createTag('button', [], {
            textContent: "Начать"
        });
        startControl.append(startButton);

        form.append(countControl, timerControl, startControl);
        this.formElement = form;
        form.addEventListener("submit", event => {
            event.preventDefault();
            this.gameStartHandler(Number(form.count.value), form.timer.checked ? this.TIME_LEFT : 0)
        });
        return form;
    }
}
