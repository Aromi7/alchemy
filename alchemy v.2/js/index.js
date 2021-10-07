// let elements = document.querySelectorAll(".scroll_item");

// Array.from(elements).forEach(function(element) {
//       element.addEventListener('click', myFunction);
// });

const xmlhttp = new XMLHttpRequest();

let elems;

xmlhttp.onload = function() {
	elems = JSON.parse(this.responseText);
}

xmlhttp.open("GET", "../php/model/get_elems.php", false);
xmlhttp.send();

const items = elems;

let firstCond = document.querySelectorAll('.firstCond'); // Bolor arajin sharqum gtnvox diver@
let secondCond = document.querySelectorAll('.secondCond'); // Bolor erkrord containerum gtnvox diver@

document.querySelector("#trash").onclick = () => {
	Array.from(secondCond).forEach(function(e) {
		e.classList.add("animate__animated")
  		e.classList.add("animate__fadeOutDown")
  		setTimeout(() => {e.remove(); secondCond = document.querySelectorAll('.secondCond');}, 500)
	}
)}

function makeFirstRow(array) {  // es function-ov sarqum em arajin sharqi elementner@
	Array.from(array).forEach(function(e) {
		let cardDiv = document.createElement("div");
		let cardImg = document.createElement("img");
		let cardText = document.createElement("p");

		let parentFirstCont = document.querySelector(".first_container")

		cardDiv.classList.add("firstCond")
		cardImg.classList.add("image_item")
		cardText.classList.add("text_item")

		cardImg.setAttribute("src", e.img);
		cardDiv.setAttribute("id", e.id);

		if (e.name.length < 10) {
			cardText.innerText = e.name;
		}
		else {
			cardText.innerText = e.name.substring(0,7) + "...";
		}
		

		parentFirstCont.append(cardDiv);
		cardDiv.append(cardImg);
		cardDiv.append(cardText);
	})
	firstCond = document.querySelectorAll('.firstCond');
	dragFirst();
}; makeFirstRow(items);

function dragFirst() {  //Es function-@ nra hamara vor erb mardy dragov vercni element@, ira tex@ stexcvi ayl element
	Array.from(firstCond).forEach(function(element) {
	element.onmousedown = function(e) {
		let newElemId = element.id;
		element.classList.add("secondCond")
		element.classList.remove("firstCond")

		let majorElement = document.createElement("div")
		let cardImg = document.createElement("img");
		let cardText = document.createElement("p");

		cardImg.classList.add("image_item")
		cardText.classList.add("text_item")

		cardImg.setAttribute("src", items[newElemId].img);
		majorElement.setAttribute("id", items[newElemId].id);
		cardText.innerText = element.innerText;

		majorElement.append(cardImg);
		majorElement.append(cardText);

		secondCond = document.querySelectorAll('.secondCond');
		initChange();

		
		majorElement.classList.add("firstCond")
		element.insertAdjacentElement('beforebegin', majorElement)

		firstCond = document.querySelectorAll('.firstCond');
		dragFirst();

		coords = {top: event.clientY - 20, left: event.clientX - 25}; // Stex asum em vor miangamic sharjvi mkniki het
		shiftX = e.pageX - coords.left;
		shiftY = e.pageY - coords.top;
		moveAt(e)

		element.style.position = 'absolute';
		document.querySelector(".second_container").append(element);

		element.style.zIndex = 1000; // над другими элементами

		function moveAt(e) {
			element.style.left = e.pageX - shiftX + 'px';
			element.style.top = e.pageY - shiftY + 'px';
		}

     	document.onmousemove = function(e) { // stex gnuma algoritm vor stugi erku item irar het hatvum en?
     		
     		moveAt(e);
     	};

     	document.onmouseup = function() { //erb mknik@ baca toxnvum element@ kangnuma

     		Array.from(secondCond).forEach(function(elem) {
	  			checkIntersection(element, elem)
		  	})

        	document.onmousemove = null;
        	document.onmouseup = null;
     	};
		//makeMinorElement(element.id)
	}
	})
} dragFirst();

function initChange() { // Drag n Drop
  secondCond = document.querySelectorAll('.secondCond');

  Array.from(secondCond).forEach(function(element) {
  element.onmousedown = function(e) {

  let coords = getCoords(element);
  let shiftX = e.pageX - coords.left;
  let shiftY = e.pageY - coords.top;

  element.style.position = 'absolute';
  document.querySelector(".second_container").append(element);
  moveAt(e);

  element.style.zIndex = 1000; // над другими элементами

  function moveAt(e) {
    element.style.left = e.pageX - shiftX + 'px';
    element.style.top = e.pageY - shiftY + 'px';
}

  document.onmousemove = function(e) {

  	
    moveAt(e);
  };

  document.onmouseup = function() {
  	Array.from(secondCond).forEach(function(elem) { // Algorithm
  		checkIntersection(element, elem)
  	})

    document.onmousemove = null;
    document.onmouseup = null;
  };

}

element.ondragstart = function() {
  return false;
};   
});
}


function getCoords(elem) {   // кроме IE8-
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function checkCollab(idF, idS, element, elem) {
	let colf = items[idF].name;
	let cols = items[idS].name;

	let new_elem;
	xmlhttp.onload = function() {
		new_elem = JSON.parse(this.responseText);
		items.push(new_elem);
	}

	xmlhttp.open("GET", "../php/model/add_elem.php?conf="+colf+"&cons="+cols, false);
	xmlhttp.send();

	/*Array.from(items).forEach(function(e) { // stex stugum em erku dzevov unenq ardyoq nor element?
		if(e.conf === colf && e.cons === cols ) {
			collab(element, elem, e) // ete unenq kanchum em function vory kjnji hin elementner@ u kpoxi norov
		}
		else if(e.conf === cols && e.cons === colf) {
			collab(element, elem, e)
		}
	});*/
}

function collab(element, elem, e) {

	document.onmousemove = null;
	let top = element.getBoundingClientRect().top;
	let left = (element.getBoundingClientRect().left + elem.getBoundingClientRect().left) / 2;

	elem.style.top = element.style.top;

	elem.classList.add("animate__animated") // Esi libary a animationneri hamar
	element.classList.add("animate__animated")
	elem.classList.add("animate__fadeOutLeft")
	element.classList.add("animate__fadeOutRight")
	setTimeout(() => {elem.remove(); element.remove()}, 750) // stex henc animacian linuma jnjum em element@


	let newElemId = e.id; //Es amen inchov stexcum em nor element, hetagayum kgrvi arandzin function kyanq@ heshtacnelu hamar
	let majorContainer = document.querySelector(".second_container")
	let minorElement = document.createElement("div")
	let cardImg = document.createElement("img");
	let cardText = document.createElement("p");

	cardImg.classList.add("image_item")
	cardText.classList.add("text_item")

	cardImg.setAttribute("src", e.img);
	minorElement.setAttribute("id", e.id);
	cardText.innerText = e.name;

	minorElement.append(cardImg);
	minorElement.append(cardText);

	majorContainer.append(minorElement)

	minorElement.classList.add("secondCond")
	minorElement.classList.add("animate__animated")
	minorElement.classList.add("animate__fadeInDown") //STEX GALISA ANIMACIA VOR@ CHI ASHXATUM, NILONI MAMAN OBSHIOV
	// Ha che lav ashxatuma xexchi vra havayi goraci, kneres(9(((9(9 
	setTimeout(() => {minorElement.classList.remove("animate__animated"); minorElement.classList.remove("animate__fadeInDown")}, 1000)

	minorElement.style.top = top;
	minorElement.style.left = left;

	secondCond = document.querySelectorAll('.secondCond');
	initChange();
}

function checkIntersection(element, elem) {
	let trash = document.querySelector("#trash");

	if(getCoords(element).top < getCoords(elem).top + elem.offsetHeight && getCoords(element).top + element.offsetHeight > getCoords(elem).top && elem !== element) {
  		if(getCoords(element).left < getCoords(elem).left + elem.offsetWidth && getCoords(element).left + element.offsetWidth > getCoords(elem).left) {
  			checkCollab(element.id, elem.id, element, elem) // CheckCollab
  		}
  	}
  	if(getCoords(element).top < getCoords(trash).top + trash.offsetHeight && getCoords(element).top + element.offsetHeight > getCoords(trash).top) {
  		if(getCoords(element).left < getCoords(trash).left + trash.offsetWidth && getCoords(element).left + element.offsetWidth > getCoords(trash).left) {
  			element.classList.add("animate__animated")
  			element.classList.add("animate__fadeOutDown")
  			setTimeout(() => {element.remove(); secondCond = document.querySelectorAll('.secondCond');}, 500)
  			
  		}
  	}
}