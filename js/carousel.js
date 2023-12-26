//obtengo cada slide del carrusel
const trackCarousel = document.querySelector('.movieCarouselTrack');
const slidesCarousel = Array.from(trackCarousel.children);

const rightButton = document.querySelector('.movieCarouselButtonRight');
const leftButton = document.querySelector('.movieCarouselButtonLeft');

//obtengo el tamaño del slide para saber cuanto mover
const slideSize = slidesCarousel[0].getBoundingClientRect().width;

const slidePosition = (slide, index) => {
    slide.style.left = slideSize * index + "px"
};
slidesCarousel.forEach(slidePosition);

//configuracion de botones
let activeSlideIndex = slidesCarousel.findIndex(slide => slide.classList.contains('movieCarouselSlideActive'));

const moveToSlide = (trackCarousel, currentSlide, targetSlide) => {
    trackCarousel.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('movieCarouselSlideActive')
    targetSlide.classList.add('movieCarouselSlideActive')
    activeSlideIndex = slidesCarousel.findIndex(slide => slide.classList.contains('movieCarouselSlideActive'));
    if (activeSlideIndex === 0) {
        leftButton.classList.add('movieCarouselButtonHidden');
        rightButton.classList.remove('movieCarouselButtonHidden');
    } else if (activeSlideIndex === slidesCarousel.length - 1) {
        leftButton.classList.remove('movieCarouselButtonHidden');
        rightButton.classList.add('movieCarouselButtonHidden');
    } else {
        leftButton.classList.remove('movieCarouselButtonHidden');
        rightButton.classList.remove('movieCarouselButtonHidden');
    }
}

leftButton.addEventListener('click', c => { 
    const currentSlide = trackCarousel.querySelector('.movieCarouselSlideActive');
    const prevSlide = currentSlide.previousElementSibling;
    moveToSlide(trackCarousel, currentSlide, prevSlide);
})

rightButton.addEventListener('click', c => {
    const currentSlide = trackCarousel.querySelector('.movieCarouselSlideActive');
    const nextSlide = currentSlide.nextElementSibling;
    moveToSlide(trackCarousel, currentSlide, nextSlide);
})
