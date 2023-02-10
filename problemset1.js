// This import must be done by all the sets:
import * as base from "./base.js"


export class TriangleArea extends base.Problem {
	constructor(
		parent_selector,
		problem_number,
		diagram_width = 600,
		diagram_height = 400,
		diagram_padding = 20,
		diagram_bg = "#EEEEEE"
	) {
		super(
			parent_selector,
			problem_number,
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
		this.rect_width = base.getRandomInt(this.diagram.width / 2, 100);
		this.rect_height = base.getRandomInt(this.diagram.height / 2, 100);
		this.triangle_vertex = base.getRandomInt(this.rect_width - 20, 20);
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