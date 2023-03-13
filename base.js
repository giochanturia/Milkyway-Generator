// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF FUNCTIONS:
// - - - - - - - - - - - - - - - - - - - - - - - - -

export function getRandomInt(max, min = 1) {
	return min + Math.floor(Math.random() * (max - min + 1));
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
	return strarray[Math.floor(Math.random()*(max))];
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF CLASSES:
// - - - - - - - - - - - - - - - - - - - - - - - - -

export class Diagram {
	constructor(
		parent_selector,
		width = 600,
		height = 400,
		padding = 20,
		bg = "#EEEEEE"
	) {
		this.parent_selector = parent_selector;
		this.width = width;
		this.height = height;
		this.padding = padding;
		this.bg = bg;
		this.center = { x: this.width / 2, y: this.height / 2 };

		this.svg_object = d3
			.select(this.parent_selector)
			.append("div")
			.attr("id", "svg-container")
			.append("svg")
			.attr("id", "diagram")
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("viewBox", `0 0 ${this.width} ${this.height}`);

		this.svg_object
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("fill", this.bg);
	}
}

export class Problem {
	constructor(
		parent_selector,
		problem_number,
		diagram_width = 600,
		diagram_height = 400,
		diagram_padding = 20,
		diagram_bg = "#EEEEEE"
	) {
		this.parent_selector = parent_selector;
		this.problem_number = problem_number;

		this.problem_div = d3
			.select(this.parent_selector)
			.append("div")
			.attr("id", `problem-${this.problem_number}`)
			.attr("class", "problem");

		this.title = this.problem_div
			.append("h4")
			.attr("class", "problem-title")
			.text(`ამოცანა #${this.problem_number} `);

		this.new_numbers_button = this.title
			.append("button")
			.attr("class", "btn btn-danger")
			.text("ახალი რიცხვები")
			.on("click", this.new_numbers.bind(this));

		this.diagram = new Diagram(
			`#problem-${this.problem_number}`,
			diagram_width,
			diagram_height,
			diagram_padding,
			diagram_bg
		);

		this.text = this.problem_div.append("p").attr("class", "problem-text");
		this.answer = this.problem_div.append("p").attr("class", "answer-text");
		this.explanation = this.problem_div
			.append("div")
			.attr("class", "explanation-text");

		this.randomize_and_calculate();
		this.draw_diagram();
		this.update_text();
	}

	randomize_and_calculate() {
		return;
	}

	draw_diagram() {
		return;
	}

	update_diagram() {
		return;
	}

	update_text() {
		return;
	}

	new_numbers() {
		this.randomize_and_calculate();
		this.update_diagram();
		this.update_text();
	}
}