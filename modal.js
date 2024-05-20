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

        // 替換使用外部樣式
        const linkEle = document.createElement("link");
        linkEle.setAttribute("rel", "stylesheet");
        linkEle.setAttribute("href", "./style.css")

        // 把相關元素加入至 shadow DOM
        shadow.appendChild(linkEle);
        shadow.appendChild(card);
    }
}

export default PopupInfo;