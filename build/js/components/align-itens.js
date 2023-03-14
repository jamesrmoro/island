countElements = document.querySelectorAll('.timeline .col .wrapper-number').length;
for (i = 0; i <= countElements-1; i++) {
	let element = document.querySelectorAll('.timeline .col .wrapper-number');
	elementHeight = element[i].clientHeight;
	let elementTop = elementHeight / 2 - 25;
	newElement = document.querySelectorAll('.timeline .col .wrapper-number .number');
	newElement[i].style.marginTop = elementTop+"px";
}