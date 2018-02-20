var theTeasers = {
    "slide": {
        question: ["Picture a glass of cold refreshing water with ice cubes. The glass is filled to its brim. What will happen when the ice melts?", "fdgdggr"],
        options1: ["up"],
        options2: ["same", "dfwwfess"],
        options3: ["down"],
        picture: ["assets/images/glassOfWater.jpg", "assets/images/snail.jpg", "assets/images/coin.jpg", "assets/images/lakeView.jpg"],
        expl: ["Try it! The water level will be unchanged"]
    }
};

var number = 25;
var intervalId;
var isRunning = false;
var timeOver = false;
var i = 0;
var correctAnswer = [theTeasers.slide.options2[i]];
var gameOver = false;
var incorrectCount = 0;
var correctCount = 0;

function reStart() {
    console.log("restart");
    number = 25;
    intervalId;
    isRunning = false;
    timeOver = false;
    i = 0;
    correctAnswer = [theTeasers.slide.options2[i]];
    gameOver = false;
    incorrectCount = 0;
    correctCount = 0;
    startSlideshow();
}

function run() {
    console.log("run");
    clearInterval(intervalId);
    number = 25;
    intervalId = setInterval(decrement, 1000);


}

function decrement() {
    console.log("decrement");
    number--;
    $("#rightSection").html(number + "<br>sec");
    if (number === 0) {
        stop();
    }
}

function stop() {
    console.log("STOP");
    clearInterval(intervalId);
    timeOver = true;
    console.log(timeOver);
    if (timeOver == true) {
        incorrectCount++;
        console.log(incorrectCount);
        revealIfWr();
        run1();
    }
}



function run1() {
    console.log("run1");
    clearInterval(intervalId);
    number = 1;
    intervalId = setInterval(decrement1, 1000);

}

function decrement1() {
    console.log("decrement1");
    number--;
    if (number === 0) {
        stop1();
    }
}

function stop1() {
    console.log("stop1");
    clearInterval(intervalId);
    timeOver = true;
    console.log(timeOver);
    i++;
    if (i < 5) {
        startSlideshow();
    } else {
        finish();
    }
}

    function finish() {
    console.log("finish");
    $("#jumbotron").empty();
    $("#jumbotron").html("Wasn't it fun");
    $("#jumbotron").append("<br>");
    $("#jumbotron").append("You got " + correctCount + " questions right");
    $("#jumbotron").append("<br>");
    $("#jumbotron").append("You got " + incorrectCount + " questions right");
    $("#jumbotron").css({ "font-size": "30px" });
    $("#rightSection").empty();
    var newImage = $("<img>");
    newImage.attr('src', "assets/images/thinkingTrivia.jpg");
    newImage.css({ "height": "900px" });
    $("#rightSection").append(newImage);
    $("#buttons").empty();
    $("#buttons").html("<button>Start</button>");
    $("#buttons").addClass("start");
    $(".start").click(reStart);

}


function startSlideshow() {
    console.log("startSlideshow");
    $("#jumbotron").empty();
    $("#jumbotron").html(theTeasers.slide.question[i]);
    $("#jumbotron").css({ "font-size": "30px" });

    $("#rightSection").empty();
    $("#rightSection").html(number + "<br>sec");
    $("#rightSection").css({ "font-size": "120px", "color": "green", "font-family": "monospace", "text-align": "center" });
    run();

    $("#leftSection").empty();
    var newImage = $("<img>");
    newImage.attr('src', theTeasers.slide.picture[i]);
    newImage.css({ "height": "300px" });
    $("#leftSection").append(newImage);
    $("#leftSection").css({ "height": "300px" });


    $("#buttons").empty();
    var answers = $("#buttons");
    var answer1 = $("<button><h3>" + theTeasers.slide.options1[i] + "</h3></button>");
    answer1.attr("data-value", theTeasers.slide.options1[i]);
    var answer2 = $("<button><h3>" + theTeasers.slide.options2[i] + "</h3></button>");
    answer2.attr("data-value", theTeasers.slide.options2[i]);
    var answer3 = $("<button><h3>" + theTeasers.slide.options3[i] + "</h3></button>");
    answer3.attr("data-value", theTeasers.slide.options3[i]);
    answers.html(answer1);
    answers.append("<br>");
    answers.append(answer2);
    answers.append("<br>");
    answers.append(answer3);
    console.log(answer1.attr("data-value"));
    console.log(answer2.attr("data-value"));
    console.log(answer3.attr("data-value"));
}


    function checkCorrect() {
        console.log("check");
        var x = $(this).attr("class");
        if (x == "start") {
            $(".start").click(finish);
            console.log("x is start")
        } else {
            var answerChosen = $(this).attr("data-value");
            console.log(answerChosen);
            console.log(correctAnswer[i]);


            if ((answerChosen == correctAnswer[i]) && (gameOver == false)) {
                correctCount++;
                revealIfRi();
            } else {
                revealIfWr();
                incorrectCount++;
            }
            console.log(correctCount);
            console.log(incorrectCount);
            run1();
        }
    }


function revealIfWr() {
    console.log("wrong");
    $("#jumbotron").empty();
    $("#rightSection").empty();
    $("#leftSection").empty();
    $("#buttons").empty();
    $("#jumbotron").html("<h2>Incorrect</h2>");
    $("#jumbotron").append(theTeasers.slide.expl[i]);

}

function revealIfRi() {
    console.log("right");
    $("#jumbotron").empty();
    $("#rightSection").empty();
    $("#leftSection").empty();
    $("#buttons").empty();
    $("#jumbotron").html("<h2>Correct</h2>");
    $("#jumbotron").append(theTeasers.slide.expl[i]);

}



$(document).ready(function() {
    console.log("ready");
    $(".start").click(reStart);
    $(document).on("click", "button", checkCorrect);



});