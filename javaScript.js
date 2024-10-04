let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGamebtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg");
let msg= document.querySelector("#msgwinner");

let turnO=true;   //playerX,playerO


const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text); // Create a new utterance for the text
    speechSynthesis.speak(utterance); // Speak the text
};

boxes.forEach((box) => {
     box.addEventListener("click",()=>{
           console.log("Box was clicked");
           if(turnO){   //player O turn.
              box.innerText="O";
              turnO=false;
           }           //player X turn.
           else{
              box.innerText="X";
              box.style.color="green";  //change the color of X
              turnO=true;
           }
           box.disabled=true;
           checkWinner();
     });
});

 const checkWinner=()=>{
   for(pattern of winPatterns)
    {
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!="")
        {
            if(pos1Val===pos2Val && pos2Val===pos3Val)
            {
                console.log("winner");
                showWinner(pos1Val);
            }
        }
    }
};

const showWinner=(winner) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;

    if(winner=="X") speak("Congratulations, Winner is Player X"); //speak
    else speak("Congratulations, Winner is Player O");

    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};

const resetGame=()=>{
     turnO=true;
     enableBoxes();
     msgContainer.classList.add("hide");
};

newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
