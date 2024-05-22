class CardContent {  //extends HTMLElement
    constructor () {
        // super();
        // this.entry = entry;
    }

    // async connectedCallback () {

    //     let element = await this.createContent();

    //     let pos = this.entry.shadowRoot
    //     pos.append(element);
    // }

    // connectedCallback () {}

    async createContent () {
        const cardContent = document.createElement("div");
        cardContent.setAttribute("class", "imageBlock");

        // 呼叫API
        let data = await this.getSource();

        const img = document.createElement("img");
        img.src = data !== "" ? data.message : "";

        cardContent.appendChild(img);

        return cardContent;
    }

    async getSource () {
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

export default CardContent;