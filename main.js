var currentItem = 0;
var items;
var container = document.querySelector(".slideContainer");

function setup() {
  items = document.querySelectorAll(".slideItem");

  for (var i=0; i<items.length; i++) {
    var rotation = getRotation() + "deg";
    var item = items[i];
    item.style.transform = "rotate(" + rotation + ")";
    item.style.zIndex = 1000 - i;
  }
}
setup();

container.addEventListener("keydown", navigateCarousel, false);
container.addEventListener("touchstart", startTouch, false);
container.addEventListener("touchmove", moveTouch, false);


// Keyboard

function navigateCarousel(e) {
  var key = e.keyCode;
  if (key === 37) {
    previousItem();
  } else if (key === 39) {
    nextItem();
  }
}


// Swipe left or right

var initialX = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
}

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var diffX = initialX - currentX;

  if (diffX > 0) {
    nextItem();
  } else {
    previousItem();
  }

  initialX = null;

  e.preventDefault();
}

function previousItem() {
  if (currentItem > 0) {
    currentItem--;

    var item = items[currentItem];
    var rotation = getRotation() + "deg";

    item.style.transitionDuration = ".3s";
    item.style.transform = "translate3d(0px, 0, 0) rotate(" + rotation + ")";
    item.style.opacity = 1;
  } else {
    currentItem = 0;
  }
}

function nextItem() {
  if (currentItem < items.length - 1) {
    var item = items[currentItem];

    item.style.transitionDuration = ".7s";
    item.style.transform = "translate3d(-100px, 0, 0) rotate(15deg)";
    item.style.opacity = 0;

    currentItem++;
  } else {
    currentItem = items.length - 1;
  }
}

function getRotation() {
  return Math.round(-3 + Math.random() * 7);
}
