
window.onload = function() {
    attachDefaultListener("getBoardMessageBtn", function () {
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/get-board-message", true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText)
                }else {
                    reject("all")
                }
            }
        }).then(message => {
            updateBoardMessage(message);
        }).catch(_ => {
            window.alert("发生网络连接错误，无法获取白板内容");
        })
    }, true);
}

function attachDefaultListener(documentElement, callbackFn) {
    documentElement.onclick = callbackFn;
}

function fetchElemById(documentId) {
    return document.getElementById(documentId);
}

function updateBoardMessage(message) {
    fetchElemById("board").innerHTML = message;
}