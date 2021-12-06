function debounce(func, wait = 20, immediate = true) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    let later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  sliderImages.forEach((img) => {
    const slideInAt = window.scrollY + window.innerHeight - img.height / 2;
    const imgBottom = img.offsetTop + img.height;

    const isHalfShown = slideInAt > img.offsetTop;
    const isNotScrolledPast = window.scrollY < imgBottom;

    if (isHalfShown && isNotScrolledPast) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
