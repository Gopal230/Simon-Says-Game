//Event Bubbling:-
let div = document.querySelector("div")
let ul = document.querySelector("ul")
let lis = document.querySelectorAll("li")

div.addEventListener("click", () => {
    console.log(`div was clicked`)

})

ul.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(`ul was clicked`)

})

for (li of lis) {
    li.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(`li was clicked`)
    })
}

//Activity: TO-DO List

let taskInp = document.querySelector("#add");
let addBtn = document.querySelector(".add-btn")
let tasks = document.querySelector(".tasks")
addBtn.addEventListener("click", () => {

    if (taskInp.value != "") {
        let task = document.createElement("li");

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "delete";
        task.innerText = taskInp.value
        task.appendChild(deleteBtn);
        deleteBtn.classList.add("del")

        taskInp.value = "";
        tasks.appendChild(task);
    }
})


//Event Delegation:bubbling

// let deleteBtns = document.querySelectorAll(".del");
// for (delBtn of deleteBtns){
    
//     deleteBtn.addEventListener("click", function() {
//         let par = this.parentElement;
//         par.remove();
        
//     });
// }

tasks.addEventListener("click",function(e){
console.dir(e.target);
console.dir(e.target.nodeName);

if (e.target.nodeName == "BUTTON"){
    let listItem = e.target.parentElement;
    listItem.remove();
}})


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
    // console.log("current lvl:",level)
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
    let btn = this;
    btnFlash(btn);

    let userColor = btns.find(c => btn.classList.contains(c));
    if (!userColor) return;
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".color")
for (btn of allBtns){
    btn.addEventListener("click",btnPress)
}
