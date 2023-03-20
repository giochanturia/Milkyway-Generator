// This import must be done by all the sets:
import * as base from "./base.js";

var degrees = Math.PI / 180;

export class TriangleProblem extends base.Problem {
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
		this.AB = base.getRandomInt(
			this.diagram.width - 4 * this.diagram.padding,
			this.diagram.width / 2
		);
		this.A = { x: 0, y: 0 };
		this.B = { x: this.AB, y: 0 };
		this.alpha = base.getRandomInt(120, 15);
		this.beta = base.getRandomInt(180 - this.alpha + 1, 15);
		this.gamma = 180 - this.alpha - this.beta;
		this.C = {
			x:
				(this.AB * Math.tan(this.beta * degrees)) /
				(Math.tan(this.alpha * degrees) + Math.tan(this.beta * degrees)),
			y:
				-(
					this.AB *
					Math.tan(this.alpha * degrees) *
					Math.tan(this.beta * degrees)
				) /
				(Math.tan(this.alpha * degrees) + Math.tan(this.beta * degrees)),
		};
		this.O = {
			x:
				(this.AB * Math.tan((this.beta * degrees) / 2)) /
				(Math.tan((this.alpha * degrees) / 2) +
					Math.tan((this.beta * degrees) / 2)),
			y:
				-(
					this.AB *
					Math.tan((this.alpha * degrees) / 2) *
					Math.tan((this.beta * degrees) / 2)
				) /
				(Math.tan((this.alpha * degrees) / 2) +
					Math.tan((this.beta * degrees) / 2)),
		};
		if (
			Math.abs(this.C.y) > this.diagram.height / 2 - this.diagram.padding ||
			(this.diagram.width - this.AB) / 2 + this.C.x < this.diagram.padding ||
			(this.diagram.width - this.AB) / 2 + this.C.x >
				this.diagram.width - this.diagram.padding
		) {
			this.randomize_and_calculate();
		} else {
			this.BC = base.distanceBetweenPoints(this.B, this.C);
			this.AC = base.distanceBetweenPoints(this.A, this.C);

			this.AO1 = base.direction(this.A, this.O);
			this.BO1 = base.direction(this.B, this.O);
			this.CO1 = base.direction(this.C, this.O);

			this.transformation = `translate(${
				this.diagram.width / 2 - this.AB / 2
			}, ${this.diagram.height / 2 - this.C.y / 2})`;
		}
	}

	draw_diagram() {
		this.triangle = this.diagram.svg_object
			.append("polygon")
			.attr("class", "shape-teal")
			.attr("transform", this.transformation)
			.attr(
				"points",
				`${this.A.x},${this.A.y} ${this.B.x},${this.B.y} ${this.C.x},${this.C.y}`
			);

		this.label_a = this.create_label(this.A.x - 15, this.A.y);
		this.label_a.container.attr("transform", this.transformation);
		this.label_a.tex.text("$A$");

		this.label_b = this.create_label(this.B.x + 15, this.B.y);
		this.label_b.container.attr("transform", this.transformation);
		this.label_b.tex.text("$B$");

		this.label_c = this.create_label(this.C.x, this.C.y - 15);
		this.label_c.container.attr("transform", this.transformation);
		this.label_c.tex.text("$C$");

		this.arc = d3.arc().innerRadius(0).outerRadius(32);

		this.arc_alpha = this.diagram.svg_object
			.append("path")
			.attr(
				"d",
				this.arc
					.startAngle(90 * degrees)
					.endAngle(90 * degrees - this.alpha * degrees)
			)
			.attr("transform", this.transformation)
			.attr("class", "angle");

		this.arc_beta = this.diagram.svg_object
			.append("path")
			.attr(
				"d",
				this.arc
					.startAngle(-90 * degrees)
					.endAngle(-90 * degrees + this.beta * degrees)
			)
			.attr(
				"transform",
				this.transformation + ` translate(${this.B.x}, ${this.B.y})`
			)
			.attr("class", "angle");

		this.arc_gamma = this.diagram.svg_object
			.append("path")
			.attr(
				"d",
				this.arc
					.startAngle(270 * degrees - this.alpha * degrees)
					.endAngle(270 * degrees - this.alpha * degrees - this.gamma * degrees)
			)
			.attr(
				"transform",
				this.transformation + ` translate(${this.C.x}, ${this.C.y})`
			)
			.attr("class", "angle");

        this.label_alpha = this.create_label(this.A.x + 42 * this.AO1.x, this.A.y + 42 * this.AO1.y);
        this.label_alpha.container.attr("transform", this.transformation);
        this.label_alpha.tex.attr("class", "angle-label").text("$α$");

        this.label_beta = this.create_label(this.B.x + 42 * this.BO1.x, this.B.y + 42 * this.BO1.y);
        this.label_beta.container.attr("transform", this.transformation);
        this.label_beta.tex.attr("class", "angle-label").text("$β$");

        this.label_gamma = this.create_label(this.C.x + 42 * this.CO1.x, this.C.y + 42 * this.CO1.y);
        this.label_gamma.container.attr("transform", this.transformation);
        this.label_gamma.tex.attr("class", "angle-label").text("$γ$");

		// this.diagram.svg_object
		// 	.append("circle")
		// 	.attr("cx", this.A.x + 32 * this.AO1.x)
		// 	.attr("cy", this.A.y + 32 * this.AO1.y)
		// 	.attr("r", 3)
		// 	.attr("transform", this.transformation);
	}

	update_diagram() {
		this.triangle
			.attr("transform", this.transformation)
			.attr(
				"points",
				`${this.A.x},${this.A.y} ${this.B.x},${this.B.y} ${this.C.x},${this.C.y}`
			);

		this.align_label(this.label_a, this.A.x - 15, this.A.y);
		this.label_a.container.attr("transform", this.transformation);

		this.align_label(this.label_b, this.B.x + 15, this.B.y);
		this.label_b.container.attr("transform", this.transformation);

		this.align_label(this.label_c, this.C.x, this.C.y - 15);
		this.label_c.container.attr("transform", this.transformation);

        this.align_label(this.label_alpha, this.A.x + 42 * this.AO1.x, this.A.y + 42 * this.AO1.y);
		this.label_alpha.container.attr("transform", this.transformation);
        this.align_label(this.label_beta, this.B.x + 42 * this.BO1.x, this.B.y + 42 * this.BO1.y);
		this.label_beta.container.attr("transform", this.transformation);
        this.align_label(this.label_gamma, this.C.x + 42 * this.CO1.x, this.C.y + 42 * this.CO1.y);
		this.label_gamma.container.attr("transform", this.transformation);

		this.arc_alpha
			.attr(
				"d",
				this.arc
					.startAngle(90 * degrees)
					.endAngle(90 * degrees - this.alpha * degrees)
			)
			.attr(
				"transform",
				this.transformation + ` translate(${this.A.x}, ${this.A.y})`
			);

		this.arc_beta
			.attr(
				"d",
				this.arc
					.startAngle(-90 * degrees)
					.endAngle(-90 * degrees + this.beta * degrees)
			)
			.attr(
				"transform",
				this.transformation + ` translate(${this.B.x}, ${this.B.y})`
			);

		this.arc_gamma
			.attr(
				"d",
				this.arc
					.startAngle(270 * degrees - this.alpha * degrees)
					.endAngle(270 * degrees - this.alpha * degrees - this.gamma * degrees)
			)
			.attr(
				"transform",
				this.transformation + ` translate(${this.C.x}, ${this.C.y})`
			);
	}
}
