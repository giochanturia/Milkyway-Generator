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

		this.Av = new base.Vector2D(this.A.x, this.A.y);
		this.Bv = new base.Vector2D(this.B.x, this.B.y);
		this.Cv = new base.Vector2D(this.C.x, this.C.y);
		this.Ov = new base.Vector2D(this.O.x, this.O.y);

		this.points = [this.Av, this.Bv, this.Cv];

		if (
			Math.abs(this.C.y) > this.diagram.height / 2 - this.diagram.padding ||
			(this.diagram.width - this.AB) / 2 + this.C.x < this.diagram.padding ||
			(this.diagram.width - this.AB) / 2 + this.C.x >
				this.diagram.width - this.diagram.padding
		) {
			this.randomize_and_calculate();
		} else {
			this.BC = this.Bv.distance(this.Cv);
			this.AC = this.Av.distance(this.Cv);
			this.global_transformation = `translate(${
				this.diagram.width / 2 - this.AB / 2
			}, ${this.diagram.height / 2 - this.C.y / 2})`;
		}
	}

	draw_diagram() {
		this.triangle = new base.Polygon(
			this.diagram.svg_object,
			this.points,
			["A", "B", "C"],
			{
				css_class: "shape shape-teal",
				global_transformation: this.global_transformation,
			}
		);

		this.triangle.label_all_vertices();
	}

	update_diagram() {
		this.triangle.redraw_polygon(this.points, {
			global_transformation: this.global_transformation,
		});
	}
}

export class TriangleThirdAngle extends TriangleProblem {
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

	draw_diagram() {
		super.draw_diagram();
		this.triangle.label_angle(0, { label_type: "value" });
		this.triangle.label_angle(1, { label_type: "value" });
		this.triangle.label_angle(2, { label_text: "$γ$" });
	}

	update_text() {
		this.question.text(
			`მოცემულია $ABC$ სამკუთხედი. კუთხეები $A$ და $B$ წვეროებთან არის $${this.alpha}°$ და $${this.beta}°$. იპოვეთ $γ$ კუთხე $C$ წვეროსთან.`
		);
		this.answer.text(`$γ=${this.gamma}°$.`);
		this.explanation.text(
			`სამკუთხედის კუთხეების ჯამი ადგენს $180$ გრადუსს. ამიტომ, $γ=180°-${this.alpha}°-${this.beta}°=${this.gamma}°$.`
		);
	}
}

export class TriangleSecondEdge extends TriangleProblem {
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

	draw_diagram() {
		super.draw_diagram();
		this.triangle.label_edge(1, 2, { label_type: "value", value_rounding: 0 });
		this.triangle.label_edge(2, 0, { label_type: "custom", label_text: "$AC=?$" });
		this.triangle.label_angle(0, { label_type: "value" });
		this.triangle.label_angle(1, { label_type: "value" });
	}

	update_text() {
		this.question.text(
			`მოცემულია $ABC$ სამკუთხედი. $BC$ გვერდის სიგრძეა $${Math.round(this.BC)}$. ასევე მოცემულია კუთხეები: $∠ABC=${this.beta}°$ და $∠BAC=${this.alpha}°$. იპოვეთ $AC$ გვერდის სიგრძე.`
		);
		this.answer.text(`$AC≈${Math.round(this.AC)}$.`);
		this.explanation.text(
			`სინუსების თეორემით: $ {AC}/{BC} = {\sin(∠ABC)}/{\sin(∠BAC)}.$`
		);
	}
}


export class TriangleThirdEdge extends TriangleProblem {
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
		super.randomize_and_calculate();
		this.AC_rounded = Math.round(this.AC);
		this.alpha_rounded = Math.round(this.alpha);
		this.BC_from_rounded_values = Math.round(
			Math.sqrt(
				this.AB * this.AB +
					this.AC_rounded * this.AC_rounded -
					2 * this.AB * this.AC_rounded * Math.cos(this.alpha_rounded)
			)
		);
	}

	draw_diagram() {
		super.draw_diagram();
		this.triangle.label_edge(1, 2, {
			label_type: "custom",
			label_text: "$BC=?$",
		});
		this.triangle.label_edge(2, 0, { label_type: "value", value_rounding: 0 });
		this.triangle.label_edge(0, 1, { label_type: "value", value_rounding: 0 });
		this.triangle.label_angle(0, { label_type: "value" });
	}

	update_text() {
		this.question.text(
			`მოცემულია $ABC$ სამკუთხედი. $AB$ და $AC$ გვერდების სიგრძეებია $${this.AB}$ და $${this.AC_rounded}$. $∠BAC=${this.alpha_rounded}°$. იპოვეთ $BC$ გვერდის სიგრძე.`
		);
		this.answer.text(`$BC≈${this.BC_from_rounded_values}$.`);
		this.explanation.text(
			`კოსინუსების თეორემით: $BC^2 = AB^2 + AC^2 - 2AB·AC·\cos(∠BAC).$`
		);
	}
}
