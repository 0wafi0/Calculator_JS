const calculator = document.querySelector('.main-container');
const keys = calculator.querySelector('.panel');


keys.addEventListener('click', e => {
	
	if(e.target.matches('button')) {
		
		const action = e.target.getAttribute('data-action');
		
		if(action) {
			console.log("pressed a function!");
		}
		else {
			const currentValue = document.getElementById('display').textContent;
			const pressedValue = e.target.textContent;
			
			if(currentValue === "0") {
				document.getElementById('display').textContent = pressedValue;
			} else {
				document.getElementById('display').textContent = currentValue + pressedValue;
			}
			
		}
	}
})