'use strict';
// document.addEventListener('DOMContentLoaded', () => {
// });

// const orderInputs = document.querySelectorAll('.order-form input');
// function changeCurrency () {}

console.log('script');

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((item) => {
	const attr = item.getAttribute('href');
	console.log(attr);
});

// const changeCurrency = () => {
// 	const currencyBlock = document.querySelector('.currency');
// 	const currentCurrency = currencyBlock.textContent;
// 	console.log(currentCurrency.textContent);
// };
