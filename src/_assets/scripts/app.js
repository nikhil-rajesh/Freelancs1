import bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min";

// Initialize all input of type date
var calendars = bulmaCalendar.attach('#date-picker', { displayMode: 'dialog', type: 'date' });

// Loop on each calendar initialized
for(var i = 0; i < calendars.length; i++) {
	// Add listener to date:selected event
	calendars[i].on('select', date => {
		console.log(date);
	});
}

// To access to bulmaCalendar instance of an element
var element = document.querySelector('#date-picker');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function(datepicker) {
		console.log(datepicker.data.value());
	});
}

let dots = 4;
let sliderElem = document.querySelector('.slider')
let dotElems = sliderElem.querySelectorAll('.slider__dot')
let indicatorElem = sliderElem.querySelector('.slider__indicator')

Array.prototype.forEach.call(dotElems, (dotElem) => {

	dotElem.addEventListener('click', (e) => {

		let currentPos = parseInt(sliderElem.getAttribute('data-pos'))
		let newPos = parseInt(dotElem.getAttribute('data-pos'))

		let newDirection = (newPos > currentPos ? 'right' : 'left')
		let currentDirection = (newPos < currentPos ? 'right' : 'left')

		indicatorElem.classList.remove(`slider__indicator--${currentDirection}`)
		indicatorElem.classList.add(`slider__indicator--${newDirection}`)
		sliderElem.setAttribute('data-pos', newPos)

	})

})
