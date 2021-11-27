const panels = document.querySelectorAll(".panel");
let openedPanel = null;

function turnOffPanel(pnl) {
  if (openedPanel) {
    openedPanel.classList.remove("open");
  } else {
    openedPanel = pnl;
  }
}

function toggleOpen() {
  if (openedPanel === this) {
    openedPanel = null;
  } else {
    turnOffPanel(this);
    openedPanel = this;
  }
  this.classList.toggle("open");
}

function toggleTextActive(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("active-text");
  }
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
  panel.addEventListener("transitionend", toggleTextActive)
);
