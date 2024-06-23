const speechTexts = [

    "Welcome to our game!",
    "Are you ready to embark on an epic journey of technology and physics?",
    "Drag and drop the icon into the empty area to form new physics terms.",
    "Click on the hint button above if you get stuck.",
    "Happy playing!!"
];

let speechIndex = 0;

function nextSpeech() {
    if (speechIndex==speechTexts.length){
        speechIndex=0;
        cross();
    }
    else{
        document.getElementById('speech-text').textContent = speechTexts[speechIndex];
        speechIndex = (speechIndex + 1);
    }
}
function cross(){
    document.querySelector(".pop-up").style.display="none";
    document.querySelector(".outer").style.filter="blur(0px)";
    document.querySelector(".pop-up-container").style.display="none";
    document.querySelector(".pop-up-container").style.filter="blur(0px)";
}
