let ans = document.querySelectorAll(".answer");
let ans_text = document.querySelectorAll(".answer p");

let ask = document.querySelector(".ask");

let qa;

let nextQa = [];

loadJson();

let timeLine = new TimelineMax({
    paused: false
});

let isRun = 1

const send = (ansSingle, index) => {
    console.log("ansSingle", ans)
    console.log("index", index)
    console.log("isRun", isRun)

    if (isRun === 0) {
        isRun = 1;
    } else {
        return
    }

    if (!nextQa[index]) {
        return;
    }

    let ansOthers = []
    ans.forEach(e => {
        if (e !== ansSingle) {
            ansOthers.push(e);
        }
    })

    timeLine
        .to(ask, 0.4, {
            opacity: 0
        })
        .to(ansOthers, 0.4, {
            opacity: 0
        }, "-=0.4")
        .to(ans_text[index], 0.4, {
            opacity: 0
        })
        .to(ansSingle, 0.6, {
            height: 0.2,
            opacity: 0.5,
            boxShadow: "0px 0px 35px 7px #cd28fa",
            delay: 0.25
        })
        .to(ansSingle, 0.3, {
            opacity: 0.5,
            background: "#26ff92"
        })
        .to(ansSingle, 0.3, {
            width: 1,
            delay: 0.2
        })
        .to(ansSingle, 0.3, {
            boxShadow: "0px 0px 100px 55px #fa2856",
            y: 90,
            height: 100,
            delay: 0.23
        })
        .to(ansSingle, 1, {
            height: 1000,
            y: -1500,
            boxShadow: "0px 0px 85px 17px #fa2856",
            delay: 0.2
        })
        .call(() => reload(nextQa[index]))
};

reload = (key) => {
    console.log('load key ', key)
    if (setText(key) === "end") {
        return
    }
    ans.forEach((e) => {
        if (e.innerText !== "undefined") {
            e.style = ""
        } else {
            e.style = "opacity: 0"
        }
    })
    ans_text.forEach((e) => e.style = "")
    ask.style = ""
    timeLine.clear()
    timeLine
        .from(ask, 0.8, {
            opacity: 0
        })
        .from(ans, 0.8, {
            opacity: 0,
        })
        .call(() => isRun = 0)
}

setText = (key) => {
    let current = qa[key]

    if (!current) {
        return "end";
    }

    console.log("current.askText", current.askText)

    ask.innerText = current.askText;
    if (current.a1) {
        ans_text[0].innerText = current.a1.text;
        nextQa[0] = current.a1.next;
    } else {
        ans_text[0].innerText = undefined;
        nextQa[0] = undefined;
    }
    if (current.a2) {
        ans_text[1].innerText = current.a2.text;
        nextQa[1] = current.a2.next;
    } else {
        ans_text[1].innerText = undefined;
        nextQa[1] = undefined;
    }
    if (current.a3) {
        ans_text[2].innerText = current.a3.text;
        nextQa[2] = current.a3.next;
    } else {
        ans_text[2].innerText = undefined;
        nextQa[2] = undefined;
    }
    if (current.a4) {
        ans_text[3].innerText = current.a4.text;
        nextQa[3] = current.a4.next;
    } else {
        ans_text[3].innerText = undefined;
        nextQa[3] = undefined;
    }
    return "normal"
}


ans.forEach((item, index) => {
    item.addEventListener("click", () => {
            send(item, index)
        }
    )
})

loadOk = (json) => {
    qa = json
    console.log("qa", qa)
    reload("start");
}

