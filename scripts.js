const calculator = document.querySelector('.main-container');
const keys = calculator.querySelector('.panel');
let decimal = false;
let pressed = true;
let operation = "";
let value = "0";

keys.addEventListener('click', e => {
	
	if(e.target.matches('button')) {
		
		const action = e.target.getAttribute('data-action');
		
		if(action) {
			switch (action) {
				case "reset":
					Clear(e);
					break;
				case "decimal":
					if(!decimal) {
						AddDigit(e);
						decimal = true;
						pressed = false;
					}
					break;
				case "add":
					Operate(e, action);			
					break;
				case "subtract":
					Operate(e, action);		
					break;
				case "multiply":
					Operate(e, action);
					break;
				case "divide":
					Operate(e, action);		
					break;
				case "calculate":
						Calculate(e);
						operation = "";
						decimal = false;
						value = 0;
						pressed = true;
					break;
			}
		}
		else {			
			if(pressed) {
				ReplaceDigit(e);
			} else {
				AddDigit(e);
			}
			
		}
	}
});

function AddDigit(e) {
	const currentValue = document.getElementById('display').textContent;
	const pressedValue = e.target.textContent;
	document.getElementById('display').textContent = currentValue + pressedValue;
}

function ReplaceDigit(e) {
	const pressedValue = e.target.textContent;
	document.getElementById('display').textContent = pressedValue;
	pressed = false;
}

function Clear(e) {
	document.getElementById('display').textContent = "0";
	operation = "";
	decimal = false;
	pressed = true;
}

function Calculate(e) {
	let output = Number(value);
	let currentInput = Number(document.getElementById('display').textContent);
	switch (operation) {
		case "add":		
			output += currentInput
			document.getElementById('display').textContent = output;
			break;
		case "multiply":		
			output = output * currentInput
			document.getElementById('display').textContent = output;
			break;
		case "subtract":		
			output -= currentInput;
			document.getElementById('display').textContent = output;
			break;
		case "divide":		
			output /= currentInput;
			document.getElementById('display').textContent = output;
			break;
	}
}

function Operate(e, action) {
	if(operation === "") {
		operation = action;
		value = document.getElementById('display').textContent;
		pressed = true;
	} else 	{
		operation = action;
		if(!pressed) {
			Calculate(e);
		}	
		pressed = true;
		value = document.getElementById('display').textContent;
	}					
}