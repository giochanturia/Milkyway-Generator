// This import must be done by all the sets:
import * as base from "./base.js";

export class DistanceBetweenTwoPoints extends base.Problem {
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
		this.Xmultiplier = 5;
		this.Ymultiplier = 4;

		this.x1 = base.getRandomInt(40, -40) * this.Xmultiplier;
		this.y1 = base.getRandomInt(40, -40) * this.Ymultiplier;

		this.x2 = base.getRandomInt(40, -40) * this.Xmultiplier;
		this.y2 = base.getRandomInt(40, -40) * this.Ymultiplier;

		this.dx = this.x2 - this.x1;
		this.dy = this.y2 - this.y1;

		this.distance = Math.sqrt(Math.pow(this.dy, 2) + Math.pow(this.dx, 2));
	}

	draw_diagram() {
		this.x_axis = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "lightgray")
			.attr("x1", this.diagram.width)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.diagram.width)
			.attr("y2", this.diagram.center.y);

		this.y_axis = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "lightgray")
			.attr("x1", this.diagram.center.x)
			.attr("y1", this.diagram.height)
			.attr("x2", this.diagram.center.x)
			.attr("y2", this.diagram.center.y - this.diagram.height);

		this.distance_line = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "orange")
			.attr("x1", this.diagram.center.x + this.x1)
			.attr("y1", this.diagram.center.y - this.y1)
			.attr("x2", this.diagram.center.x + this.x2)
			.attr("y2", this.diagram.center.y - this.y2);

		this.vertex_p1 = this.diagram.svg_object
			.append("circle")
			.attr("fill", "orange")
			.attr("cx", this.diagram.center.x + this.x1)
			.attr("cy", this.diagram.center.y - this.y1)
			.attr("r", 3);

		this.vertex_p2 = this.diagram.svg_object
			.append("circle")
			.attr("fill", "orange")
			.attr("cx", this.diagram.center.x + this.x2)
			.attr("cy", this.diagram.center.y - this.y2)
			.attr("r", 3);

		this.label_p1_container = this.diagram.svg_object
			.append("foreignObject")
			.attr(
				"x",
				this.diagram.center.x + this.x1 - (20 * this.dx) / this.distance - 100
			)
			.attr(
				"y",
				this.diagram.center.y - this.y1 + (20 * this.dy) / this.distance - 15
			)
			.attr("width", 200)
			.attr("height", 30)
			.attr("style", "text-align:center;");

		this.label_p1 = this.label_p1_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			// .attr("style", "font-size:8pt;")
			.text("$p_1$");

		this.label_p2_container = this.diagram.svg_object
			.append("foreignObject")
			.attr(
				"x",
				this.diagram.center.x + this.x2 + (20 * this.dx) / this.distance - 100
			)
			.attr(
				"y",
				this.diagram.center.y - this.y2 - (20 * this.dy) / this.distance - 15
			)
			.attr("width", 200)
			.attr("height", 30)
			.attr("style", "text-align:center;");

		this.label_p2 = this.label_p2_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			// .attr("style", "font-size:8pt;")
			.text("$p_2$");
	}
	update_diagram() {
		var Xmultiplier = 5;
		var Ymultiplier = 4;
		this.distance_line
			.attr("x1", this.diagram.center.x + this.x1)
			.attr("y1", this.diagram.center.y - this.y1)
			.attr("x2", this.diagram.center.x + this.x2)
			.attr("y2", this.diagram.center.y - this.y2);

		this.vertex_p1
			.attr("cx", this.diagram.center.x + this.x1)
			.attr("cy", this.diagram.center.y - this.y1);

		this.vertex_p2
			.attr("cx", this.diagram.center.x + this.x2)
			.attr("cy", this.diagram.center.y - this.y2);

		this.label_p1_container
			.attr(
				"x",
				this.diagram.center.x + this.x1 - (20 * this.dx) / this.distance - 100
			)
			.attr(
				"y",
				this.diagram.center.y - this.y1 + (20 * this.dy) / this.distance - 15
			);

		this.label_p2_container
			.attr(
				"x",
				this.diagram.center.x + this.x2 + (20 * this.dx) / this.distance - 100
			)
			.attr(
				"y",
				this.diagram.center.y - this.y2 - (20 * this.dy) / this.distance - 15
			);
	}

	update_text() {
		this.question.text(
			`სიბრტყეზე მოცემულია ორი წერტილი: $p_1=(${this.x1}, ${this.y1})$ და $p_2=(${this.x2}, ${this.y2})$. გამოთვალეთ $d$ მანძილი ამ წერტილებს შორის.`
		);
		this.answer.text(`$d=${Math.round(this.distance * 100) / 100}$`);
		this.explanation.text(
			"ორ წერტილს შორის მანძილის გამოსათვლელი ფორმულაა $$d=√{(y_2-y_1)^2+(x_2-x_1)^2}$$"
		);
		jqMath.parseMath(document.body);
	}
}
