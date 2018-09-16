const target_date = new Date("September 30, 2018 12:00:00");
let days, hours, minutes, seconds;

const countdown = document.getElementById("tiles");

getCountdown();

setInterval(function() {
  getCountdown();
}, 1000);

function getCountdown() {
  const current_date = new Date().getTime();
  let seconds_left = (target_date - current_date) / 1000;

  days = pad(parseInt(seconds_left / 86400));
  seconds_left = seconds_left % 86400;

  hours = pad(parseInt(seconds_left / 3600));
  seconds_left = seconds_left % 3600;

  minutes = pad(parseInt(seconds_left / 60));
  seconds = pad(parseInt(seconds_left % 60));

  countdown.innerHTML =
    "<span>" +
    days +
    "</span><span>" +
    hours +
    "</span><span>" +
    minutes +
    "</span><span>" +
    seconds +
    "</span>";
}

function pad(n) {
  return (n < 10 ? "0" : "") + n;
}
