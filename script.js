
  let attempts = 0;
const questions = [
  {
    q: "On which date did you ask me to be yours?",
    a: "23-07-2008",
    hug: "That was the day my forever began with you. 💖",
    gif: "images/propose.gif",
    btn: "Next Moment 💭",
    caption: "One moment, one promise 💍",
     hint: "It was in July… and a date you can never forget 💕",
  },
  {
    q: "Do you remember the very first gift we gave each other?",
    a: "ring",
    hug: "It wasn’t about the gift… it was about the love behind it. 🎀",
    gif: "images/hugs.gif",
    btn: "One More ❤️",
    caption: "It wasn’t just a gift… it was a memory. 😋",
     hint: "Something small… but meant forever 💍",
  },
  {
    q: "Can you recall our first trip?",
    a: "mysore",
    hug: "Every place feels special when I’m with you. 🌅",
    hint: "A royal city with palaces 👑",
    gif: "images/hug.gif",
    btn: "To My Always 💞 💌",
    caption: "And many journeys after this ✨"
  }
];


let i = 0;
// let p =

function show(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
    p.classList.remove('visible');
  });
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('visible');
}

function start() {
  show("questionPage");
  load();
}

function load() {
  questionText.innerText = questions[i].q;
  answerInput.value = "";
  answerInput.placeholder = i === 0 ? "DD-MM-YYYY" : "Type here";
  errorMsg.innerText = "";
  hintContainer.innerText = "";
  attempts = 0;
  hugText.innerText="";
  answerInput.focus();
}

function check() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[i].a.toLowerCase();
   if (userAnswer === "") {
    errorMsg.innerText = "You have to type something first 😄💕";
    return;
  }

  if (userAnswer.includes(correctAnswer)) {
    
    // hugText.innerText = questions[i].hug;
    // typeText(hugText, questions[i].hug);
    
  typeText(hugText, questions[i].hug);


    document.getElementById("hugImage").src = questions[i].gif;
    document.getElementById("hugBtn").innerText = questions[i].btn;

  

  
    show("hugPage");
      const sound = document.getElementById("successSound");
    // successSound.currentTime = 0;
    // successSound.play().catch(() => {});
    successSound.currentTime = 0;


fadeInMusic(successSound, 2000);
    // showCaption();
  }else {
  attempts++;
  errorMsg.innerText = "Hmm… think again 😅";
  if (attempts >= 2) {
    document.getElementById("hintContainer").classList.add("show");
    document.getElementById("hintContainer").innerText = questions[i].hint;
  }
}
}
const music = document.getElementById("loveMusic");

// Wait until metadata is loaded (important!)
// music.addEventListener("loadedmetadata", function() {
//     music.currentTime = 50; // Start from 30 seconds
//     music.play();
// });
function typeText(element, text, speed = 150) {
  element.innerHTML = "";   // clear previous text
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}
function next() {

  fadeOutMusic(document.getElementById("successSound"), 1500);
    // document.getElementById("successSound").pause();
  i++;
  if (i < questions.length) {
    show("questionPage");
    load();
  } else {
    show("finalPage");
    // document.getElementById("loveMusic").play();
        setTimeout(function() {
        const music = document.getElementById("loveMusic");
        music.currentTime = 40; // optional: start from 30 sec
        music.play();
    }, 2000); // 2000ms = 2 seconds
    hearts();
  }
}

function hearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = "💖";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = (4 + Math.random() * 3) + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7000);
  }, 300);
}
function fadeOutMusic(audio, duration = 1500) {
  let step = 0.05;
  let interval = duration * step;

  let fade = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - step, 0);
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, interval);
}
function fadeInMusic(audio, duration = 3000) {
  audio.volume = 0;
  audio.play().catch(() => {});

  let step = 0.05;
  let interval = duration * step;

  let fade = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + step, 1);
    } else {
      clearInterval(fade);
    }
  }, interval);
}
document.addEventListener("DOMContentLoaded", function () {

  const input = document.getElementById("answerInput");
   
  if (!input) return; // prevents null error
  input.addEventListener("keydown", function (e) {

    const questionPage = document.getElementById("questionPage");
    if (
      e.key === "Enter" &&
      questionPage.classList.contains("visible")
    ) {
      e.preventDefault();
      check(); // calls your existing function
    }

  });

});