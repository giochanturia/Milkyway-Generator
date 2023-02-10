// This import must be done by all the sets:
import * as base from "./base.js";

export class DistanceBetweenTwoPoints extends base.Problem{
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

		this.randomize_and_calculate();
		this.draw_diagram();
		this.update_text();
	}
    randomize_and_calculate() {
		this.x1 = base.getRandomInt(50, 0);
		this.y1 = base.getRandomInt(50, 0);

        this.x2 = base.getRandomInt(50, 0);
		this.y2 = base.getRandomInt(50, 0);

		this.distance = Math.sqrt(Math.pow((this.y2-this.y1),2) + Math.pow( (this.x2-this.x1),2));


	}

    draw_diagram() {
        return
    }
    update_diagram(){
        return;
    }

    update_text() {
		this.text.text(
			`Find the distance between the two points $p1=${(this.x1, this.y1)}$ and $p2=${(this.x2, this.y2)}$. Calculate the distance $d$.`
		);
		this.answer.text(`$d=${Math.round(this.distance * 100) / 100}$`);
		this.explanation.text(
			"To calculate the distance between two points on a plain you should apply the following formula $d=√{(y2-y1)+(x2-x1)}$"
		);
		jqMath.parseMath(document.body);
	}

	new_numbers() {
		this.randomize_and_calculate();
		this.update_diagram();
		this.update_text();
	}


}