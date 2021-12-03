const loading = document.querySelector(".loading-wrapper");

const $video = document.querySelector("video");

const $playBtn = document.querySelector(".play-button");
const $progress = document.querySelector(".progress-slider");
const $progressFilled = document.querySelector(".progress__filled");

let isPlaying = false;
let currentTime = 0;

$video.oncanplay = function () {
  loading.style.display = "none";
};

$video.ontimeupdate = function () {
  const progress = Math.round(($video.currentTime / $video.duration) * 100);

  currentTime = $video.currentTime;

  $progress.value = progress;
  $progressFilled.style.width = `${progress}%`;
};

function togglePlayPause() {
  if (!isPlaying) {
    $video.play();
  } else {
    $video.pause();
  }
  $playBtn.classList.toggle("pause");
  isPlaying = !isPlaying;
}

$playBtn.addEventListener("click", togglePlayPause);

$video.addEventListener("click", togglePlayPause);

$progress.addEventListener("input", function () {
  const x = (this.value / 100) * $video.duration;
  $video.currentTime = x;
});

document.querySelector(".skip").addEventListener("click", function () {
  $video.currentTime = currentTime + 10;
});

document.querySelector(".before").addEventListener("click", function () {
  $video.currentTime = currentTime - 10;
});

document.querySelector(".volume").addEventListener("change", function () {
  $video.volume = this.value;
});
