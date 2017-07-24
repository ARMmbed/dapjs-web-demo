
export default class HTMLLogger {
    private element: Element;

    constructor(selector: string) {
        this.element = document.querySelector(selector);
    }

    public log(data: string) {
        this.element.innerHTML = this.element.innerHTML + data + "\n";
    }

    public clear() {
        this.element.innerHTML = "";
    }
}
