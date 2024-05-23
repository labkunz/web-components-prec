import PopupInfo from "./modal.js";

// 餵物件測試
let obj = {
    index: 431,
    name: "test",
    func: () => {
        console.log(`name: ${this.name}`)
    }
}

// 定義新元素

customElements.define("custom-modal", PopupInfo);