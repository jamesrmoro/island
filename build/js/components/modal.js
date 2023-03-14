var modal = document.getElementById('myModal');
var elementModal = document.querySelector(".modal-content");

function getVideo(botaoClicado) {

	modal.style.display = "block";
	var iframe = botaoClicado.dataset.iframe;
	console.log(iframe)
	elementModal.innerHTML = "<span class='close'>&times;</span><iframe id='video' width='100%' height='415' src='https://www.youtube.com/embed/"+iframe+"?autoplay=1' allow='autoplay' frameborder='0' allowfullscreen></iframe>";
	var closeModal = document.querySelector(".close");
	closeModal.addEventListener('click',function(){
		modal.style.display = "none";
		elementModal.innerHTML = "";
	})
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        elementModal.innerHTML = "";
    }
}

window.onkeydown = function( event ) {
    if ( event.keyCode == 27 ) {
        modal.style.display = "none";
        elementModal.innerHTML = "";
    }
}