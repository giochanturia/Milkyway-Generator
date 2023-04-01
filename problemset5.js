// This import must be done by all the sets:
import * as base from "./base.js";

export class RightTriangleHeight extends base.Problem {
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
		this.a = base.getRandomInt(300, 50);
		this.b = base.getRandomInt(300, 50);
		this.c = Math.sqrt(this.a * this.a + this.b * this.b);
		this.x =
			(this.a * this.a - this.b * this.b + this.c * this.c) / (2 * this.c);
		this.h = Math.sqrt(this.a * this.a - this.x * this.x);
		this.calculate_coordinates();
	}

	calculate_coordinates() {
		this.point_a_coords = {
			x: this.diagram.center.x + this.c / 2,
			y: this.diagram.center.y + this.h / 2,
		};
		this.point_b_coords = {
			x: this.diagram.center.x - this.c / 2,
			y: this.diagram.center.y + this.h / 2,
		};
		this.point_c_coords = {
			x: this.diagram.center.x - this.c / 2 + this.x,
			y: this.diagram.center.y - this.h / 2,
		};
		this.point_d_coords = {
			x: this.diagram.center.x - this.c / 2 + this.x,
			y: this.diagram.center.y + this.h / 2,
		};

		this.A = new base.Vector2D(this.point_b_coords.x, this.point_b_coords.y);
		this.B = new base.Vector2D(this.point_a_coords.x, this.point_a_coords.y);
		this.C = new base.Vector2D(this.point_c_coords.x, this.point_c_coords.y);
		this.D = new base.Vector2D(this.point_d_coords.x, this.point_d_coords.y);
		this.points = [this.A, this.B, this.C];
	}

	draw_diagram() {
		this.triangle = new base.Polygon(
			this.diagram.svg_object,
			this.points,
			["A", "B", "C"],
			{
				css_class: "shape shape-green",
			}
		);
		this.triangle.label_all_vertices();
		this.triangle.label_edge(1, 2, { label_type: "value" });
		this.triangle.label_edge(2, 0, { label_type: "value" });

		this.triangle_height = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "red")
			// .attr("stroke-dasharray", "7")
			.attr("x1", this.point_c_coords.x)
			.attr("y1", this.point_c_coords.y)
			.attr("x2", this.point_d_coords.x)
			.attr("y2", this.point_d_coords.y);

		this.vertex_c = this.diagram.svg_object
			.append("circle")
			.attr("fill", "red")
			.attr("cx", this.point_c_coords.x)
			.attr("cy", this.point_c_coords.y)
			.attr("r", 3);

		this.vertex_d = this.diagram.svg_object
			.append("circle")
			.attr("fill", "red")
			.attr("cx", this.point_d_coords.x)
			.attr("cy", this.point_d_coords.y)
			.attr("r", 3);

		this.label_d_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_d_coords.x - 50)
			.attr("y", this.point_d_coords.y + 5)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:center;");

		this.label_d = this.label_d_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$D$");

		this.label_h_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_d_coords.x + 5)
			.attr("y", this.diagram.center.y - 10)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:left;");

		this.label_h = this.label_h_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.attr("style", "color:red;")
			.text("$h$");
	}

	update_diagram() {
		this.triangle.redraw_polygon(this.points);

		this.triangle_height
			.attr("x1", this.point_c_coords.x)
			.attr("y1", this.point_c_coords.y)
			.attr("x2", this.point_d_coords.x)
			.attr("y2", this.point_d_coords.y);

		this.vertex_c
			.attr("cx", this.point_c_coords.x)
			.attr("cy", this.point_c_coords.y);

		this.vertex_d
			.attr("cx", this.point_d_coords.x)
			.attr("cy", this.point_d_coords.y);

		this.label_d_container
			.attr("x", this.point_d_coords.x - 50)
			.attr("y", this.point_d_coords.y + 5);

		this.label_h_container
			.attr("x", this.point_d_coords.x + 5)
			.attr("y", this.diagram.center.y - 10);
	}

	update_text() {
		this.question.text(
			`მოცემულია $ACB$ მართკუთხა სამკუთხედი კათეტებით $AC=${this.a}$ და $BC=${this.b}$. $AB$ ჰიპოტენუზაზე $C$ წერტილიდან დაშვებულია $CD=h$ მართობი. იპოვეთ $h$.`
		);
		this.answer.text(`$h = ${Math.round(this.h * 100) / 100}$`);
		this.explanation.node().innerHTML = "";
		this.explanation
			.append("p")
			.text(
				`პითაგორას თეორემის მიხედვით, $AB = √{AC^2+BC^2} = ${
					Math.round(this.c * 100) / 100
				}$.`
			);
		this.explanation
			.append("p")
			.text(
				`სიმარტივისთვის, შემოვიტანოთ აღნიშვნა: $BC=a,AC=b,AB=c,BD=x$, რომლის მიხედვითაც, $$a^2 - x^2 = b^2 - (c-x)^2 = b^2 - c^2 + 2cx - x^2.$$`
			);
		this.explanation
			.append("p")
			.text(
				`$x^2$ ბათილდება ორივე მხრიდან, რის შემდეგაც საკმაოდ მარტივია $x$-ის გამოსახვა: $$x = {a^2 - b^2 + c^2}/{2c} = ${
					Math.round(this.x * 100) / 100
				}.$$`
			);
		this.explanation
			.append("p")
			.text(
				`საბოლოოდ, $$h = √{a^2 - x^2} = ${Math.round(this.h * 100) / 100}.$$`
			);
		jqMath.parseMath(document.body);
	}
}
