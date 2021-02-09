var display = document.querySelector(".display-text");
const nine = document.querySelector(".nine");
const eight = document.querySelector(".eight");
const seven = document.querySelector(".seven");
const divide = document.querySelector(".divide");

const six = document.querySelector(".six");
const five = document.querySelector(".five");
const four = document.querySelector(".four");
const times = document.querySelector(".times");

const three = document.querySelector(".three");
const two = document.querySelector(".two");
const one = document.querySelector(".one");
const diff = document.querySelector(".diff");

const clear = document.querySelector(".clear");
const zero = document.querySelector(".zero");
const sum = document.querySelector(".sum");
const total = document.querySelector(".total");

const leftB = document.querySelector(".leftB");
const rightB = document.querySelector(".rightB");
const percentage = document.querySelector(".percentage");
const dot = document.querySelector(".dot");

var number = display.innerHTML;

function middle() {
  if (number == 0) {
    number = "";
  } else if (number.length > 2) {
    while (number.includes(" ")) {
      number = number.replace(" ", "");
    }
    number = number.replace(/\d{3}(?=.)/g, "$& ");
  }
  if (number.length > 12) {
    display.style.fontSize = "18px";
  }
}
total.addEventListener("click", () => {
  if (number == "") {
  } else if (!["-", "+", "/", "*"].includes(number[number.length - 1])) {
    while (number.includes(" ")) {
      number = number.replace(" ", "");
    }
    number = eval(number);

    display.innerHTML = number;
  }
});

nine.addEventListener("click", () => {
  middle();
  number = number + "9";
  display.innerHTML = number;
});
eight.addEventListener("click", () => {
  middle();
  number = number + "8";
  display.innerHTML = number;
});
seven.addEventListener("click", () => {
  middle();
  number = number + "7";
  display.innerHTML = number;
});
six.addEventListener("click", () => {
  middle();
  number = number + "6";
  display.innerHTML = number;
});
five.addEventListener("click", () => {
  middle();
  number = number + "5";
  display.innerHTML = number;
});
four.addEventListener("click", () => {
  middle();
  number = number + "4";
  display.innerHTML = number;
});
three.addEventListener("click", () => {
  middle();
  number = number + "3";
  display.innerHTML = number;
});
two.addEventListener("click", () => {
  middle();
  number = number + "2";
  display.innerHTML = number;
});
one.addEventListener("click", () => {
  middle();
  number = number + "1";
  display.innerHTML = number;
});

dot.addEventListener("click", () => {
  middle();
  if (signCheck() == "true") {
    number = number + ".";
  }
  display.innerHTML = number;
});

function signCheck() {
  if (
    number[number.length - 1] != "/" &&
    number[number.length - 1] != "*" &&
    number[number.length - 1] != "+" &&
    number[number.length - 1] != "." &&
    number[number.length - 1] != "-"
  ) {
    return "true";
  }
}

divide.addEventListener("click", () => {
  middle();
  if (signCheck() == "true") {
    number = number + "/";
  }

  display.innerHTML = number;
});
times.addEventListener("click", () => {
  middle();
  if (signCheck() == "true") {
    number = number + "*";
  }
  display.innerHTML = number;
});
diff.addEventListener("click", () => {
  middle();
  if (signCheck() == "true") {
    number = number + "-";
  }
  display.innerHTML = number;
});
sum.addEventListener("click", () => {
  middle();
  if (signCheck() == "true") {
    number = number + "+";
  }
  display.innerHTML = number;
});

clear.addEventListener("click", () => {
  middle();
  number = "0";
  display.innerHTML = number;
});
zero.addEventListener("click", () => {
  middle();
  number = number + "0";
  display.innerHTML = number;
});
