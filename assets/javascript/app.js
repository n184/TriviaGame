var theTeasers = {
    "slide": {
        question: ["Picture a glass of cold refreshing water with ice cubes. The glass is filled to its brim. What will happen when the ice melts?",
            "A snail is in a 20 feet deep well. Every day the snail climbs 5 feet upward and slides down 4 feet every night. After how many days will the snail be out?",
            "One coin has two heads. A second coin has two tails. A third coin has a side of a head and a side of a tail. One of those coins was flipped to reveal a head. What is the likelihood that the other side is a tail?",
            "A lily pad doubles in size every day. The pond is covert with them by the 16th day. When was the lake half covered?",
            "A bell in a clock tower will take 5 seconds to ring 6 times. How many seconds it will take it to ring 12 times?"
        ],
        options1: ["The water will overflow", "15-16 days", "15% - 25%", "2-5 days", "9 seconds"],
        options2: ["The water level will stay the same", "17-18 days", "30% - 40%", "7-10 days", "10 seconds"],
        options3: ["The water level will down", "19-20 days", "45% - 55%", "12-15 days", "11 seconds"],
        picture: ["assets/css/images/glassOfWater.jpg", "assets/css/images/snail.jpg", "assets/css/images/coin.jpg", "assets/css/images/lilyPad.jpg", "assets/css/images/clock.jpg"],
        expl: ["Try it! The water level will be unchanged.",
            "After the 15th day the snail will reach the 15th feet mark. on the 16th day the snail will climb 5 more feet and that means he will be out of the well.",
            "Because only one coin has an opposite to a head of a tail, the chance is one third.",
            "On the 16th day it is covered because it doubled in size every day, that means that on day 15 it was half full. ",
            "The seconds represent the time between the rings, therefore, it will take eleven seconds."
        ]
    }
};

var number = 30;
var intervalId;
var timeOver = false;
var i = 0;
var correctAnswer = [theTeasers.slide.options2[0], theTeasers.slide.options1[1], theTeasers.slide.options1[2], theTeasers.slide.options3[3], theTeasers.slide.options3[4]];
var gameOver = false;
var incorrectCount = 0;
var correctCount = 0;

function reStart() {
    console.log("restart");
    clearInterval(intervalId);
    number = 30;
    timeOver = false;
    i = 0;
    gameOver = false;
    incorrectCount = 0;
    correctCount = 0;
    startSlideshow();
}

function run() {
    console.log("run");
    clearInterval(intervalId);
    number = 30;
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
    number = 10;
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
    $("#jumbotron").append("You got " + incorrectCount + " questions wrong");
    $("#jumbotron").css({ "font-size": "30px" });
    $("#rightSection").empty();
    var newImage1 = $("<img>");
    newImage1.attr('src', "assets/css/images/thinkingTrivia.jpg");
    newImage1.css({ "height": "800px" });
    $("#rightSection").append(newImage1);

    $("#buttons").empty();
    $("#buttons").html("<button><h2>Start</h2></button>");
    $("button").addClass("start");
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
        $(".start").click(reStart);
        console.log("x is start")
    } else {
        var answerChosen = $(this).attr("data-value");
        console.log(answerChosen);
        console.log(correctAnswer[i]);


        if (answerChosen == correctAnswer[i]) {
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
    $(".start").click(startSlideshow);
    $(document).on("click", "button", checkCorrect);
});