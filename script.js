
let video;
let idBotoneOpcionesEscena3 = [
    '#opcion1',
    '#opcion2',
    '#opcion3',
    '#opcion4'
]
let mensajesEscena3 = [
    '.proteccion-mineros',
    '.comen-mineros',
    '.temperatura-mineros',
    '.dormir-mineros'
]



let animacionGaspTaladro = null
let animacionGaspBroca = null

/**
 * VARIABLES PARA EL JUEGO
 */
let minerosJuego = [
    '.minero1',
    '.minero2',
    '.minero3',
    '.minero4',
    '.minero5',
    '.minero6'
]

let minerosInfo = [
    { Nombre: 'Florencio Ávalos', Edad: 31, ProfeCargo: 'Capataz' },
    { Nombre: 'Mario Sepúlveda', Edad: 39, ProfeCargo: 'Electricista' },
    { Nombre: 'Juan Llanes', Edad: 52, ProfeCargo: 'Operario de mina' },
    { Nombre: 'Carlos Mamani', Edad: 23, ProfeCargo: 'Operario de máquinas' },
    { Nombre: 'Jimmy Sánchez', Edad: 19, ProfeCargo: 'Operario de mina' },
    { Nombre: 'Osmán Araya', Edad: 30, ProfeCargo: 'Operario de mina' },
]


const contenedortime = document.getElementById("indicador-tiempo")

let minutos = '0'
let segundos = '0'
let horas = '0'
let temporizador;
let finalCajon = false
let estadoMensajeRescate = true



var currentAngle = 15;
let tamanocuerda = 10
let limitecurda = 325
let posicioncaja = 15
let derecha = false
let izquierda = false

/*  FIN VARIABLES JUEGO  */
//Using a layer on top of the entire page for "fat-finger" detection on mobile devices.
/* document.getElementById('rotatable').style.transform = 'rotate(15deg)'; */

let target = document.getElementById('rotate-container');
let region = new ZingTouch.Region(target);
let rotatable = document.getElementById('rotatable');

let contadoMinerosRescatados = 0

function init() {
    idBotoneOpcionesEscena3.forEach(element => {
        document.querySelector(element).addEventListener('click', mostrarMensaje, false)
    });



}


function cargarJuego() {
    document.querySelector('.mineros-rescate').style.display = 'none'
    document.querySelector('.juego').style.display = 'block'
    temporizador = setInterval(ActualizaTiempo, 1000)
    region.bind(target, 'rotate', girarPolea);
}

function menuLateral(opcionMenu) {

    switch (opcionMenu) {
        case 1:
            document.querySelector('.escena2').style.display='grid'
            document.querySelector('.contenedor-escena3').style.display='none'
            document.querySelector('.mineros-rescate').style.display='none'
            document.querySelector('.dormir-mineros').style.display='none'
            document.querySelector('#tituloInteractiva').style.display='none'

            break;
        case 2:
            document.querySelector('.escena2').style.display='none'
            document.querySelector('.contenido-actividad-bienvenida').style.backgroundImage='url(./assets/img/fondosupervivencia.png)'
            document.querySelector('.contenedor-escena3').style.display='block'
            document.querySelector('.mineros-rescate').style.display='none'
            document.querySelector('#tituloInteractiva').style.display='none'
            break;
        case 3:
            document.querySelector('.escena2').style.display='none'
            document.querySelector('.contenedor-escena3').style.display='none'
            document.querySelector('.imagenescena-mineros-dormir').style.display='none'
            document.querySelector('.mineros-rescate').style.display='block'
            document.querySelector('#tituloInteractiva').style.display='none'
            document.querySelector('.mensaje-mineros-rescate').style.display='block'
        
            

            break;

        default:
            break;
    }

}

function cargarEsenaAccidente(){
    document.querySelector('#tituloInteractiva').style.display='none'
    document.querySelector('.contenido-actividad-bienvenida').style.backgroundImage='none';
    document.querySelector('.contenedor-texto').style.display='none';
    document.querySelector('.botones-Menu').style.display='block';
    document.querySelector('.escena2').style.display='grid';
    tippy(`#opcion1-accidente`, {
        content: 'Zona del derrumbe',
        theme: 'material',

    });
    tippy(`#opcion2-accidente`, {
        content: 'Refugio',
        theme: 'material',

    });
    tippy(`#opcion3-accidente`, {
        content: 'Sonda de alimentación',
        theme: 'material',

    });
    /* document.querySelector('.contenido-actividad-bienvenida').style.backgroundImage='url(./assets/img/imagenFondo.png)'; */
}


/**
 * 
 * @param {integer} opcionClick 
 */
function menuAccidente(opcionClick){
    document.querySelector('.zona-derrumbe').style.display="none"
    document.querySelector('.zona-refugio').style.display="none"
    document.querySelector('.sonda-alimentacion').style.display="none"
    document.querySelector('.sondas').style.display="none"
    document.querySelector('.sondas-animacion').style.display="none"
    document.querySelector('.sondas-animacion').style.animation="none"
    document.querySelector('.profundidad').style.display="none"
    switch (opcionClick) {
        case 1:
            document.querySelector('.zona-derrumbe').style.display="block"
            break;
        case 2:
            document.querySelector('.zona-refugio').style.display="block"
            break;
        case 3:
            document.querySelector('.sonda-alimentacion').style.display="block"
            break;
        case 4:
          
            document.querySelector('.sondas-animacion').style.display="block"
            document.querySelector('.sondas').style.display="block"
            document.querySelector('.sondas-animacion').style.animation="animacionsondas 2s infinite"
            break;
        case 5:
            document.querySelector('.profundidad').style.display="block"
            break;
    
        default:
            break;
    }
}


function ActualizaTiempo() {
    contenedortime.innerHTML = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
    segundos = Number(segundos) + Number(1)

    if (segundos == 60) {

        minutos = Number(minutos) + 1
        segundos = 0

    }

    if (minutos == 60) {
        horas = Number(horas) + 1
        minutos = 0
        segundos = 0
    }

    document.querySelector("#temporizador").innerHTML = `<span><b>Tiempo:</b></span><br><h6 style="color:red; font-size:18px">${contenedortime.innerHTML}</h6>`
}







function girarPolea(e) {
    currentAngle += e.detail.distanceFromLast;
    rotatable.style.transform = 'rotate(' + currentAngle + 'deg)';

    setOutput([
        ['Gesture', 'Rotate'],
        ['angle', Math.floor(e.detail.angle) + "°"],
        ['distanceFromOrigin', Math.floor(e.detail.distanceFromOrigin) + "°"],
        ['distanceFromLast', Math.floor(e.detail.distanceFromLast) + "°"]
    ]);

}

function setOutput(data) {
    var outputStr = "> ";
    for (var i = 0; i < data.length; i++) {
        outputStr += data[i][0] + ": " + data[i][1] + ((i === data.length - 1) ? '' : ' , ');
    }
    var output = document.getElementById('output');
    let caja = document.querySelector('.canasta')
    let cuerda = document.querySelector('.cuerda')

    let cuerdaStyle = cuerda.style


    console.log(data[2][1].replace('°', ''));


    if (data[2][1].replace('°', '') > 0) {

        izquierda = true;
        derecha = false



        //cuerda.setProperty('--animacion-cuerda', `${tamanocuerda * (-1)}px`)


    }

    if (data[2][1].replace('°', '') < 0) {




        derecha = true;
        izquierda = false;

        if (tamanocuerda < 15) { //Limite superior

        } else {

            if (posicioncaja > 10) {
                tamanocuerda -= 1
                posicioncaja -= 1
                caja.style.top = `${posicioncaja}px`

            } else {
                tamanocuerda = 10
                posicioncaja = 10
                estadoMensajeRescate = true
                document.querySelector('#rotatable').style.pointerEvents = 'none'
                document.querySelector('.MensajeRescate2').style.visibility = "visible"
                document.querySelector('.descripcion-minero-rescado').style.display = "none"
                mostrarMensajeRescate(2)

            }

            //cuerda.setProperty('--animacion-cuerda', `${tamanocuerda * (-1)}%`)
            cuerdaStyle.setProperty('--animacion-tamano-cuerda2', `${tamanocuerda}px`)
            if (data[2][1].replace('°', '') > 10 && data[2][1].replace('°', '') > 300) {

            }
        }



    }




    if (derecha) {
        if (data[2][1].replace('°', '') < 10) {

        }

    }

    if (izquierda) { //limite inferior de la cuerda

        if (data[2][1].replace('°', '') < 335) {
            if (tamanocuerda > 405) {//Limite inferior
                if (estadoMensajeRescate) {
                    document.querySelector('#rotatable').style.pointerEvents = 'none'
                    /* region.unbind(target, 'rotate',girarPolea); */
                    document.querySelector('.descripcion-minero-rescado').style.display = "flex"
                    contadoMinerosRescatados += 1
                    document.querySelector('.contador-mineros-rescatados').innerHTML = `x ${contadoMinerosRescatados}`
                    finalCajon = true
                    estadoMensajeRescate = false
                    document.querySelector('.MensajeRescate1').style.visibility = "visible"
                    mostrarMensajeRescate(1)

                }

            } else {
                document.querySelector('.descripcion-minero-rescado').style.display = "none"
                console.log('izquierda')
                tamanocuerda += 1
                cuerdaStyle.setProperty('--animacion-tamano-cuerda2', `${tamanocuerda}px`)
            }
        }

        if (data[2][1].replace('°', '') > 10 && data[2][1].replace('°', '') < 300) {
            if (tamanocuerda < 405) {
                posicioncaja += 1
                caja.style.top = `${posicioncaja}px`
            }


        }
    }



    output.innerHTML = outputStr;
}


function mostrarMensajeRescate(idmensaje) {

    switch (idmensaje) {
        case 1:

            document.querySelector('.MensajeRescate1').addEventListener('click', ocultarMineros, false)
            break;

        case 2:

            document.querySelector('.MensajeRescate2').addEventListener('click', ocultarMineros, false)

            break;

        default:
            break;
    }

    if (finalCajon && minerosInfo.length != 0 && minerosJuego.length != 0) {
        document.querySelector('.texto-descripcion').innerHTML = `
        <p><b>Nombre del minero: </b> ${minerosInfo[0].Nombre}</p>
        <p><b>Edad: </b>${minerosInfo[0].Edad}</p>
        <p><b>Profesion / Cargo: </b> ${minerosInfo[0].ProfeCargo}</p>
    `
    }

}



function ocultarMineros() {
    if (estadoMensajeRescate) {
        document.querySelector('.MensajeRescate2').removeEventListener('click', ocultarMineros, false)
        document.querySelector('#rotatable').style.pointerEvents = 'all'
        document.querySelector('.MensajeRescate2').style.visibility = "hidden"
        validarFinJuego()
    } else {
        document.querySelector('.MensajeRescate1').removeEventListener('click', ocultarMineros, false)
        document.querySelector('#rotatable').style.pointerEvents = 'all'
        document.querySelector(minerosJuego[0]).style.visibility = 'hidden'
        document.querySelector('.MensajeRescate1').style.visibility = "hidden"
        minerosJuego.shift()
        minerosInfo.shift()

    }
}

function animacionTaladro() {
    let taladro = document.querySelector('.centro-taladro')
    let contenedorMinerosRescate = document.querySelector('.mineros-rescate')
    document.querySelector('.mensaje-mineros-rescate').style.display='none'
    /*  taladro.style.animation='animatataladro 5s ease-in'
     taladro.style.animationDelay='.4s'
     taladro.style.animationFillMode='forwards' */
     let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
        animacionGaspBroca = gsap.to(taladro, {
            height: 1201,
            duration: 5, ease: Linear.easeIn, onComplete: () => {
                document.querySelector('.brocagrande').style.display = 'block'
            }
        });
        animacionGaspTaladro = gsap.to(contenedorMinerosRescate, {
            top: -1090,
            duration: 5, ease: Linear.easeIn, onComplete: () => {
                document.querySelector('.mensaje-broca-rescate').style.display = 'flex'
                document.querySelector('.brocagrande').addEventListener('click', reverseAnimacionTaladro, false)
            }
        });
    }else{
        animacionGaspBroca = gsap.to(taladro, {
            height: 1200,
            duration: 6, ease: Linear.easeIn, onComplete: () => {
                document.querySelector('.brocagrande').style.display = 'block'
                document.querySelector('.mensaje-broca-rescate').style.display = 'flex'
            }
        });
        animacionGaspTaladro = gsap.to(contenedorMinerosRescate, {
            top: -1192,
            duration: 6, ease: Linear.easeIn, onComplete: () => {
                
                document.querySelector('.brocagrande').addEventListener('click', reverseAnimacionTaladro, false)
            }
        });
    }
  

  
}

function reverseAnimacionTaladro() {
    document.querySelector('.brocagrande').style.visibility = 'hidden'
    document.querySelector('.mensaje-broca-rescate').style.display = 'none'
    

    document.querySelector('.centro-taladro').style.backgroundImage = "none"
    document.querySelector('.taladro').style.gridTemplateColumns = '11fr 1fr 11fr';
    document.querySelector('.centro-taladro').style.backgroundImage = "url('./assets/img/taladro2.svg')"
    animacionGaspTaladro.reverse()
    animacionGaspBroca.reverse().eventCallback("onReverseComplete", () => {
        document.querySelector('.centro-taladro').style.backgroundImage = "url('./assets/img/zonda-fenix.svg')"
        document.querySelector('.texto1-mesaje-fenix').style.display = 'flex'
        
    });
    animacionGaspTaladro.addEventListener("transitionend", () => {

    });


    /*  document.querySelector('.taladro').style.animation='animatataladroReverse 5s ease-in'
     setTimeout(() => {
        
     }, 1200); */
}

function envirAssistencia() {
    document.querySelector('.texto1-mesaje-fenix').style.display = 'none'
    animacionGaspBroca.play().eventCallback("onComplete", () => {
        document.querySelector('.mensaje-fenix').style.display = 'block'
    });
    animacionGaspTaladro.play()
}

function siguienteRescateFexi() {
    document.querySelector('.texto2-mesaje-fenix').style.display = 'none'
    document.querySelector('.texto3-mesaje-fenix').style.display = 'flex'

}

function mostrarMensaje(e) {
    ocultarMensaje()
    let mensaje = document.querySelector(mensajesEscena3[e.target.id.substring(e.target.id.length - 1) - 1])

    document.querySelector('.imagenescena-mineros-dormir').style.display = 'none'
    document.querySelector('.imagenescena-mineros-comer').style.display = 'none'
    document.querySelector('.zonda-comida').style.display = 'none'

    switch (e.target.id.substring(e.target.id.length - 1)) {
        case '1':
            document.querySelector('.imagenescena-mineros-comer').style.display = 'block'
            break;
        case '2':
            document.querySelector('.imagenescena-mineros-comer').style.display = 'block'
            document.querySelector('#imagen-zonda-comida').setAttribute('src','./assets/animaciones/comida.gif');
            document.querySelector('.zonda-comida').style.display = 'block'
            break;
        case '3':
            document.querySelector('.imagenescena-mineros-comer').style.display = 'block'
            break;
        case '4':
            document.querySelector('.imagenescena-mineros-dormir').style.display = 'block'
            break;

        default:

            break;
    }

    mensaje.style.display = "block"

}

function validarFinJuego() {
    if (minerosInfo.length == 0 && minerosJuego.length == 0) {
        document.querySelector('.mensaje-final-juego').style.display = "block"
        document.querySelector('.mensaje-final-juego').innerHTML += contenedortime.innerHTML
        let boton = `<div style="width:59%;margin:0px auto" onclick="reiniciarJuego()"><div class="button">Volver  Jugar</div></div>`
        document.querySelector('.mensaje-final-juego').innerHTML += boton
        clearInterval(temporizador)
    }
}

function ocultarMensaje() {
    mensajesEscena3.forEach(element => {
        document.querySelector(element).style.display = "none"
    });
}


function reiniciarJuego() {

    minerosJuego = [
        '.minero1',
        '.minero2',
        '.minero3',
        '.minero4',
        '.minero5',
        '.minero6'
    ]

    minerosInfo = [
        { Nombre: 'Florencio Ávalos', Edad: 31, ProfeCargo: 'Capataz' },
        { Nombre: 'Mario Sepúlveda', Edad: 39, ProfeCargo: 'Electricista' },
        { Nombre: 'Juan Llanes', Edad: 52, ProfeCargo: 'Operario de mina' },
        { Nombre: 'Carlos Mamani', Edad: 23, ProfeCargo: 'Operario de máquinas' },
        { Nombre: 'Jimmy Sánchez', Edad: 19, ProfeCargo: 'Operario de mina' },
        { Nombre: 'Osmán Araya', Edad: 30, ProfeCargo: 'Operario de mina' },
    ]




    minutos = '0'
    segundos = '0'
    horas = '0'
    temporizador;
    finalCajon = false
    estadoMensajeRescate = true



    currentAngle = 15;
    tamanocuerda = 10
    limitecurda = 325
    posicioncaja = 15
    derecha = false
    izquierda = false

    /*  FIN VARIABLES JUEGO  */
    //Using a layer on top of the entire page for "fat-finger" detection on mobile devices.
    /* document.getElementById('rotatable').style.transform = 'rotate(15deg)'; */

    target = document.getElementById('rotate-container');
    region = new ZingTouch.Region(target);
    rotatable = document.getElementById('rotatable');

    contadoMinerosRescatados = 0

    document.querySelector('.mensaje-final-juego').style.display = "none"
    document.querySelector('.mensaje-final-juego').innerHTML = ''

    minerosJuego.forEach(element => {
        document.querySelector(element).style.visibility = 'visible'
    });

    cargarJuego()
}



// Get the modal
let modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

/* span.addEventListener('click', ocultarModal); */
window.addEventListener('click', ocultarModalVentana)

function ocultarModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
function ocultarModalVentana(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function MostrarVideo() {
    modal.style.display = "flex";
}

function OcultarVideo() {
    video.currentTime = 0
    videoMobile.currentTime = 0
    video.pause()
    videoMobile.pause()
    modal.style.display = "none";
}

function ReproducirVideo(e) {
    video.play()
    document.querySelector('#videoOthers').classList.add("disabledbutton")
    video.addEventListener('ended', function (e) {

        document.querySelector('#videoOthers').classList.remove("disabledbutton")

    })
}
