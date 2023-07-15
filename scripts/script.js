'use strict';
document.addEventListener('DOMContentLoaded', () => {
	console.log('script');

	const mainMenuButton = document.querySelector('.main-action-button');
	const products = document.querySelector('.products');

	// Smooth
	mainMenuButton.onclick = () => {
		products.scrollIntoView({
			behavior: 'smooth'
		});
	};

	const smoothScrollingToElement = (
		parentSelector,
		childrenSelector,
		searchAttr
	) => {
		const listItems = document.querySelector(parentSelector);

		listItems.addEventListener('click', (e) => {
			e.preventDefault();
			const parent = e.target.closest(childrenSelector);

			if (e.target && parent) {
				let linkAttr = parent.getAttribute(searchAttr);

				if (linkAttr[0] !== '#') {
					linkAttr = '#' + linkAttr;
				}

				const scrollItem = document.querySelector(linkAttr);
				scrollItem.scrollIntoView({
					behavior: 'smooth'
				});
			}
		});
	};

	smoothScrollingToElement('.nav-list', '.nav-link', 'href');
	smoothScrollingToElement(
		'.products-list',
		'.products-item-info-button',
		'data-scroll'
	);
	//

	// Form
	const orderForm = document.querySelector('.order-form');
	const inputs = document.querySelectorAll('.order-form-input');

	orderForm.addEventListener('submit', function (e) {
		e.preventDefault();

		removeErrorsBlocks('.form-error');
		removeErrorsBlocks('.order-form-input', 'form-input-error');

		const formData = {};

		inputs.forEach((inp) => {
			if (inp.value) {
				formData[inp.name] = inp.value;
			} else {
				formData[inp.name] = '';
			}
		});

		let errText = addErrorsClasses(formData, 'form-input-error', e.target);

		if (!errText) {
			const alertMessage =
				'Thanks for order ' +
				Object.entries(formData)
					.map((el) => `${el[0]}: ${el[1]}`)
					.join(', ');

			alert(alertMessage);
		}
	});

	const addErrorsClasses = (data, inputErrorClass, formElement) => {
		let errorText = '';

		for (let key in data) {
			if (!data[key]) {
				errorText = `Input field ${key.toUpperCase()} is not valid`;

				const inputWithError = document.querySelector(`[name=${key}]`);
				inputWithError.classList.add(inputErrorClass);

				addErrorBlocks('div', 'form-error', formElement, errorText);
			}
		}
		return errorText;
	};
	const addErrorBlocks = (
		createElementTag = 'div',
		errorClass,
		parentElement,
		errorText
	) => {
		const errorBlock = document.createElement(createElementTag);
		errorBlock.classList.add(errorClass);
		errorBlock.textContent = errorText;
		parentElement.append(errorBlock);
	};
	const removeErrorsBlocks = (errorSelector, className) => {
		const errors = document.querySelectorAll(errorSelector);
		if (errors) {
			if (className) {
				errors.forEach((input) => input.classList.remove(className));
			} else {
				errors.forEach((error) => error.remove());
			}
		}
	};
	//

	// Currency

	const changeCurrency = (parentSelector, productsSelector) => {
		const currencysData = {
			$: { newCurr: '€', coefficient: 1 },
			'€': { newCurr: '₽', coefficient: 0.89 },
			'₽': { newCurr: '$', coefficient: 101.2 }
		};

		document
			.querySelector(parentSelector)
			.addEventListener('click', (e) => {
				const currency = e.target.innerText;

				let newCurrency = currencysData[currency].newCurr;
				e.target.innerText = newCurrency;

				const productsItems =
					document.querySelectorAll(productsSelector);

				productsItems.forEach((product) => {
					const itemPrice = +product.dataset.productsPrice;

					const calcNewCurrency = (
						itemPrice * currencysData[newCurrency].coefficient
					).toFixed();

					product.textContent = `${calcNewCurrency} ${newCurrency}`;
				});
			});
	};

	changeCurrency('.currency', '.products-item-info-price');
});
