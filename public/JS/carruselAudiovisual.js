const btns = document.querySelectorAll(".nav_btn");
const slides = document.querySelectorAll(".video_slides");
const contents = document.querySelectorAll(".contenido");

var sliderNav = function(manual){
    btns.forEach((btn) => {
        btn.classList.remove("active");
    });

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    contents.forEach((content) => {
        content.classList.remove("active");
    });

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
}

btns.forEach((btn, i) =>{
   btn.addEventListener("click", () => {
    sliderNav(i);
   })
})