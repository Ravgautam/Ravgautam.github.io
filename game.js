
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;



//To start game

$(document).on("click",function(){
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    }
});




function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).delay(100).fadeOut().fadeIn('slow');

        var location1="./sounds/"+randomChosenColour+".mp3"
        playSound(location1);
        
  
}

//user clicked color
$(".btn").on("click", function(event){
    var userChosenColour= event.target.id;
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    var location2="./sounds/"+userChosenColour+".mp3"
    playSound(location2);
    animatePress(userChosenColour);
});

//sound
function playSound(name){
    var music= new Audio(name);
    music.play();
}

//pressed animation
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

//check answer

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
                
            },1000);
        }

    }else{
        var location3="./sounds/wrong.mp3";
        playSound(location3);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Here to Restart");
        $("#level-title").on("click",function(){
            startOver();
        });
        
    }

}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




