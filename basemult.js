// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF FUNCTIONS:
// - - - - - - - - - - - - - - - - - - - - - - - - -

export function getRandomInt(max, min = 1) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

export function getRandomChoice(choices) {
	return choices[Math.floor(Math.random() * choices.length)];
}

export function roundTo(num, dec) {
	return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

export function gcd(x, y) {
	if (typeof x !== "number" || typeof y !== "number") return false;
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		var t = y;
		y = x % y;
		x = t;
	}
	return x;
}

export function getRandomstr(strarray) {
	max = length(strarray);
	return strarray[Math.floor(Math.random() * max)];
}

export function factorial(num) {
	if (num === 0 || num === 1) {
		return 1;
	}
	let result = 1;
	for (let i = 2; i <= num; i++) {
		result *= i;
	}
	return result;
}

export function distanceBetweenPoints(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function direction(p1, p2) {
	let dis = distanceBetweenPoints(p1, p2);
	return { x: (p2.x - p1.x) / dis, y: (p2.y - p1.y) / dis };
}

export var degrees = Math.PI / 180;

export const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF CLASSES:
// - - - - - - - - - - - - - - - - - - - - - - - - -

export class DecimalToBinary {
    constructor(m=4) {
        this.m = m;
        this.randomize_and_calculate();
    }

    randomize_and_calculate() {
        this.n = getRandomInt(1000);
        this.answer = this.correct_answer(this.n);
        this.incorrect_answers = [];
        for(let i = 0; i<this.m-1; i++) {
            let rn = getRandomInt(1000);
            while(rn == this.n) rn = getRandomInt(1000);
            this.incorrect_answers.push(calculate_answer(rn));
        }
    }

    calculate_answer(input) {
        return input.toString(2);
    }

    generate_text() {
        return `გადაიყვანეთ ${this.n} ორობით სისტემაში.`;
    }

    generate_choices() {
        
    }
}