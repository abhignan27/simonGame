
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;


function nextSequence(){
    count+=1;
    $('h1').text(function(){
        return "Level"+" "+count;
    });
    var randomChosenColour;
    var randomNumber = Math.floor(Math.random()*4);
    console.log('Button colors index value ->',randomNumber);
    randomChosenColour = buttonColours[randomNumber];
    console.log('Random Chosen colour ->', randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log('Game Pattern ->',gamePattern);
    $('#'+randomChosenColour).fadeOut(150).fadeIn(25);
    var audio = new Audio("sounds/" + randomChosenColour+ ".mp3");
    audio.play();
    console.log('Current Level ->', count);
    
};

$('.btn').on('click',function(){
    var userChosenColour = this.id;
    console.log('User chosen colour ->',userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log('User clicked pattern ->', userClickedPattern);
    checkAnswer(count);
    playSound(userChosenColour);
     $('.'+userChosenColour).addClass("pressed");
     setTimeout(function(){
         $('.'+userChosenColour).removeClass("pressed");
     }, 100);   
});

function playSound(name){
    $('.'+name).fadeOut(150).fadeIn(25);
    var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();
}

// function animatePress(currentColour){
//     $('.'+currentColour).on('click',function(){
//         $('.'+ currentColour).addClass("pressed");
//         setTimeout(function(){
//             $('.'+ currentColour).removeClass("pressed");
//         }, 100);
//     });
// }
function gameOverBody(){
    $('body').addClass('game-over');
    setTimeout(function(){
    $('body').removeClass('game-over');},200);
}

function startOver(){
    count = 0;
    console.log('Level->',count);
    gamePattern = [];
    console.log('Game Pattern ->', gamePattern);
    userClickedPattern = [];
    console.log('User clicked pattern ->', userClickedPattern);
}

$(document).on('keydown', function(event){
    console.log('Pressed key->',event.key);
    var startGame;
    if (event.key === null){
        console.log('false');
        return false;
    }
    else{
        console.log('true');
        startGame = true;
        if(startGame === true){
            startOver();
            nextSequence();
        }
        else{
            console.log('Failed to generate game pattern');
        }
    }
});

function checkAnswer(currentLevel){
    var index = currentLevel - 1;
    console.log('User clicked Pattern ->', userClickedPattern);
    var recentChosenColour = userClickedPattern[index];
    console.log('Recent Chosen colour ->',recentChosenColour);
    var recentGamePatternColour = gamePattern[gamePattern.length - 1];
    console.log('Recent Game Patter colour ->', recentGamePatternColour);
    if (recentChosenColour === gamePattern[index]){
        if (userClickedPattern.length === gamePattern.length){
            console.log('Success -- calling nextsequence');
            userClickedPattern = [];
            if (count <= 4){
                setTimeout(nextSequence,1500);
            }
            else if (count > 4 && count <= 10){
                setTimeout(nextSequence, 750);
            }
            else if (count >10 && count <=20){
                setTimeout(nextSequence, 400);
            }
            else if (count > 20 && count <= 35){
                setTimeout(nextSequence, 250);
            }
            else if (count > 36){
                setTimeout(nextSequence, 100);
            }
        }
   }
    else{ 
        if (userClickedPattern.length === gamePattern.length){
            console.log('wrong');
            var audio1 = new Audio('sounds/wrong.mp3');
            audio1.play();
                $('h1').html(function(){
                 return "Game Over!"+"<br>"+"Press any key to restart.";
                });
            startOver();    
            gameOverBody();
        }
        else if (userClickedPattern.length < gamePattern.length){
            for (var i =0; i<userClickedPattern.length;i++){
                if (userClickedPattern[i]!==gamePattern[i]){
                    var audio1 = new Audio('sounds/wrong.mp3');
                    audio1.play();
                    $('h1').html(function(){
                        return "Game Over!"+"<br>"+"Press any key to restart.";
                   });
                   startOver(); 
                   gameOverBody();                 
                }
                else{
                    continue;
                }
            }
        }

    }
}






