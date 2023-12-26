const entradasLista = [];
const informacionEntradas = [];
let peliculaNombre;
let randomNumber = Math.random()*10
randomNumber = Math.round(randomNumber)

function solicitarHorarioYEntradas(entradaNombre, horarioUno, horarioDos) {
    horario = prompt("Ha seleccionado:\n" + entradaNombre + "\n\n¿En que horario te gustaría asistir? Ingreselo aquí:\n" + horarioUno + "\n" + horarioDos)
    if (horario == horarioUno || horario == horarioDos){
        entradas = prompt ("¿Cuantas entradas desea? Por favor no ingresar palabras (Capacidad máxima por sala: 95)")
        entradas = parseInt(entradas)
        entradas = Math.floor(entradas)
        if (entradas <= 0 || entradas > 95){
            alert ("El número de entradas ingresado no es correcto")
            loop = true
        }
    }
    else {
        alert ("La hora ingresada no es correcta")
        loop = true
    }
}

function entradaNueva(entradaNumero, entradaID) {
    this.entradaNumero = entradaNumero
    this.entradaID = entradaID
}

do {
    loop = false
    pelicula = prompt("¿Qué película vas a ver? Ingresa su número:\n1-Los Juegos del Hambre\n2-Napoleón\n3-Trolls 3\n4-Paw Patrol\n5-Taylor Swift The Eras Tour");

    switch(pelicula){
        case "1":
            peliculaNombre = "Los Juegos del Hambre"
            solicitarHorarioYEntradas("Los Juegos del Hambre", "19:45", "21:30")
            break;
        case "2":
            peliculaNombre = "Napoleón"
            solicitarHorarioYEntradas("Napoleón", "19:15", "21:00")
            break;
        case "3":
            peliculaNombre = "Trolls"
            solicitarHorarioYEntradas("Trolls", "15:35", "17:00")
            break;
        case "4":
            peliculaNombre = "Paw Patrol"
            solicitarHorarioYEntradas("Paw Patrol", "14:20", "16:55")
            break;
        case "5":
            peliculaNombre = "Taylor Swift The Eras Tour"
            solicitarHorarioYEntradas("Taylor Swift The Eras Tour", "16:25", "19:40")
            break;
        default:
            alert ("La película ingresada no existe")
            loop = true
            break;
    }

} while(loop == true)

horarioID = horario.replace(":","")
precioTotal = entradas*200
codigoCompra = randomNumber + entradas + horarioID + randomNumber + pelicula

for (let i = 1; i < parseInt(entradas + 1); i++) {
    let entradaID;
    if (i<10) {
        entradaID = horarioID + pelicula + "0" + i
        entradasLista.push(new entradaNueva(i, entradaID))
    }
    else {
        entradaID = horarioID + pelicula + i
        entradasLista.push(new entradaNueva(i, entradaID))
    }
}

for (let i = 0; i < entradasLista.length; i++) {
    informacionEntradas.push("Entrada " + (i + 1) + ":\n" + "Número de entrada: " + entradasLista[i].entradaNumero + "\n" + "ID de entrada: " + entradasLista[i].entradaID + "\n" + "------------------\n");
}

alert(informacionEntradas.join(""))

alert("Usted ha adquirido " + entradas + " entrada(s) para la función '" + peliculaNombre + "' a las " + horario + " por un monto de $" + precioTotal + ".\n\n" + "Por favor, pase con el siguiente codigo de compra por su red de cobranza de confianza para confirmar la compra: " + codigoCompra)

do {
    loop = true;
    buscarSiNo = prompt("¿Desea buscar información sobre alguna de sus entradas? En dicho caso escriba el número de la entrada que desea consultar.\n\nSi desea consultar su código de pago, escriba 'pago'.");
    if (buscarSiNo > 0 && buscarSiNo <= entradas) {
        let numeroRealEntrada = buscarSiNo - 1
        alert("Usted ha consultado informción acerca de la entrada número " + buscarSiNo + ".\n\nID de entrada: " + entradasLista[numeroRealEntrada].entradaID + ".")
    } 
    else {
        if (buscarSiNo.toLowerCase() === "pago") {
            alert("Sus entradas aún no se encuentran pagas.\n\nPor favor, pase por su red de cobranza de confianza con el siguiente código:\n" + codigoCompra);
        } 
        else {
            alert("El valor ingresado no es válido");
        }
    }
    do{
    seguirSiNo = prompt("¿Desea continuar operando? Ingrese Si o No")
    seguirLoop = true
        if (seguirSiNo.toLowerCase() == "no") {
            seguirLoop = false
            loop = false
        }
        else {
            if (seguirSiNo.toLowerCase() == "si"){
                seguirLoop = false
            }
            else {
                alert ("El valor ingresado no es correcto.")
            }
        }
    } while (seguirLoop == true)
} while (loop === true);

document.getElementsByTagName('body')[0].innerText = "Usted ha adquirido " + entradas + " entrada(s) para la función '" + peliculaNombre + "' a las " + horario + " por un monto de $" + precioTotal + ".\n\n" + "Por favor, pase con el siguiente codigo de compra por su red de cobranza de confianza para confirmar la compra: " + codigoCompra + "\n\nSus entradas son:\n------------------\n" + informacionEntradas.join("");