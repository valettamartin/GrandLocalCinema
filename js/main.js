//codigo del carrusel
//obtengo cada slide del carrusel
const trackCarousel = document.querySelector('.movieCarouselTrack');
const slidesCarousel = Array.from(trackCarousel.children);

const rightButton = document.querySelector('.movieCarouselButtonRight');
const leftButton = document.querySelector('.movieCarouselButtonLeft');

const movieTitles = [
    "Mi Pobre Diablito",
    "Shellock Gnomes",
    "El Fantasma del Capitolio",
    "Rápidos e Inseguros",
    "Héroes en Almohadas"
]
const movieTimings = [
    ["17:30", "18:20", "19:40", "20:00"],
    ["18:20", "19:00", "20:30", "21:20"],
    ["18:00", "19:20", "21:00", "22:00"],
    ["17:40", "18:10", "18:40", "19:00"],
    ["15:00", "16:10", "17:40", "18:10"]
]

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
    const movieTitleH2 = document.querySelector('.enrtyShop h2');
    movieTitleH2.textContent = movieTitles[activeSlideIndex];
    const timeSelector = document.getElementById('timeSelector');
    timeSelector.innerHTML = '';
    movieTimings[activeSlideIndex].forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelector.appendChild(option);
    });
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
//fin de codigo del carrusel

//codigo del formulario
function validarFormulario() {
    let selectedDate = document.getElementById('dateSelector').value;
    let entradasNumero = document.getElementById('numberSelector').value;
    let dateToday = new Date().toISOString().split('T')[0];
    let oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    oneMonthLater = oneMonthLater.toISOString().split('T')[0];

    //controlador de fecha
    if (selectedDate < dateToday) {
        alert("¡Esta función ya pasó!");
        return false;
    } else if (selectedDate > oneMonthLater) {
        alert("¡Lo sentimos! No permitimos reservas con más de un mes de antelación.");
        return false;
    } else if (selectedDate === dateToday) {
        alert("¡Lo sentimos! Las entradas para las funciones de hoy ya se han acabado.");
        return false
    } 

    //controlador de cantidad de entradas
    if (entradasNumero > 45) {
        alert("¡Lo sentimos! Nuestras salas tienen una capacidad máxima de 45 personas.");
        return false;
    } else if (entradasNumero < 1) {
        alert("¡La cantidad de entradas ingresada no es válida!");
        return false;
    }
    
    return true;
}
//fin de codigo del formulario