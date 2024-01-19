//codigo del carrusel
//obtengo cada slide del carrusel
const trackCarousel = document.querySelector('.movieCarouselTrack');
const slidesCarousel = Array.from(trackCarousel.children);

const rightButton = document.querySelector('.movieCarouselButtonRight');
const leftButton = document.querySelector('.movieCarouselButtonLeft');

//solicitamos la informacion de data.json
let movieTitles = []
let movieTimings = []

fetch("../json/data.json")
    .then(res => res.json())
    .then(data => {
        data.forEach(Object => {
            movieTitles.push(Object.movieTitle),
            movieTimings.push(Object.movieTimings)
        })
    })
    .catch(error => console.error("Error al cargar data.json"))

//obtengo el tamaño del slide para saber cuanto mover
const slideSize = slidesCarousel[0].getBoundingClientRect().width;

const slidePosition = (slide, index) => {
    slide.style.left = slideSize * index + "px"
};
slidesCarousel.forEach(slidePosition);

//configuracion de botones
let activeSlideIndex = slidesCarousel.findIndex(slide => slide.classList.contains('movieCarouselSlideActive'));

//calculo de cuanto mover el carrusel y declaración de variables necesarias
const moveToSlide = (trackCarousel, currentSlide, targetSlide) => {
    trackCarousel.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('movieCarouselSlideActive')
    targetSlide.classList.add('movieCarouselSlideActive')
    activeSlideIndex = slidesCarousel.findIndex(slide => slide.classList.contains('movieCarouselSlideActive'));
    const movieTitleH2 = document.querySelector('.enrtyShop h2');
    const timeSelector = document.getElementById('timeSelector');
    timeSelector.innerHTML = '';

    //reemplaza el titulo de la pelicula por el correcto
    movieTitleH2.textContent = movieTitles[activeSlideIndex];

    //reemplaza las horas seleccionables por las correctas
    movieTimings[activeSlideIndex].forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelector.appendChild(option);
    });

    //define si el botón se muestra o no
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

//funcionalidad de los botones
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
//constructor del objeto de la compra
function crearEntradas(fecha, hora, pelicula, entradas) {
    this.fecha = fecha;
    this.hora = hora;
    this.pelicula = pelicula;
    this.entradas = entradas;
}

//evita que la pagina se recargue al enviar el form
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
});

function validarFormulario() {
    let selectedDate = document.getElementById('dateSelector').value;
    let selectedTime = document.getElementById('timeSelector').value;
    let entradasNumero = document.getElementById('numberSelector').value;
    let movieTitle = document.querySelector('.enrtyShop h2').textContent;

    //establece los dias necesarios corrigiendo la hora para coincidir con la zona horaria local
    let dateToday = new Date();
    dateToday.setHours(dateToday.getHours() - 3);
    dateToday = dateToday.toISOString().split('T')[0];
    let oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    oneMonthLater.setHours(oneMonthLater.getHours() - 3)
    oneMonthLater = oneMonthLater.toISOString().split('T')[0];

    //creación de un código para identificar la entrada
    let dateForCode = selectedDate.slice(4).replaceAll("-", "");
    let hourForCode = selectedTime.replaceAll(":","")
    let numberForCode1 = Math.floor(Math.random()*100);
    let numberForCode2 = Math.floor(Math.random()*100);
    let movieNameForCode;
    switch (movieTitle) {
        case "Mi Pobre Diablito":
            movieNameForCode = "0"
            break;
        case "Shellock Gnomes":
            movieNameForCode = "1"
            break;
        case "El Fantasma del Capitolio":
            movieNameForCode = "2"
            break;
        case "Rápidos e Inseguros":
            movieNameForCode = "3"
            break;
        case "Héroes en Almohadas":
            movieNameForCode = "4"
            break;
    }
    let purchaseIdentifier = numberForCode1 + hourForCode + dateForCode + movieNameForCode + numberForCode2;

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
    
    //creación, almacenamiento, y posteo al div correspondiente de un objeto con la información proporcionada
    const nuevaEntrada = new crearEntradas(selectedDate, selectedTime, movieTitle, entradasNumero);
    localStorage.setItem(purchaseIdentifier, JSON.stringify(nuevaEntrada));
    const mostrarEntradasDiv = document.querySelector('.mostrarEntradasAlComprar');
    mostrarEntradasDiv.innerHTML = "Usted ha adquirido " + entradasNumero + " entrada(s) para la función '" + movieTitle + "' a las " + selectedTime + " el día " + selectedDate + ".<br>Su código de compra es " + purchaseIdentifier + ", por favor, no lo pierda.";    

    return true;
}
//fin de codigo del formulario

//codigo de consulta de compras previas
document.addEventListener('DOMContentLoaded', function () {
    const consultForm = document.querySelector('.consultForm');
    const consultedInformation = document.querySelector('.consultedInformation');

     //evita que la página se recargue al enviar el formulario
    consultForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //codigo de funcionamiento de la consulta
        const consultInput = document.querySelector('.consultInput').value;
        if (localStorage.getItem(consultInput) !== null) {
            const storedObject = JSON.parse(localStorage.getItem(consultInput));
            consultedInformation.innerHTML = `
                <p>Fecha: ${storedObject.fecha}</p>
                <p>Hora: ${storedObject.hora}</p>
                <p>Película: ${storedObject.pelicula}</p>
                <p>Entradas: ${storedObject.entradas}</p>
            `;
        } else {
            consultedInformation.innerHTML = 'No encontramos una compra que coincida con este código.';
        }
    });
});
//fin del codigo de consulta de compras previas