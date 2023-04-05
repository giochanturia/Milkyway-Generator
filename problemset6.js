import * as base from "./base.js";
export class Probability extends base.Problem {
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
		this.a = base.getRandomInt(20, 6);
		this.b = base.getRandomInt(25, 4);
		this.c = base.getRandomInt(30, 8);
		this.strarray = ["წითელი", "ყვითელი", "ლურჯი"];
		this.e = base.getRandomChoice(this.strarray);
		if (this.e == "წითელი") {
			this.d = base.getRandomInt(this.b + this.c, 1);
			this.p =
				1 -
				(base.factorial(this.b + this.c) *
					base.factorial(this.a + this.b + this.c - this.d)) /
					(base.factorial(this.a + this.b + this.c) *
						base.factorial(this.b + this.c - this.d));
		}
		if (this.e == "ყვითელი") {
			this.d = base.getRandomInt(this.a + this.c, 1);
			this.p =
				1 -
				(base.factorial(this.a + this.c) *
					base.factorial(this.a + this.b + this.c - this.d)) /
					(base.factorial(this.a + this.b + this.c) *
						base.factorial(this.a + this.c - this.d));
		}
		if (this.e == "ლურჯი") {
			this.d = base.getRandomInt(this.a + this.b, 1);
			this.p =
				1 -
				(base.factorial(this.b + this.a) *
					base.factorial(this.a + this.b + this.c - this.d)) /
					(base.factorial(this.a + this.b + this.c) *
						base.factorial(this.b + this.a - this.d));
		}
	}
	update_text() {
		this.question.text(
			`ყუთში მოთავსებულია $${this.a}$ წითელი, $${this.b}$ ყვითელი და  $${this.c}$ ლურჯი ბურთი. 
			შემთხვევითობის პრინციპით ამოიღეს $${this.d}$ ბურთი. რა არის იმის ალბათობა, 
			რომ ამოღებული ბურთებიდან ერთი მაინც იქნება $${this.e}$ ?`
		);
		this.answer.text(`ალბათობაა $${base.roundTo(this.p, 2)}$.`);
		this.explanation
			.text(`პასუხის საპოვნელად განვიხილოთ ის შემთხვევა, რომელშიც არც ერთი ამოღებული ბურთი სასურველი ფერის არაა
			და ერთს გამოვაკლოთ ამ შედეგის მიღების ალბათობა.`);

		jqMath.parseMath(document.body);
	}
}
