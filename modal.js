import {closeIconHtml} from "./icon.js";
// 先繼承HTMLElement來擴充

class PopupInfo extends HTMLElement {
    constructor () {
        super();
    }

    connectedCallback () {
        // 建立 shadow root
        const shadow = this.attachShadow({ mode: "open" });  //js可以造訪
        //設定無法造訪: closed

        const linkEle = this.createLink();
        const card = this.createPopup();

        // 把相關元素加入至 shadow DOM
        shadow.appendChild(linkEle);
        shadow.appendChild(card);
    }

    createLink () {
        // 替換使用外部樣式
        const element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("href", "./style.css");

        return element;
    }

    createPopup () {
        // 建立 所需元素
        const card = document.createElement("div");
        card.setAttribute("class", "panel");
        
        // 新增 close btn field
        const closeBtn = document.createElement("div");
        closeBtn.setAttribute("class", "closeBtn");
        closeBtn.innerHTML = closeIconHtml;

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
        card.appendChild(closeBtn);

        return card;
    }

    closeCard () {
        let root = document.querySelector("custom-modal");
        let target = root.querySelector(".panel");

        target.style.display = "none";
    }
}

export default PopupInfo;