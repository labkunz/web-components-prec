import {closeIconHtml} from "./icon.js";
import {importJQuery} from "./importJQuery.js";
// 先繼承HTMLElement來擴充
import CardContent from "./content.js";

class PopupInfo extends HTMLElement {
    constructor () {
        super();
        this.test = "dnf";
    }

    async connectedCallback () {
        // 建立 shadow root
        const shadow = this.attachShadow({ mode: "open" });  //js可以造訪
        //設定無法造訪: closed

        console.log(this);
        console.log(this.test);

        const linkEle = this.createLink();
        const card = await this.createPopup();
        // const cardContent = new CardContent(this);

        // 把相關元素加入至 shadow DOM
        shadow.appendChild(linkEle);
        shadow.appendChild(card);

        // 載入jQuery
        let result = await importJQuery(this.shadowRoot);

        if (result) {
            console.log(`jQuery version: ${$().jquery}`);  // 確認目前版本

            this.shadowRoot.querySelector(".closeBtn").addEventListener("click", () => {
                let entry = this;
                this.closeCard(entry);
            });
        }
    }

    createLink () {
        // 替換使用外部樣式
        const element = document.createElement("link");
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("href", "./style.css");

        return element;
    }

    async createPopup (entry) {
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

        // const cardContent = document.createElement("div");
        // cardContent.setAttribute("class", "imageBlock");

        // // 呼叫API
        // let data = await this.getSource();

        // const img = document.createElement("img");
        // img.src = data !== "" ? data.message : "";
        const content = new CardContent();

        // 取得attribute content放入text裡面
        const textContent = this.getAttribute("data-text");
        text.textContent = textContent;

        // 組裝元素
        // cardContent.appendChild(img);
        cardHeader.appendChild(text);
        card.appendChild(cardHeader);
        card.appendChild(await content.createContent());
        card.appendChild(closeBtn);

        return card;
    }

    closeCard (entry) {
        // 改使用jQuery的寫法

        // let target = entry.shadowRoot.querySelector(".panel");
        let target = $(entry.shadowRoot).find(".panel");
        console.log(target);

        // target.style.display = "none";
        target.hide();

        // 測試：是否會影響到外層的Javascript？
        setTimeout(function () {
            window.close();
        }, 2000);
    }

    async getSource() {
        let url = "https://dog.ceo/api/breeds/image/random";

        let response = fetch(url);

        try {
            const result = await response;
            console.log(result);

            if (result.ok) {
                const source = await result.json();

                // console.table(source);
                return source;
            } else {
                console.log("not ok...");
                return "";
            }

        } catch (error) {
            console.log(error);
            return "";
        }
    }
}

export default PopupInfo;