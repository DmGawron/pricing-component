const pageviewNumbersSpan = document.querySelector("#pageview-number");
const perMonthPriceSpan = document.querySelector("#per-month-price");
const sliderInput = document.querySelector("#my-slider-range");
const sliderDate = document.querySelector("#slider-date");
const sliderDateCircle = document.querySelector("#slider-circle");
const discountSpan = document.querySelector("#discount-span");

let sliderValue = null;
// console.log(sliderValue);
// - 10K pageviews / $8 per month
// - 50K pageviews / $12 per month
// - 100K pageviews / $16 per month
// - 500k pageviews / $24 per month
// - 1M pageviews / $36 per month

let discount = false;

function setPriceAndPageValues(sliderValue) {
	let pageviews = 0;
	let pricePerMont = 0;
	console.log(sliderValue);
	if (sliderValue === 20) {
		pageviews = "10K";
		pricePerMont = 8;
	} else if (sliderValue === 40) {
		pageviews = "50K";
		pricePerMont = 12;
	} else if (sliderValue === 60) {
		pageviews = "100K";
		pricePerMont = 16;
	} else if (sliderValue === 80) {
		pageviews = "500K";
		pricePerMont = 24;
	} else if (sliderValue === 100) {
		pageviews = "1M";
		pricePerMont = 36;
	}

	if (discount) {
		pricePerMont = addDiscount(pricePerMont);
	}

	return changeTextPerSlideChange(pageviews, pricePerMont);
}

function addDiscount(pricePerMont) {
	return pricePerMont - pricePerMont * (25 / 100);
}

function changeTextPerSlideChange(views, perMont) {
	console.log(views, perMont);
	pageviewNumbersSpan.textContent = views;
	perMonthPriceSpan.textContent = `$${perMont.toFixed(2)}`;
}

function changeBar(e) {
	sliderValue = Number(sliderInput.value);

	console.log(sliderValue);
	// Aktualizacja tła paska
	sliderInput.style.background = `linear-gradient(to right, hsl(174, 77%, 65%) ${
		sliderValue - 20
	}%, var(--LightGrayishBlue) ${sliderValue}%)`;
	setPriceAndPageValues(sliderValue);
	// changeTextPerSlideChange();
}

changeBar();

function changeDateSlide() {
	const sliderCircle = sliderDate.querySelector("#slider-circle");
	// console.log(sliderDate.querySelector("#slider-circle"));
	sliderCircle.classList.toggle("active");
	if (sliderCircle.classList.contains("active")) {
		discount = true;
		discountSpan.classList.remove("hidden");
	} else {
		discount = false;
		discountSpan.classList.add("hidden");
	}

	setPriceAndPageValues(sliderValue);
}

sliderInput.addEventListener("input", changeBar);

sliderDate.addEventListener("click", changeDateSlide);

//media queries

function updateText() {
	if (window.innerWidth < 600) {
		discountSpan.textContent = "-25%";
	} else {
		discountSpan.textContent = "25% discount";
	}
}

window.addEventListener("resize", updateText);
