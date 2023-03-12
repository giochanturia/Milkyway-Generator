// This import must be done by all the sets:
import * as base from "./base.js";

export class PythagoreanTheorem extends base.Problem {
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
		this.b = base.getRandomInt(100, 50);
		this.c = Math.sqrt(this.a * this.a + this.b * this.b);
	}

	draw_diagram() {
		this.line_a = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "red")
			.attr("x1", this.diagram.center.x - this.a / 2)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.a / 2 + this.a)
			.attr("y2", this.diagram.center.y);

		this.line_b = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "blue")
			.attr("x1", this.diagram.center.x - this.a / 2)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.a / 2)
			.attr("y2", this.diagram.center.y - this.b);

		this.line_c = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "orange")
			.attr("x1", this.diagram.center.x - this.a / 2 + this.a)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.a / 2)
			.attr("y2", this.diagram.center.y - this.b);

		this.label_a_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.diagram.center.x - 50)
			.attr("y", this.diagram.center.y)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:center;");

		this.label_a = this.label_a_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$a=" + this.a + "$");

		this.label_b_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.diagram.center.x - 110 - this.a / 2)
			.attr("y", this.diagram.center.y - this.b / 2)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:right;");

		this.label_b = this.label_b_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$b=" + this.b + "$");

		this.label_c_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.diagram.center.x + 20 - 50)
			.attr("y", this.diagram.center.y - this.b / 2 - 30)
			.attr("width", 100)
			.attr("height", 20)
			.attr("style", "text-align:center;");

		this.label_c = this.label_c_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$c=?$");
	}

	update_diagram() {
		this.line_a
			.attr("x1", this.diagram.center.x - this.a / 2)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.a / 2 + this.a)
			.attr("y2", this.diagram.center.y);

		this.line_b
			.attr("x1", this.diagram.center.x - this.a / 2)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.a / 2)
			.attr("y2", this.diagram.center.y - this.b);

		this.line_c
			.attr("x1", this.diagram.center.x - this.a / 2 + this.a)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.a / 2)
			.attr("y2", this.diagram.center.y - this.b);

		this.label_a_container
			.attr("x", this.diagram.center.x - 50)
			.attr("y", this.diagram.center.y);

		this.label_b_container
			.attr("x", this.diagram.center.x - 110 - this.a / 2)
			.attr("y", this.diagram.center.y - this.b / 2);

		this.label_c_container
			.attr("x", this.diagram.center.x + 20 - 50)
			.attr("y", this.diagram.center.y - this.b / 2 - 30);

		this.label_a.text("$a=" + this.a + "$");
		this.label_b.text("$b=" + this.b + "$");
		// this.label_c.text("$c=?$");
	}

	update_text() {
		this.text.text(
			`მართკუთხა სამკუთხედის კათეტებია $a=${this.a}$ და $b=${this.b}$. გამოთვალეთ ჰიპოტენუზა $c$.`
		);
		this.answer.text(`$c=${Math.round(this.c * 100) / 100}$`);
		this.explanation.text(
			"თუ მართკუთხა სამკუთხედის კათეტებია $a$ და $b$, პითაგორას თეორემით, ჰიპოტენუზა იქნება $c=√{a^2+b^2}$."
		);
		jqMath.parseMath(document.body);
	}
}
