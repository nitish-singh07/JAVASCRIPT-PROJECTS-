let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScoreText = document.querySelector("#user-score");
const computerScoreText = document.querySelector("comp-score");

getComputerChoice = () => {
    const option = ["paper","rock","scissors"];
    const randIndex=Math.floor(Math.random()*3);
    return option[randIndex]; 
}

const Draw = () => {
    msg.innerText = "Game was Draw ! Paly again";
    msg.style.backgroundColor = "yellow";
    console.log("Game is Draw .");
}


const showWinner = (userWin ,UserChoice , computerChoice) => {
    if(userWin){
        userScore++;
        userScoreText.innerText = userScore;
        msg.innerText = `You Win!  Your ${UserChoice} beats ${computerChoice}`;
        msg.style.backgroundColor = "green";
        console.log("user win");
    }else{
        computerScoreScore++;
        computerScoreTextText.innerText = computerScore;
        msg.innerText =  `You Lose !${computerChoice} beats your ${UserChoice}`;
        msg.style.backgroundColor = "red";
        console.log("user lose");
    }
}


PlayGame = (UserChoice) => {
    console.log("user choice is ",UserChoice);
    const computerChoice = getComputerChoice();
    console.log("computer choice is" ,computerChoice);

    if(UserChoice === computerChoice){
        Draw(); 

    }else {
        let userWin = true;
       
        if (UserChoice === "rock") {
            //paper,scissors
            userWin = computerChoice === "paper" ? false : true;
        }else if (UserChoice === "paper") {
            //rock,scissors
            userWin = computerChoice === "scissors" ? false : true;
        }else{
            //rock , paper 
            userWin = computerChoice === "paper" ? true : false;
        }
        showWinner(userWin , UserChoice, computerChoice);

    }
}

choices.forEach((choice) =>
{
    console.log(choice);

    choice.addEventListener("click", () => {
        const UserChoice = choice.getAttribute("id");
        // console.log(UserChoice ,"clik ho gya re babi");
        PlayGame(UserChoice);
    })

})