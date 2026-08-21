//Simon Says:
let gameSeq= [];
let userSeq = [];
let btns =["one","two","three","four"];
let started = false;
let level = 0;


document.addEventListener("keypress",function(){
    if(started == false){
        levelUp();
        started = true;
    }
    
})


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250)
    
}

let h3 = document.querySelector("h3")
function levelUp(){
    userSeq=[]
    level++;
    h3.innerText=`Level ${level}`
    let randIndx = Math.floor(Math.random()*4);
    let randColor= btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`)
    btnFlash(randBtn)
    gameSeq.push(randColor);
}


function checkAns(idx){
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        started = false;
        level = 0;
        gameSeq = [];
        userSeq = [];
    }
}

function btnPress(){
    if(started == false){
        started = true;
        levelUp();
        return;
    }
    let btn = this;
    btnFlash(btn);

    let userColor = btns.find(c => btn.classList.contains(c));
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".color")
for (btn of allBtns){
    btn.addEventListener("click",btnPress)
}
