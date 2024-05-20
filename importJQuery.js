// 使用第三方引入的方式載入3.7.1版本

export const importJQuery = (target) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;

        script.onload = function () {
            resolve(true);
        }
        script.onerror = function () {
            reject(new Error("import jQuery error"));
        }

        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
        target.appendChild(script);
    })
}