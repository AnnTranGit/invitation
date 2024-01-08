const button = document.querySelector(".btnn");
const envelope = document.querySelector(".envelope");
let flipped = true;
let pullOutTimeline;
let pullOutTriggered = false;
let audioPlayed = false;
let reverseTimeline;

function reverseAnimations() {
  reverseTimeline.reverse();
  reverseTimeline.seek(0);
}

function pullOut() {
  if (!pullOutTriggered) {
    pullOutTimeline = new TimelineMax()
      .to(
        ".flap",
        1,
        {
          rotationX: 180,
          ease: Power1.easeInOut,
        },
        "scaleBack"
      )
      .to(
        ".invitation",
        1,
        {
          scale: 0.8,
          ease: Power4.easeInOut,
        },
        "scaleBack"
      )
      .set(".flap", {
        zIndex: 0,
      })
      .to(".card", 1, {
        y: "0%",
        scaleY: 1.2,
        ease: Circ.easeInOut,
      })
      .set(".mask", {
        overflow: "visible",
        onComplete: function () {
          envelope.classList.toggle("is-open");
        },
      })
      .to(
        ".mask",
        1.3,
        {
          "clip-path": "inset(0 0 0% 0)",
          ease: Circ.easeInOut,
        },
        "moveDown"
      )
      .to(
        ".card",
        1.3,
        {
          y: "100%",
          scaleY: 1,
          ease: Circ.easeInOut,
        },
        "moveDown"
      )
      .to(
        ".btnn",
        1,
        {
          y: "180px",
          ease: Circ.easeInOut,
          onComplete: toggleText,
        },
        "moveDown+=0.15"
      );
    reverseTimeline = pullOutTimeline;
  }
  pullOutTriggered = true;
}
function reverseAnimations() {
  if (pullOutTriggered) {
    reverseTimeline.reverse();
    reverseTimeline.seek(3);
    pullOutTriggered = false; // Allow pulling out again
  }
}

function toggleFlip() {
  if (pullOutTriggered) {
    const ry = !flipped ? 180 : 0;
    flipped = !flipped ? true : false;

    TweenMax.to(".card", 1, {
      rotationY: ry,
      ease: Power4.easeInOut,
      onComplete: toggleText,
    });
  }
}

function toggleText() {
  const text = !flipped ? " Click for more information " : "See You There!";
  button.classList.toggle("invert", !flipped);
  button.textContent = text;
}

button.addEventListener("click", pullOut);
button.addEventListener("click", toggleFlip);
button.addEventListener("click", pullOut);

function startAudio() {
  if (!audioPlayed) {
    const audio = new Audio("./mix_49s (audio-joiner.com).mp3");
    audio.loop = true;
    audio.play();
    audioPlayed = true;
  }
}

const targetDate = new Date("2024-01-31T22:00:00");

// Function to update the countdown
function updateCountdown() {
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
        <div>${days}d</div> :
        <div>${hours}h</div> : 
        <div>${minutes}m</div> : 
        <div>${seconds}</div> 
      `;

    setTimeout(updateCountdown, 1000); // Update every second
  } else {
    document.getElementById("countdown").innerHTML = "Countdown Expired";
  }
}

updateCountdown();
