/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
const body = document.querySelector<HTMLBodyElement | null>(".body");
const btn = document.querySelectorAll<HTMLButtonElement | null>(".btn");
const board = document.querySelector<HTMLDivElement | null>(".board-container");
const stats = document.querySelector<HTMLDivElement | null>(".stats");
const statsSeconds = document.querySelector<HTMLDivElement | null>(
  ".stats___times--p"
);
const statsMoves = document.querySelector<HTMLDivElement | null>(
  ".stats__moves--p"
);
const statsPoints = document.querySelector<HTMLParagraphElement | null>(
  ".stats___points--p"
);
const question = document.querySelector<HTMLParagraphElement | null>(
  ".question"
);
const cards = document.querySelectorAll<HTMLDivElement | null>(".card");
const cardsValue = document.querySelectorAll<HTMLDivElement | null>(
  ".card-value"
);
const possValue = ["👽", "👽", "🖖", "🖖", "👐", "👐"];
console.log(statsPoints.innerText);
let seconds = 0;
let countClicks = 0;
let nowValue = "";
let points = 0;
let intervalID: any;
let nowId: string;
let clicked: string[] = [];
let idArr: string[] = [];
// functions
const setTime = () => {
  seconds += 1;
  statsSeconds.innerHTML = `Time: ${seconds} seconds`;
};
const shuffle = (array: string[]) => {
  let i = 0;
  let j = 0;
  let temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  console.log(array);
};
const clickCounter = () => {
  countClicks += 1;
  statsMoves.innerHTML = `Clicks: ${countClicks}`;
};
function reload() {
  window.location.reload();
}
function start() {
  intervalID = setInterval(setTime, 1000);
}
function stop() {
  clearInterval(intervalID);
}
// eventListeners
btn[0]?.addEventListener("click", () => {
  shuffle(possValue);
  for (let i = 0; i < possValue.length; i += 1) {
    cardsValue[i].innerHTML = possValue[i];
  }
  console.log("LET'S START THE GAME!");

  board.classList.remove("d-none");
  btn[1].classList.remove("d-none");
  stats.classList.remove("d-none");
  start();
  btn[0].classList.add("d-none");
  question.classList.add("d-none");
});

const congrats = () => {
  board.classList.add("d-none");
  btn[1].classList.add("d-none");
  btn[2].classList.remove("d-none");
  stop();
  body.style.backgroundColor = "black";
};

function addPoints() {
  points += 100;
  if (points === 300) {
    setInterval(congrats, 1000);
  }
  statsPoints.innerHTML = `Points: ${points - seconds}`;
}
btn[1]?.addEventListener("click", () => {
  window.location.reload();
});
btn[2]?.addEventListener("click", () => {
  window.location.reload();
});
[...cards].forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("is-flipped");
    if (countClicks > 60) {
      alert("Have a rest and try again :(");
      reload();
    }
    clickCounter();
    nowValue = card.children[1].innerHTML;
    clicked.push(nowValue);
    nowId = card.id;
    idArr.push(nowId);
    const x = Number(idArr[0]);
    const y = Number(idArr[1]);
    if (clicked.length === 1) {
      console.log("choose one more ...");
      console.log(clicked, idArr);
    }
    if (clicked[0] === clicked[1] && clicked.length === 2 && x !== y) {
      const hide = () => {
        cards[x].classList.add("d-none");
        cards[y].classList.add("d-none");
      };
      cards[x].classList.add("is-flipped");
      cards[y].classList.add("is-flipped");
      setInterval(hide, 300);
      addPoints();
      console.log(clicked, idArr);
      clicked = [];
      idArr = [];
      console.log(clicked, idArr);
    } else if (clicked.length === 2 && clicked[0] !== clicked[1] && x !== y) {
      const flipCardBack = () => {
        cards[x].classList.remove("is-flipped");
        cards[y].classList.remove("is-flipped");
      };
      setInterval(flipCardBack, 1000);
      console.log(clicked, idArr);
      idArr = [];
      clicked = [];
      console.log(clicked, idArr);
    } else if (clicked[0] === clicked[1] && clicked.length === 2 && x === y) {
      const flipCardBack = () => {
        cards[x].classList.remove("is-flipped");
        cards[y].classList.remove("is-flipped");
      };
      // eslint-disable-next-line no-alert
      alert("you can not choose one element twice");
      setInterval(flipCardBack, 600);
      idArr = [];
      clicked = [];
      console.log(clicked, idArr);
    }
  });
});
