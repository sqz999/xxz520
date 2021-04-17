loadJson = () => {
    let url = "data/qa.json"
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status === 200) {
            let json = JSON.parse(request.responseText)
            loadOk(json)
        }
    }
}