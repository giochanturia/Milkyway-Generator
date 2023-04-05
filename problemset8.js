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

export class Percentage extends base.Problem {
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
		this.a = base.getRandomInt(15, 1);
		this.b = base.getRandomInt(70, 10);
		this.p = (2 * this.a) / (1 + 0.01 * this.b);
	}

	update_text() {
		this.question.text(
			` მატარებელი $A$ და $B$ ქალაქებს შორის მანძილის ნახევარს $${this.a}$ საათში გადის. რა დრო დასჭირდება მატარებელს $A$ ქალაქიდან $B$-მდე მისასვლელად, თუ მისი სიჩქარე გაიზრდება $${this.b}$ %-ით?`
		);
		this.answer.text(`$${base.roundTo(this.p, 2)}$ სთ`);
		this.explanation.text("");
	}
}
export class Quadraticequationsolving extends base.Problem {
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
		this.a = base.getRandomInt(15, 1);
		this.b = base.getRandomInt(70, 10);
		this.p =
			(2 * this.b -
				this.a +
				Math.sqrt(Math.pow(this.a - 2 * this.b, 2) + 4 * this.a * this.b)) /
			2;
	}

	update_text() {
		this.question.text(
			` ერთი მილით აუზის ავსებას სჭირდება $${this.a}$ საათით მეტი დრო, ვიდრე მეორე მილით. რა დროში აავსებს მეორე მილი აუზს, თუ ორივე ერთად აუზს $${this.b}$ საათში ავსებს?
					`
		);
		this.answer.text(`$${base.roundTo(this.p, 2)}$ სთ`);
		this.explanation.text("TBD");
	}
}
