// This import must be done by all the sets:
import * as base from "./base.js";

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
	}

	randomize_and_calculate() {
		this.rect_width = base.getRandomInt(this.diagram.width / 2, 100);
		this.rect_height = base.getRandomInt(this.diagram.height / 2, 100);
		this.rect_height = Math.round(this.rect_height / 2) * 2; // so that it's always even.
		this.triangle_vertex = base.getRandomInt(this.rect_width - 20, 20);

		this.A = new base.Vector2D(
			this.diagram.center.x - this.rect_width / 2,
			this.diagram.center.y + this.rect_height / 2
		);
		this.B = new base.Vector2D(
			this.diagram.center.x + this.rect_width / 2,
			this.diagram.center.y + this.rect_height / 2
		);
		this.C = new base.Vector2D(
			this.diagram.center.x + this.rect_width / 2,
			this.diagram.center.y - this.rect_height / 2
		);
		this.D = new base.Vector2D(
			this.diagram.center.x - this.rect_width / 2,
			this.diagram.center.y - this.rect_height / 2
		);
		this.E = new base.Vector2D(
			this.diagram.center.x - this.rect_width / 2 + this.triangle_vertex,
			this.diagram.center.y - this.rect_height / 2
		);

		this.points_rectangle = [this.A, this.B, this.C, this.D];
		this.points_triangle = [this.A, this.B, this.E];
	}

	draw_diagram() {
		// this.rectangle = this.diagram.svg_object
		// 	.append("rect")
		// 	.attr("x", this.diagram.center.x - this.rect_width / 2)
		// 	.attr("y", this.diagram.center.y - this.rect_height / 2)
		// 	.attr("width", this.rect_width)
		// 	.attr("height", this.rect_height)
		// 	.attr("class", "shape shape-teal");

		// this.triangle = this.diagram.svg_object
		// 	.append("polygon")
		// 	.attr("class", "shape shape-red")
		// 	.attr(
		// 		"points",
		// 		`${this.diagram.center.x - this.rect_width / 2},${
		// 			this.diagram.center.y + this.rect_height / 2
		// 		} ${this.diagram.center.x + this.rect_width / 2},${
		// 			this.diagram.center.y + this.rect_height / 2
		// 		} ${
		// 			this.diagram.center.x - this.rect_width / 2 + this.triangle_vertex
		// 		},${this.diagram.center.y - this.rect_height / 2}`
		// 	);

		this.rectangle = new base.Polygon(
			this.diagram.svg_object,
			this.points_rectangle,
			["A", "B", "C", "D"],
			{
				css_class: "shape shape-teal",
			}
		);

		this.triangle = new base.Polygon(
			this.diagram.svg_object,
			this.points_triangle,
			["A", "B", "E"],
			{
				css_class: "shape shape-red",
			}
		);

		this.rectangle.label_all_vertices();
		this.rectangle.label_edge(0,1, {label_type: "value"});
		this.rectangle.label_edge(3,0, {label_type: "value"});
		this.triangle.label_vertex(2);
	}

	update_diagram() {
		this.rectangle.redraw_polygon(this.points_rectangle);
		this.triangle.redraw_polygon(this.points_triangle);
	}

	update_text() {
		this.question.text(
			`$ABCD$ მართკუთხედის სიგანეა $AB=${this.rect_width}$ სმ, ხოლო მისი სიმაღლეა $AD=${
				this.rect_height
			}$ სმ. მართკუთხედში ჩახაზულია სამკუთხედი, როგორც ეს ნახაზზეა. სამკუთხედის წვერო მართკუთხედის $CD$ გვერდს $DE=${
				this.triangle_vertex
			}$ და $EC=${
				this.rect_width - this.triangle_vertex
			}$ სმ სიგრძის მონაკვეთებად ყოფს. გამოთვალეთ სამკუთხედის ფართობი.`
		);
		this.answer.text(
			`სამკუთხედის ფართობია $${
				(this.rect_width * this.rect_height) / 2
			}$ კვადრატული სანტიმეტრი.`
		);
		this.explanation.text(
			"სამკუთხედის ფართობი გამოსათვლელად მისი ფუძე უნდა გავამრავლოთ სიმაღლეზე და გავყოთ ორზე. რაკი სამკუთხედის ფუძეც და სიმაღლეც ემთხვევა მართკუთხედის ფუძეს და სიმაღლეს, მისი ფართობი იქნება მართკუთხედის ფართობის ნახევარი."
		);
	}
}
