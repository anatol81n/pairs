export default class {
    constructor(seconds) {
        this._seconds = seconds;
    }

    get seconds() {
        return this._seconds;
    }

    set onFinish(handler) {
        this._finishHandler = handler;
    }
    get finishHandler() {
        return this._finishHandler;
    }

    create() {
        const timerElement = document.createElement('div');
        timerElement.innerText = this.seconds;
        this._timerElement = timerElement;
        return timerElement;
    }

    start() {
        let timer;
        timer = setInterval(() => {
            this.tick();
            if (this.seconds <= 0) {
                clearInterval(timer);
                this.finishHandler();
            }
        }, 1000);

    }

    tick() {
        this._seconds--;
        this._timerElement.innerText = this.seconds;
    }
}
