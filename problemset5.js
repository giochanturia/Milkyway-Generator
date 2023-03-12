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
	}

	draw_diagram() {
		this.calculate_coordinates();

		this.triangle = this.diagram.svg_object
			.append("polygon")
			.attr("class", "shape-teal")
			.attr(
				"points",
				`${this.point_a_coords.x},${this.point_a_coords.y} ${this.point_b_coords.x},${this.point_b_coords.y} ${this.point_c_coords.x},${this.point_c_coords.y}`
			);

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

		this.label_a_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_a_coords.x + 10)
			.attr("y", this.point_a_coords.y - 10)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:left;");

		this.label_a = this.label_a_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$A$");

		this.label_b_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_b_coords.x - 110)
			.attr("y", this.point_b_coords.y - 10)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:right;");

		this.label_b = this.label_b_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$B$");

		this.label_c_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_c_coords.x - 50)
			.attr("y", this.point_c_coords.y - 30)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:center;");

		this.label_c = this.label_c_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$C$");

		this.label_d_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_d_coords.x - 50)
			.attr("y", this.point_d_coords.y + 10)
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

		this.label_BC_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_d_coords.x - this.x / 2 - 110)
			.attr("y", this.diagram.center.y - 10)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:right;");

		this.label_BC = this.label_BC_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text(`$${this.a}$`);

		this.label_AC_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.point_d_coords.x + (this.c - this.x) / 2 + 10)
			.attr("y", this.diagram.center.y - 10)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:left;");

		this.label_AC = this.label_AC_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text(`$${this.b}$`);
	}

	update_diagram() {
		this.calculate_coordinates();

		this.triangle.attr(
			"points",
			`${this.point_a_coords.x},${this.point_a_coords.y} ${this.point_b_coords.x},${this.point_b_coords.y} ${this.point_c_coords.x},${this.point_c_coords.y}`
		);

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

		this.label_a_container
			.attr("x", this.point_a_coords.x + 10)
			.attr("y", this.point_a_coords.y - 10);

		this.label_b_container
			.attr("x", this.point_b_coords.x - 110)
			.attr("y", this.point_b_coords.y - 10);

		this.label_c_container
			.attr("x", this.point_c_coords.x - 50)
			.attr("y", this.point_c_coords.y - 30);

		this.label_d_container
			.attr("x", this.point_d_coords.x - 50)
			.attr("y", this.point_d_coords.y + 10);

		this.label_h_container
			.attr("x", this.point_d_coords.x + 5)
			.attr("y", this.diagram.center.y - 10);

		this.label_BC_container.attr("x", this.point_d_coords.x - this.x / 2 - 120);
		this.label_BC.text(`$${this.a}$`);

		this.label_AC_container
			.attr("x", this.point_d_coords.x + (this.c - this.x) / 2 + 20)
			.attr("y", this.diagram.center.y - 10);
		this.label_AC.text(`$${this.b}$`);
	}

	update_text() {
		this.text.text(
			`ACB right triangle with sides $AC=${this.b}$ and $BC=${this.a}$ is given. $D$ is taken on $AB$ in such a way that $CD=h$ is the height of the triangle. Find $h$.`
		);
		this.answer.text(`$h = ${Math.round(this.h * 100) / 100}$`);
		this.explanation.node().innerHTML = "";
		this.explanation.append("p").text(`Using the Pythagorean theorem, $AB = √{AC^2+BC^2} = ${Math.round(this.c*100)/100}$.`);
		this.explanation.append("p").text(`For simplicity, let's denote $BC=a,AC=b,AB=c,BD=x$, which gives $$a^2 - x^2 = b^2 - (c-x)^2 = b^2 - c^2 + 2cx - x^2.$$`);
		this.explanation.append("p").text(`Fortunately, $x^2$ cancel from both sides and this can be solved for x very easily: $$x = {a^2 - b^2 + c^2}/{2c} = ${Math.round(this.x*100)/100}.$$`);
		this.explanation.append("p").text(`Finally, $$h = √{a^2 - x^2} = ${Math.round(this.h*100)/100}.$$`);
		jqMath.parseMath(document.body);
	}
}
