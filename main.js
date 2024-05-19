// 先繼承HTMLElement來擴充

class PopupInfo extends HTMLElement {
    constructor () {
        super();
    }

    connectedCallback () {
        // 建立 shadow root
        const shadow = this.attachShadow({ mode: "open" });  //js可以造訪

        // 建立 所需元素
        const card = document.createElement("div");
        card.setAttribute("class", "panel");

        const cardHeader = document.createElement("div");
        cardHeader.setAttribute("class", "header");

        const text = document.createElement("p");
        text.setAttribute("class", "title");

        // 取得attribute content放入text裡面
        const textContent = this.getAttribute("data-text");
        text.textContent = textContent;

        // 組裝元素
        cardHeader.appendChild(text);
        card.appendChild(cardHeader);

        // 建立 CSS 樣式
        const style = document.createElement("style");

        style.textContent = `
            .panel {
                position: relative;
                width: 300px;
                height: 300px;
                padding: 16px;
                background-color: #fff;
                border: 1px solid gray;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
            }

            .header {
                width: 100%;
                border-bottom: 1px solid;
            }

            .title {
                margin: 0;
                font-weight: bold;
                font-size: 24px;
            }
        `;

        // 把相關元素加入至 shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(card);
    }
}

// 定義新元素
customElements.define("custom-modal", PopupInfo);