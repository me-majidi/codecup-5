const CHANGE_TYPE = {
  UP: "UP",
  DOWN: "DOWN",
};
const ERROR_TYPE = {
  NOT_FOUND: "NOT_FOUND",
  NOT_POSSIBLE: "NOT_POSSIBLE",
  INVALID_INPUT: "INVALID_INPUT",
};
let numbers = [4, 6, 10, 23, 0, 24, 30, 2];

const numbersContainer = document.querySelector("#numbers-container");
const numbersDOM = document.querySelectorAll("numbers-container");
const map = {};

function initNumbers() {
  numbers.forEach((num, i) => {
    map[num] = i;
    numbersContainer.insertAdjacentHTML("beforeend", `<span>${num}</span>`);
  });
}

function removeError() {
  const errorContainer = document.querySelector("#error-container");
  errorContainer.innerHTML = "";
}

function showError(err) {
  const errorContainer = document.querySelector("#error-container");
  errorContainer.insertAdjacentHTML("beforeend", `<p id="error">${err}</p>`);
}

function updateNumbers() {
  Array.from(numbersContainer.querySelectorAll("span")).forEach(
    (s, i) => (s.innerHTML = numbers[i])
  );

  numbers.forEach((num, i) => {
    map[num] = i;
  });
}

document.querySelector("#submit-btn").addEventListener("click", (e) => {
  removeError();
  let item = document.querySelector("#item-input").value;
  let count = document.querySelector("#count-input").value;

  if (!item || !count) {
    return showError(ERROR_TYPE.INVALID_INPUT);
  }

  item = +item;
  count = +count;

  if (typeof map[item] !== "number") {
    return showError(ERROR_TYPE.NOT_FOUND);
  }
  const direction = document.querySelector('input[type="radio"]:checked').value;

  const itemIdx = map[item];
  const nexIdx = direction === "UP" ? itemIdx + count : itemIdx - count;
  console.log(itemIdx, count, nexIdx);

  if (nexIdx < 0 || nexIdx > numbers.length - 1) {
    return showError(ERROR_TYPE.NOT_POSSIBLE);
  }

  let newArray;
  if (direction === "UP") {
    newArray = [
      ...numbers.slice(0, itemIdx),
      ...numbers.slice(itemIdx + 1, nexIdx + 1),
      item,
      ...numbers.slice(nexIdx + 1, numbers.length),
    ];
  } else {
    newArray = [
      ...numbers.slice(0, nexIdx),
      item,
      ...numbers.slice(nexIdx, itemIdx),
      ...numbers.slice(itemIdx + 1, numbers.length),
    ];
  }

  numbers = [...newArray];
  updateNumbers();
});

// Your code here...
(function () {
  initNumbers();
})();
