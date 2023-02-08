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
			.text(`Problem #${this.problem_number} `);

		this.new_numbers_button = this.title
			.append("button")
			.attr("class", "btn btn-danger")
			.text("New numbers")
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
			.append("p")
			.attr("class", "explanation-text");
	}

	new_numbers() {
		return;
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
			.attr("class", "shape-red")
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

	update_diagram() {
		this.rectangle
			.attr("x", this.diagram.center.x - this.rect_width / 2)
			.attr("y", this.diagram.center.y - this.rect_height / 2)
			.attr("width", this.rect_width)
			.attr("height", this.rect_height);

		this.triangle.attr(
			"points",
			`${this.diagram.center.x - this.rect_width / 2},${
				this.diagram.center.y + this.rect_height / 2
			} ${this.diagram.center.x + this.rect_width / 2},${
				this.diagram.center.y + this.rect_height / 2
			} ${this.diagram.center.x - this.rect_width / 2 + this.triangle_vertex},${
				this.diagram.center.y - this.rect_height / 2
			}`
		);
	}

	update_text() {
		this.text.text(
			`The width of the rectangle is ${
				this.rect_width
			} cm, while its height is ${
				this.rect_height
			} cm. A triangle is placed in the rectangle as on the diagram. The vertex of the triangle splits the edge of the rectangle in two segments of length ${
				this.triangle_vertex
			} cm and ${
				this.rect_width - this.triangle_vertex
			} cm. Calculate the area of the triangle.`
		);
		this.answer.text(
			`Answer: ${
				(this.rect_width * this.rect_height) / 2
			} quadratic centimeters.`
		);
		this.explanation.text(
			"Explanation: The area of a triangle is its base multiplied by its height halved. Since both the base and the height of the triangle are equal to the base (width) and the height of the rectangle, respectively, the area will be exatly half the area of the rectangle."
		);
	}

	new_numbers() {
		this.randomize();
		this.update_diagram();
		this.update_text();
	}
}

p1 = new TriangleArea("#container");
