let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;
let speed = 50;
let mostRecentSpeed = 1;
let scoreAndSpeedContainerHeight = document.getElementById("score-and-speed").offsetHeight;
let score = 0;
var gameplay;
let bubbleAnimations = [];


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function horizontalPosition(pageWidth, bubbleDimensions) {
  let functionalRange = pageWidth - bubbleDimensions;
  let leftPosition = Math.floor(Math.random(functionalRange) * (functionalRange));
  return leftPosition;
}

function speedHandler(event) {
  event.preventDefault();
  speed = event.currentTarget.value;
  // let currentSpeedContainer = document.getElementById("currentSpeed");
  // currentSpeedContainer.innerText = speed / 100;
  changeAllSpeeds(speed / 100);
}

function changeAllSpeeds(newRate) {
  bubbleAnimations.forEach(bubble => {
    bubble.playbackRate = newRate;
  });
}

function onAnimationEnd(event) {
  let bubble = event.currentTarget;
  bubble.parentNode.removeChild(bubble);
}

function onClick(event) {
  let bubble = event.currentTarget;
  score += parseInt(bubble.getAttribute("points"));
  bubble.parentNode.removeChild(bubble);
  let scoreContainer = document.getElementById("score");
  scoreContainer.innerText = score;
  generateBubble();
}

function generateBubble() {
  let bubble = document.createElement("div");
  let bubbleZone = document.getElementById("bubble-zone");
  let bubbleDimensions = randomNumber(10, 100);
  const leftPosition = horizontalPosition(viewportWidth, bubbleDimensions);
  let startingPosition = scoreAndSpeedContainerHeight - bubbleDimensions;
  bubble.setAttribute("style", `position:absolute;background-color:lightblue; height: ${bubbleDimensions}px; width:${bubbleDimensions}px; opacity: 0.8; box-shadow: 0px 2px 47px -14px rgba(0,0,0,0.75); left: ${leftPosition}px; top: 249px;`);
  let newBubble = bubble.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(100vh)' }
    ], {
      fill: 'forwards',
      easing: 'linear',
      duration: 5000
    });
    newBubble.playbackRate = speed / 100;
  bubbleAnimations.push(newBubble);
  bubble.setAttribute("onclick", "onClick(event)");
  bubble.setAttribute("onAnimationEnd", "onAnimationEnd(event)");
  bubble.setAttribute("points", `${Math.round(100 / bubbleDimensions)}`);
  bubble.classList.add("bubble");
  bubbleZone.appendChild(bubble);
}

function stopGame() {
  clearInterval(gamePlay);
  let bubbles = document.getElementsByClassName("bubble");
  Array.from(bubbles).map(function(bubble) {
    bubble.parentNode.removeChild(bubble);
  });
}

function startGame() {
  gamePlay = setInterval(generateBubble, 1000);
  let rangeInput = document.getElementById("speedRange");
  rangeInput.value = speed;
  // let currentSpeedContainer = document.getElementById("currentSpeed");
  // currentSpeedContainer.innerText = speed;
}

window.onload = function() {
  // console.log(findKeyframesRule("moveDown"));
};
