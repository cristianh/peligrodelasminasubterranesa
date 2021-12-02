
let video;

function init(){
    video = document.getElementById("video-animacion");
    videoMobile = document.getElementById("video-animacion-mobile");
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

function MostrarVideo(){
    modal.style.display = "flex";
}

function OcultarVideo(){
    video.currentTime = 0
    videoMobile.currentTime = 0
    video.pause()
    videoMobile.pause()
    modal.style.display = "none";
}

function ReproducirVideo(e){
    video.play()
    document.querySelector('#videoOthers').classList.add("disabledbutton")
    video.addEventListener('ended', function(e) {

        document.querySelector('#videoOthers').classList.remove("disabledbutton")

    })
}
