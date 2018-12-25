const calculator = document.querySelector('.main-container');
const keys = calculator.querySelector('.panel');
let decimal = false;
let pressed = true;
let operation = "";
let value = "0";

keys.addEventListener('click', e => {
	if(e.target.matches('button')) {
		const action = e.target.getAttribute('data-action');
		const overflow = document.getElementById('display').innerHTML.length < 8;		
		if(overflow || action || pressed) {
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
	PressedRemoveAll();
}

function Clear(e) {
	document.getElementById('display').textContent = "0";
	operation = "";
	decimal = false;
	pressed = true;
	PressedRemoveAll();
}

function Calculate(e) {
	let output = Number(value);
	let currentInput = Number(document.getElementById('display').textContent);
	PressedRemoveAll();
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
	if(!(document.getElementById('display').innerHTML.length < 8)) {
		document.getElementById('display').textContent = parseFloat(document.getElementById('display').textContent).toFixed(2);
		if(!(document.getElementById('display').innerHTML.length < 8)) {
				document.getElementById('display').textContent = "error";
		}
	
	}
}

function Operate(e, action) {
	if(operation === "") {
		operation = action;
		value = document.getElementById('display').textContent;
		pressed = true;
		e.target.classList.add('pressed');
	} else 	{
		PressedRemoveAll()	
		if(!pressed) {
			Calculate(e);
		}
		operation = action;
		pressed = true;
		value = document.getElementById('display').textContent;
		e.target.classList.add('pressed');
	}					
}

function PressedRemoveAll(){
	const items = document.getElementsByClassName('op');
	for(let item of items) {
		item.classList.remove('pressed');
	}
}
