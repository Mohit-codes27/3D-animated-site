//selecting all required elements

const startBtn = document.querySelector(".startBtn button");
const infoBox = document.querySelector(".infoBox");
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeLine = document.querySelector("header .timeLine");
const timeText = document.querySelector(".timer .timeLeftTxt");
const timeCount = document.querySelector(".timer .timerSec");

//if start quiz button clicked
startBtn.onclick = () => {
    console.log("Hello");
    infoBox.classList.add("activeInfo"); //show info box
}

//if exit quix button clicked
exitBtn.onclick = () => {
    infoBox.classList.remove("activeInfo"); //hide info box
}

//if continue quiz button clicked 
continueBtn.onclick = () => {
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling show questions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling start timer line function
}

let timeValue = 15;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

//if restart quiz button clicked
restartQuiz.onclick = () => {
    quizBox.classList.add("activeQuiz"); //show quiz box
    resultBox.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    queCount = 0;
    queNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount); //calling show questions function
    queCounter(queNumb); //passing que number value to que counter
    clearInterval(counter); //clear counter 
    clearInterval(counterLine); //clear counter line
    startTimer(timeValue); //calling start timer function
    timeText.textContent = "Time Left"; //change the text of time text to Time Left

    nextBtn.classList.remove("show"); //hide the next button
}

//if quit quiz button clicked
quitQuiz.onclick = () => {
    window.location.reload(); //reload the current window
}

const nextBtn = document.querySelector("footer .nextBtn");
const bottomQuesCounter = document.querySelector("footer .totalQue")

//if next question button clicked
nextBtn.onclick = () => {
    if (queCount < questions.length - 1) { //if question count is less than total question length
        queCount++; //increment the question count value
        queNumb++; //increment the question number value
        showQuestions(queCount); //calling show questions function
        queCounter(queNumb); //passing question number value to question counter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counter line
        startTimer(timeValue); //calling start timer function
        startTimerLine(widthValue); //calling start timer line function
        timeText.textContent = "Time Left"; //change the time text to time left

        nextBtn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counter line
        showResult(); //calling show result function
    }
}

//getting questions and options from array
function showQuestions(index) {
    const queText = document.querySelector(".queText");

    // Creating new span and div tags for question and options and passing the values using the array index
    let queTag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let optionTag = 
        '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    queText.innerHTML = queTag; // Adding new span tag inside queText
    optionList.innerHTML = optionTag; // Adding new div tags inside optionList

    const options = optionList.querySelectorAll(".option"); // Selecting all option elements

    // Set onclick attribute to all available options
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionSelected(this)");
        console.log("ni");
    }
}


//creating the new div tags which for icons
let tickIconTag = '<div class = "icontick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class = "iconcross"><i class="fas fa-times"></i></div>';

//if user clicked on option 
function optionSelected(answer) {
    console.log("nk");
    clearInterval(counter); // clear counter
    clearInterval(counterLine); // clear counter line
    let userAns = answer.textContent; // getting user selected option
    let correctAns = questions[queCount].answer; // getting correct answer from array
    const allOptions = optionList.children.length; // getting all option items

    if (userAns == correctAns) { // if user selected option is equal to array's correct answer
        userScore += 1; // upgrading score value with 1
        answer.classList.add("correct"); // adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); // adding red color to incorrect selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); // adding cross icon to incorrect selected option
        console.log("Wrong Answer");

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) { // if there is an option that matches the array answer
                optionList.children[i].setAttribute("class", "option correct"); // adding green color to matched option
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); // adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled"); // once user selects an option, disable all options
    }
    nextBtn.classList.add("show"); // show the next button if user selected any option
}


function showResult() {
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show result box
    const scoreText = resultBox.querySelector(".scoreText");
    if (userScore > 3) { //if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats!🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //adding new span tag inside score text
    }
    else if (userScore > 1) { //if user scored more than 1
        let scoreTag = '<span>and nice😎, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { //if user scored less than 1
        let scoreTag = '<span>and sorry😑, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of time cound with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = optionList.children.length; //getting all option items
            let correctAns = questions[queCount].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) { //if there is an option which is matched to an array answer
                    optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option

                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            nextBtn.classList.add("show"); //show the next button if user selected any option

        }
    }

}
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //upgrading time value with 1
        timeLine.style.width = time + "px"; //increment width of time line with px by time value
        if (time > 549) { //if timer value is greater than 549
            clearInterval(counterLine); //clear counter line
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuesCounter.innerHTML = totalQueCounTag; //adding new span tag inside botton ques counter
}

