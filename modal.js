import {closeIconHtml} from "./icon.js";
import {importJQuery} from "./importJQuery.js";
// 先繼承HTMLElement來擴充

class PopupInfo extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback () {
        // 建立 shadow root
        const shadow = this.attachShadow({ mode: "open" });  //js可以造訪
        //設定無法造訪: closed

        const linkEle = this.createLink();
        const card = this.createPopup();

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

        // 呼叫API
        // try {
        //     const response = this.getSource();

        //     console.log(`response`);
        //     console.table(response.json());

        // } catch (e) {
        //     console.log(`Error: ${e}`);
        // }
        const response = this.getSource();
        console.table(response);

        // 取得attribute content放入text裡面
        const textContent = this.getAttribute("data-text");
        text.textContent = textContent;

        // 組裝元素
        cardHeader.appendChild(text);
        card.appendChild(cardHeader);
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
    }

    async getSource() {
        let url = "https://moon01slave.advividnetwork.com/api/crescent_give_api_slide_michael.php";

        let para = {
            lang: "zh_TW",
            web_id: "kk3c",
            uuid: "ad5e4d2c-d10a-4f15-b6a8-c9406a4e385f",
            type: "slide",
            user_agent: "_",
            client_href: "_",
            os_type: 2,
            browser_type: 4,
            is_ios: 5,
            ip: "_",
            title: "_",
            access_type: "interstitial",
            access_number: 1,
            domain_type: "interstitial_domain",
            href: "kkplay3c.net",
            language: "zh-tw",
        }

        const data = new URLSearchParams(para);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: data,
            mode: "no-cors"
        }).then(function (response) {
            // console.log(response)
            if (response.ok) {
                return response.json();
            } else {
                console.log("not ok...");
                return "";
            }
        }).catch(function (error) {
            console.log(`getSource() Error: ${error}`);
            return "";
        });
    }
}

export default PopupInfo;