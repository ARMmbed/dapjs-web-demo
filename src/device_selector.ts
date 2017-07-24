
export interface IPlatform {
    name: string;
    productCode: string;
}

export class PlatformSelector {
    private deviceCache: Map<string, IPlatform>;
    private element: HTMLSelectElement;
    private deviceElement: HTMLElement;

    constructor(id: string, devices: string) {
        const elem = document.getElementById(id);
        this.deviceElement = document.getElementById(devices);

        if (elem.nodeName === "SELECT") {
            this.element = elem as HTMLSelectElement;
        } else {
            console.log(elem.nodeName);
            throw new Error("select element must be chosen");
        }

        this.deviceCache = new Map<string, IPlatform>();
    }

    public show(platform: IPlatform) {
        this.deviceElement.innerHTML =
            `<option value='${platform.productCode}' id='${platform.productCode}'>${platform.name}</option>`;
        this.element.value = platform.productCode;
    }

    public enable() {
        this.element.disabled = false;
    }

    public disable() {
        this.element.disabled = true;
    }

    public async lookupDevice(code: string) {
        if (this.deviceCache.has(code)) {
            return this.deviceCache.get(code);
        }

        const xhr = new XMLHttpRequest();
        xhr.open("get", `https://developer.mbed.org/api/v3/platforms/${code}`, true);
        xhr.responseType = "json";

        return new Promise<IPlatform>((resolve, reject) => {
            xhr.onload = (e: any) => {
                const device = {
                    name: xhr.response.name,
                    productCode: xhr.response.productcode,
                };
                this.deviceCache.set(code, device);

                resolve(device);
            };
            xhr.send();
        });
    }
}
