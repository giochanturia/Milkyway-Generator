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
		this.x1 = base.getRandomInt(40, -40);
		this.y1 = base.getRandomInt(40, -40);

        this.x2 = base.getRandomInt(40, -40);
		this.y2 = base.getRandomInt(40, -40);

		this.distance = Math.sqrt(Math.pow((this.y2-this.y1),2) + Math.pow( (this.x2-this.x1),2));


	}

    draw_diagram() {
        this.x_axis = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "black")
			.attr("x1", this.diagram.width)
			.attr("y1", this.diagram.center.y)
			.attr("x2", this.diagram.center.x - this.diagram.width)
			.attr("y2", this.diagram.center.y);

		this.y_axis = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "black")
			.attr("x1", this.diagram.center.x )
			.attr("y1", this.diagram.height)
			.attr("x2", this.diagram.center.x )
			.attr("y2", this.diagram.center.y - this.diagram.height);
            
            var Xmultiplier = 5;
            var Ymultiplier = 4;
            this.distance_line = this.diagram.svg_object
			.append("line")
			.attr("class", "thick-line")
			.attr("stroke", "orange")
			.attr("x1", this.diagram.center.x + this.x1*Xmultiplier )
			.attr("y1", this.diagram.center.y - this.y1*Ymultiplier)
			.attr("x2", this.diagram.center.x + this.x2*Xmultiplier)
			.attr("y2", this.diagram.center.y - this.y2*Ymultiplier);


        var x1add = 0;
        var x2add = 0;
        var y1add = 0;
        var y2add = 0;
        if(this.x1>this.x2){
            var x1add = 50
            var x2add = -50
        }else{
            var x1add = -50
            var x2add = 50
        }

        if(this.y1>this.y2){
            var y1add = -10
            var y2add = 10
        }else{
            var y1add = 10
            var y2add = -10
        }
        this.label_p1_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.diagram.center.x + this.x1*Xmultiplier-30)
			.attr("y", this.diagram.center.y - this.y1*Ymultiplier )
			.attr("width", 200)
			.attr("height", 20)
			.attr("style", "text-align:center;");

		this.label_p1 = this.label_p1_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$p1= (" + this.x1 +", "+this.y1+")$");

		this.label_p2_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("x", this.diagram.center.x + this.x2 *Xmultiplier-30)
			.attr("y", this.diagram.center.y - this.y2 *Ymultiplier)
			.attr("width", 200)
			.attr("height", 20)
			.attr("style", "text-align:center;");

		this.label_p2 = this.label_p2_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text("$p2=(" + this.x2 +", "+this.y2+")$");

            

    }
    update_diagram(){
       
        var Xmultiplier = 5;
        var Ymultiplier = 4;
        this.distance_line
        
        .attr("x1", this.diagram.center.x + this.x1*Xmultiplier )
        .attr("y1", this.diagram.center.y - this.y1*Ymultiplier)
        .attr("x2", this.diagram.center.x + this.x2*Xmultiplier)
        .attr("y2", this.diagram.center.y - this.y2*Ymultiplier);

    }

    update_text() {
		this.text.text(
			`Find the distance between the two points $p1=(${this.x1}, ${this.y1})$ and $p2=(${this.x2}, ${this.y2})$. Calculate the distance $d$.`
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