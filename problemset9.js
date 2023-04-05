import * as base from "./base.js";
export class Ratios extends base.Problem {
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

		this.diagram.svg_object.attr("style", "display:none;");
	}
	randomize_and_calculate() {
		this.a = base.getRandomInt(40, 1);
		this.b = base.getRandomInt(10, 1);
		this.c = base.getRandomInt(11, 1);
		this.d = base.getRandomInt(30, 1);
		this.e = base.getRandomInt(13, 1);
		this.f = base.getRandomInt(15, 1);
		this.p =
			(this.a * this.b) / (this.b + this.c) +
			(this.d * this.e) / (this.e + this.f);
	}

	update_text() {
		this.question.text(
			` $${this.a}$ კგ ოქროსა და სპილენძის შენადნობი შეფარდებით $${this.b}$ : $${this.c}$ შეურიეს $${this.d}$კგ ოქროსა და სპილენძის შენადნობს შეფარდებით $${this.e}$ : $${this.f}$ . რა იქნება ახალ შენადნობში ოქროს მასა?`
		);
		this.answer.text(`$${base.roundTo(this.p, 2)}$ კგ`);
	}
}

export class Arithmeticprogression extends base.Problem {
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

		this.diagram.svg_object.attr("style", "display:none;");
	}

	randomize_and_calculate() {
		this.a = base.getRandomInt(100, 40);
		this.b = base.getRandomInt(10, 1);
		this.c = base.getRandomInt(20, 1);
		this.d = base.getRandomInt(100, 60);
		this.e = base.getRandomInt(40, 10);
		this.f = base.getRandomInt(95, 40);
		this.p = (this.f - this.e) * (this.b * (1.5 - this.c) + this.d);
	}

	update_text() {
		this.question.text(
			` არითმეტიკულ პროგრესიაში $${this.a}$ წევრია. ყოველი მომდევნო წევრი $${this.b}$ -ით მეტია წინაზე. წევრი ნომერი $${this.c}$  $${this.d}$ - ის ტოლია. რას უდრის წევრების ჯამი ნომერ $${this.e}$ წევრიდან ნომერ $${this.f}$ წევრის ჩათვლით? `
		);

		this.answer.text(`$${this.p}$`);
		this.explanation.text(``);
	}
}
