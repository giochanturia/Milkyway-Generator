// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF FUNCTIONS:
// - - - - - - - - - - - - - - - - - - - - - - - - -

function getRandomInt(max, min = 1) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

function gcd(x, y) {
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

// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF CLASSES:
// - - - - - - - - - - - - - - - - - - - - - - - - -

var problem_counter = 0;

class Diagram {
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

class Problem {
	constructor(
		parent_selector,
		diagram_width = 600,
		diagram_height = 400,
		diagram_padding = 20,
		diagram_bg = "#EEEEEE"
	) {
		this.parent_selector = parent_selector;

		problem_counter += 1;
		this.problem_number = problem_counter;

		this.problem_div = d3
			.select(this.parent_selector)
			.append("div")
			.attr("id", `problem-${this.problem_number}`)
			.attr("class", "problem");

		this.title = this.problem_div
			.append("h4")
			.attr("class", "problem-title")
			.text(`ამოცანა #${this.problem_number}`);

		this.diagram = new Diagram(
			`#problem-${this.problem_number}`,
			diagram_width,
			diagram_height,
			diagram_padding,
			diagram_bg
		);

		this.text = this.problem_div.append("p").attr("class", "problem-text");
		this.answer = this.problem_div.append("p").attr("class", "answer-text");
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// FROM THIS POINT ON, SPECIFIC PROBLEMS ARE DEFINED:
// - - - - - - - - - - - - - - - - - - - - - - - - -

class TriangleArea extends Problem {
	constructor(
		parent_selector,
		diagram_width = 600,
		diagram_height = 400,
		diagram_padding = 20,
		diagram_bg = "#EEEEEE"
	) {
		super(
			parent_selector,
			diagram_width,
			diagram_height,
			diagram_padding,
			diagram_bg
		);

		this.randomize();
		this.draw_diagram();
		this.update_text();
	}

	randomize() {
		this.rect_width = getRandomInt(this.diagram.width / 2, 100);
		this.rect_height = getRandomInt(this.diagram.height / 2, 100);
		this.triangle_vertex = getRandomInt(this.rect_width - 20, 20);
	}

	draw_diagram() {
		this.rectangle = this.diagram.svg_object
			.append("rect")
			.attr("x", this.diagram.center.x - this.rect_width / 2)
			.attr("y", this.diagram.center.y - this.rect_height / 2)
			.attr("width", this.rect_width)
			.attr("height", this.rect_height)
			.attr("class", "shape-teal");

		this.triangle = this.diagram.svg_object
			.append("polygon")
			.attr("class", "shape-black")
			.attr(
				"points",
				`${this.diagram.center.x - this.rect_width / 2},${
					this.diagram.center.y + this.rect_height / 2
				} ${this.diagram.center.x + this.rect_width / 2},${
					this.diagram.center.y + this.rect_height / 2
				} ${
					this.diagram.center.x - this.rect_width / 2 + this.triangle_vertex
				},${this.diagram.center.y - this.rect_height / 2}`
			);
	}

	update_text() {
		this.text.text(
			`მართკუთხედის სიგანეა ${this.rect_width} სანტიმეტრი, ხოლო სიმაღლეა ${
				this.rect_height
			} სანტიმეტრი. მართკუთხედში ჩახაზულია სამკუთხედი ისე, როგორც დიაგრამაზეა მოცემული. სამკუთხედის წვერო მართკუთხედის გვერდს ჰყოფს ${
				this.triangle_vertex
			} და ${
				this.rect_width - this.triangle_vertex
			} სანტიმეტრის ზომის მონაკვეთებად. გამოთვალეთ სამკუთხედის ფართობი.`
		);
		this.answer.text(
			`პასუხი: ${
				(this.rect_width * this.rect_height) / 2
			} კვადრატული სანტიმეტრი.`
		);
	}
}

p1 = new TriangleArea("#container");
