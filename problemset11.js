import * as base from "./base.js";

export class PolynomialFactorization extends base.Problem {
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
		this.a = base.getRandomInt(10, -10);
		while (this.a == 0) {
			this.a = base.getRandomInt(10, -10);
		}
		this.m = base.getRandomInt(10, -10);
		if (base.getRandomInt(10, 0) > 7) this.n = this.m;
		else this.n = base.getRandomInt(10, -10);

		this.b = -this.a * (this.m + this.n);
		this.c = this.a * this.m * this.n;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	find_root(a, b, c) {
		this.D = b * b - 4 * a * c;
		if (this.D == 0) return "ერთი ფესვი: $x=$" + -b / (2 * a);
		if (this.D < 0) return "error!";
		else
			return `ორი ფესვი: $x =
				${this.roundToDecimal((-b + Math.sqrt(this.D)) / (2 * a), 2)}$ და $x=
				${this.roundToDecimal((-b - Math.sqrt(this.D)) / (2 * a), 2)}$`;
	}

	update_text() {
		this.question.text(
			`მოცემულია კვადრატული ფუნქცია: $f(x)=${this.a}x^2 ${this.write_number(
				this.b
			)}x ${this.write_number(
				this.c
			)}$. ჩაწერეთ გამოსახულება მამრავლების სახით. რამდენი ფესვი აქვს ამ ფუნქციას?`
		);
		this.answer.text(
			`მამრავლებად დაშლილ ფუნქციას ექნება შემდეგი სახე: $f(x)=${
				this.a
			}(x ${this.write_number(-this.m)})(x ${this.write_number(
				-this.n
			)})$. ფუნქციას აქვს ${this.find_root(this.a, this.b, this.c)}.`
		);
		this.explanation.text(
			`რიგ შემთხვევებში, მამრავლებად დაშლა პირდაპირ შეიძლება (განსაკუთრებით მაშინ, როცა ერთი ფესვი აქვს განტოლებას).`
		);
		this.explanation.append("p")
			.text(`ზოგადად, კვადრატული განტოლების ფესვები გამოითვლება ფორმულით \n
    $$x={-b± √{b^2-4ac}}/{2a}={-${this.make_bracket(
			this.b
		)}± √{${this.make_bracket(this.b)}^2-4・${this.make_bracket(
			this.a
		)}・${this.make_bracket(this.c)}}}/{2・${this.make_bracket(
			this.a
		)}}.$$ დისკრიმინანტი $D=b^2-4ac$ განსაზღვრავს ფესვების რაოდენობას.
    თუ $D>0$, ორი ფესვი გვაქვს, ხოლო თუ $D=0$, - მხოლოდ ერთი. იმ შემთხვევაში, როცა $D<0$, კვადრატულ განტოლებას ნამდვილი ფესვები არ გააჩნია.`);
		this.explanation
			.append("p")
			.text(
				`ჩვენი შემთხვევისთვის, გვექნება ${this.find_root(
					this.a,
					this.b,
					this.c
				)}.`
			);
		jqMath.parseMath(document.body);
	}
}

export class GeometricProgression extends base.Problem {
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
		this.a = base.getRandomInt(10, -10);
		this.n = base.getRandomInt(10, 1);
		this.m = base.getRandomInt(this.n - 1, -this.n + 1);
    if(this.a == 0 || this.n ==0 || this.m == 0) this.randomize_and_calculate();
	}

	geom_series(a, m, n, more = false) {
		if (Math.abs(m / n) >= 1) return "უსასრულოა";
		if (more == true)
			return (
				`იქნება $$ {${a}}/{1-{${m}}/{${n}}}=${this.roundToDecimal(a / (1 - m / n), 2)}.$$`
			);
		else
			return `იქნება ` + `$${this.roundToDecimal(a / (1 - m / n), 2)}$`;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question.text(`გამოთვალეთ შემდეგი გეომეტრიული პროგრესიის ჯამი: $$${
			this.a
		} ${this.write_number(this.a)}({${this.m}}/{${this.n}}) ${this.write_number(
			this.a
		)}({${this.m}}/{${this.n}})^2+…$$
    `);
    
		this.answer.text(`პროგრესიის ჯამი ${this.geom_series(this.a, this.m, this.n)}.`);
		this.explanation
			.text(`გეომეტრიული პროგრესიას ზოგადად აქვს შემდეგი ფორმა: $$b+bq+bq^2+…$$ პროგრესია განშლადია (ჯამი უსასრულოა), თუ $ |q|>=1$.`);
    this.explanation.append("p").text(`თუ $|q|<1$, მაშინ ჯამი გამოითვლება ფორმულით: $$ {b}/{1-q} .$$`);
		this.explanation
			.append("p")
			.text(
				`ჩვენს შემთხვევაში, პროგრესიის ჯამი ${this.geom_series(
					this.a,
					this.m,
					this.n,
					true
				)}`
			);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class Lines3D extends base.Problem {
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
		this.p0 = this.make_vector();
		this.u0 = this.make_vector();
		while (this.calculate_norm(this.u0) == 0) {
			this.u0 = this.make_vector();
		}

		this.dice = base.getRandomInt(10, 0);
		this.factor1 = 0;
		while (this.factor1 == 0) {
			this.factor1 = base.getRandomInt(10, -10);
		}
		this.factor2 = 0;
		while (this.factor2 == 0) {
			this.factor2 = base.getRandomInt(10, -10);
		}
		//this.offset=this.make_vector();

		if (this.dice > 5) {
			/* make random vectors for second function */
			this.p1 = this.make_vector();
			this.u1 = this.make_vector();
			this.sameconstr = false; /* to note if the two functions were purposefully constructed to be the same */
		} else {
			/* make same line, no random vectors */
			this.p1 = [];
			this.u1 = [];
			this.sum = 0;
			this.sameconstr = true;
			for (let i = 0; i < 3; i++) {
				this.p1[i] = this.p0[i] + this.factor2 * this.u0[i];
				this.u1[i] = this.factor1 * this.u0[i];
			}
			// console.log(`factor2: ${this.factor2};  ${this.p1[0]}; ${this.p1[1]}; ${this.p1[2]}`);
		}
		// else { /* make same line, no random vectors */
		//   this.p1=[]; this.u1=[]; this.sum=0; this.sameconstr = true;
		//   for (let i = 0; i < 3; i++){
		//     this.sum = this.p0[i] + this.offset[i]; this.u1[i]=this.factor1*this.u0[i]; this.p1.push(this.sum);
		//   };
		// }
		/*console.log(`${this.sameconstr}`);*/
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	make_vector() {
		const vector = [
			base.getRandomInt(50, -50),
			base.getRandomInt(50, -50),
			base.getRandomInt(50, -50),
		];
		return vector;
	}

	calculate_norm(vector) {
		return Math.sqrt(
			Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
		);
	}

	normalize_vector(vector) {
		this.normalized = [];
		this.norm = this.calculate_norm(vector);
		for (let i = 0; i < 3; i++) {
			this.normalized.push(vector[i] / this.norm);
			/*this.sum = this.p0[i] + this.offset[i]; this.u1[i]=this.factor1*this.u0[i]; this.p1.push(this.sum);*/
		}
		/*console.log(`${this.norm}`);*/
		return this.normalized;
	}

	// check_parallel(v1, v2) {
	//   this.f1=v2[0]/v1[0];
	//   this.f2=v2[1]/v1[1];
	//   this.f3=v2[2]/v1[2];
	//   if (this.f1==this.f2) {
	//     if (this.f2==this.f3) return true;
	//     else return false;
	//   }
	//   else return false;
	// }

	// check_parallel(v1, v2) {
	//   this.ratio=[0,0,0];
	//   this.i = 0;
	//   while (this.i < 3) {
	//     if (v1[this.i]== 0) {this.ratio[this.i]=true;}
	//     else {this.ratio[this.i]=v2[this.i]/v1[this.i];};
	//     this.i++;
	//   }
	//   this.i = 0;
	//   while (this.i < 3){
	//     if (this.ratio[this.i]== true || this.ratio[(this.i+1)%3] == true) {continue;}
	//     if (this.ratio[this.i] != this.ratio[(this.i+1)%3]) {return false;};
	//     this.i++;
	//   }
	//   return true;
	// }

	check_parallel(v1, v2) {
		this.cosangle =
			(v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) /
			(this.calculate_norm(v1) * this.calculate_norm(v2));
		if (1 - Math.abs(this.cosangle) < 0.0001) return true;
		else return false;
	}

	check_p1(p0, p1, u0) {
		this.connect = [];
		this.i = 0;
		while (this.i < 3) {
			this.connect[this.i] = p1[this.i] - p0[this.i];
			this.i++;
		}
		if (this.check_parallel(this.connect, u0) == true) return true;
		else return false;
	}

	write_answer(p0, p1, u0, u1) {
		if (this.check_parallel(u0, u1) == true) {
			if (this.check_p1(p0, p1, u0) == true) {
				return "Yes, $f$ and $g$ describe the same line.";
			} else {
			}
		} else {
			return "No, $f$ and $g$ describe different lines.";
		}
	}

	update_text() {
		this.question
			.text(`Given the two lines $f$ and $g$ in three-dimensional space described by
      $$\\table f:x↖{→}=(\\table ${this.p0[0]}; ${this.p0[1]}; ${this.p0[2]})+t・ (\\table ${this.u0[0]}; ${this.u0[1]}; ${this.u0[2]})
      { },\\text"  and  ",g:x↖{→}=(\\table ${this.p1[0]}; ${this.p1[1]}; ${this.p1[2]})+t・ (\\table ${this.u1[0]}; ${this.u1[1]}; ${this.u1[2]}),$$
      respectively. Do they both describe the same line?`);

		this.answer.text(
			`${this.write_answer(this.p0, this.p1, this.u0, this.u1)}`
		);
		this.explanation.text(
			`To test if the two directional vectors scaling with $t$ are (anti-)parallel, the $\\cos$ blablabla`
		);
		this.explanation.append("p").text(`$(a)$:`);
		// this.explanation.text(`As we can see above, a vector function in three-dimensional space consists of a constant "supporting" and a directional vector, which is scaled with a parameter $t$.
		// We shall refer to these as $p↖{→}$ and $u↖{→}$ in the following.`)
		// this.explanation.append("p").text(`To determine, whether two vector functions describe the same line, we need to check,
		//   if $(a)$ the directional vectors of both functions are (anti-)parallel and $(b)$ if the supporting vector of the second function lies on the line described
		//   by the first function or vice versa. Only if these conditions are met, the two functions are essentially the same. There are several ways to do this.`)
		// this.explanation.append("p").text(`$(a)$: The two directional vectors are (anti-)parallel, if their angle is either $0°$ or $180°$.
		// Recall that the angle $θ$ between two vectors $v↖{→}$ and $w↖{→}$ fulfils the relation $$\\cos θ = {v↖{→}⋅w↖{→}}/{|v↖{→}| |w↖{→}|}.$$ Since $|\\cos 0°| = |\\cos 180°| = 1$,
		// the two directional vectors $u↖{→}_1$ and $u↖{→}_2$ are (anti-)parallel, if $$ |{u↖{→}_1⋅u↖{→}_2}/{|u↖{→}_1| |u↖{→}_2|}| = 1.$$
		// Alternatively, we can try to find a common proportionality factor $R$, fulfilling
		// $$u↖{→}_2= R ⋅ u↖{→}_1.$$ $R$ may take positive or negative values, but cannot be $0$.`)
		// this.explanation.append("p").text(`$(b)$: To check, if the supporting vector of the second function lies on the line described by the first,
		// we can first calculate the vector $p↖{→}_{12}$ connecting the two supporting vectors, defined as $$p↖{→}_{12} = p↖{→}_2 - p↖{→}_1.$$
		// If $p↖{→}_2$ indeed lies on $f$, then $p↖{→}_{12}$ should be (anti-)parallel to the directional vector of $f$ $u↖{→}_1$. This we can test by applying
		// the formula from $(a)$. Alternatively, one can try to find, if a $t$ exists that solves $$p↖{→}_2= p↖{→}_1+t ⋅ u↖{→}_1.$$`)
		// this.explanation.append("p").text(`Testing these conditions, we find that
		//   $$ {u↖{→}_1⋅u↖{→}_2}/{|u↖{→}_1| |u↖{→}_2|} = {(\\table ${this.u0[0]}; ${this.u0[1]}; ${this.u0[2]}) ⋅ (\\table ${this.u1[0]}; ${this.u1[1]}; ${this.u1[2]})}/{|(\\table ${this.u0[0]}; ${this.u0[1]}; ${this.u0[2]})| ⋅ |(\\table ${this.u1[0]}; ${this.u1[1]}; ${this.u1[2]})|}
		//   = {${(this.u0[0]*this.u1[0])+(this.u0[1]*this.u1[1])+(this.u0[2]*this.u1[2])}}/{${this.roundToDecimal(this.calculate_norm(this.u0),3)} ⋅ ${this.roundToDecimal(this.calculate_norm(this.u1),3)}}= ${this.roundToDecimal(((this.u0[0]*this.u1[0])+(this.u0[1]*this.u1[1])+(this.u0[2]*this.u1[2]))/(this.calculate_norm(this.u0)*this.calculate_norm(this.u1)),3)}.$$
		//   Moreover, `)
		// = {${(this.u0[0]*this.u1[0])+(this.u0[1]*this.u1[1])+(this.u0[2]*this.u1[2])}}/{${this.roundToDecimal(this.calculate_norm(this.u0),3)} ⋅ ${this.roundToDecimal(this.calculate_norm(this.u1),3)}}
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		// this.answer.text(`factor1: ${this.factor1}; the same: ${this.sameconstr}; do get same number?: ${this.calculate_norm(this.u0)==this.calculate_norm(this.u1)/this.factor1}`)
		// this.explanation.text(`factor1: ${this.factor1}; the same?: ${this.sameconstr}; parallel?: ${this.check_parallel(this.u0, this.u1)}`)
		// if (this.sameconstr != this.check_parallel(this.u0, this.u1)) console.log(`nope; ${this.sameconstr}; ${this.check_parallel(this.u0, this.u1)} u0: (${this.u0[0]},${this.u0[1]},${this.u0[2]})  u1: (${this.u1[0]},${this.u1[1]},${this.u1[2]}) factor1: ${this.factor1}`);
		// this.explanation.append("p").text(``)
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
	/*number = 0;
  while (number < 100) {this.randomize_and_calculate();}*/
}

export class SimilarTriangles1 extends base.Problem {
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
		this.a1 = base.getRandomInt(50, 1);
		this.b1 = base.getRandomInt(50, 1);
		this.c1 = base.getRandomInt(50, 1);
		this.factor = base.getRandomInt(300, 10) / 100;
		this.a2 = this.roundToDecimal(this.a1 * this.factor, 2);
		this.b2 = this.roundToDecimal(this.b1 * this.factor, 2);
		this.c2 = this.roundToDecimal(this.c1 * this.factor, 2);
	}

	geom_series(a, m, n, more = false) {
		if (Math.abs(m / n) >= 1) return "diverges";
		if (more == true)
			return (
				`converges to $ {${a}}/{1-{${m}}/{${n}}}=$` +
				`$${this.roundToDecimal(a / (1 - m / n), 2)}$`
			);
		else
			return `converges to ` + `$${this.roundToDecimal(a / (1 - m / n), 2)}$`;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question
			.text(`Given triangle $A$ with the side lengths $a_1=${this.a1}$, $b_1=${this.b1}$ and $c_1=${this.c1}$, what are the sidelengths of the similar triangle $B$,
      if $a_2=${this.a2}$?`);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(
			`With $a_2=${this.a2}$ we obtain $b_2=${this.b2}$ and $c_2=${this.c2}$.`
		);
		this.explanation
			.text(`Since the triangles $A$ and $B$ are similar, we know that their respective sidelengths are related by a constant factor $f$.
      This factor we can obtain via $f= {a_2}/{a_1}={${this.a2}}/{${this.a1}}=${this.factor}$.`);
		this.explanation.append("p")
			.text(`The two missing sidelenghts of triangle $B$ can then be obtained by multiplication with $f$, giving
      $b_2=f・b_1=${this.b2}$ and $c_2=f・c_1=${this.c2}$.`);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class SimilarTriangles2 extends base.Problem {
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
		this.factor = base.getRandomInt(300, 10) / 100;
		//
		this.a = base.getRandomInt(50, 1);
		this.alpha = base.getRandomInt(80, 1);
		this.alpharad = (this.alpha * Math.PI) / 180; // to get angle in radian
		//
		this.b = this.roundToDecimal(this.a * this.factor, 2);
		this.h2 = this.roundToDecimal(this.b * Math.sin(this.alpharad), 2);
	}

	geom_series(a, m, n, more = false) {
		if (Math.abs(m / n) >= 1) return "diverges";
		if (more == true)
			return (
				`converges to $ {${a}}/{1-{${m}}/{${n}}}=$` +
				`$${this.roundToDecimal(a / (1 - m / n), 2)}$`
			);
		else
			return `converges to ` + `$${this.roundToDecimal(a / (1 - m / n), 2)}$`;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question.text(
			`Given the two similar, rectangular triangles $A$ and $B$, what is the height $h_2$ of $B$ marked in the sketch below?`
		);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(`$h_2=${this.h2}$`);
		this.explanation
			.text(`Since the triangles $A$ and $B$ are similar, we know that the angles $α$ and $β$ are the same. The height $h_2$ can be obtained using a
      trigonometric relation, $h_2=b·\\sin β=${this.h2}$.`);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class OrthogonalLines extends base.Problem {
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

	make_vector() {
		const vector = [
			base.getRandomInt(10, -10),
			base.getRandomInt(10, -10),
			base.getRandomInt(10, -10),
		];
		return vector;
	}

	randomize_and_calculate() {
		this.u = this.make_vector();
		this.v1 = base.getRandomInt(10, -10);
		this.v2 = base.getRandomInt(10, -10);
		if (this.u[2] == 0) {
			this.v3 = true;
		} else {
			this.v3 = -this.roundToDecimal(
				(this.u[0] * this.v1 + this.u[1] * this.v2) / this.u[2],
				2
			);
		}
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	writeAnswer() {
		if (this.v3 == true) {
      if(this.u[0]*this.v1 + this.u[1]*this.v2 == 0) {
        return `$u↖{→}$ და $v↖{→}$ ორთოგონალურია $x$-ის ნებისმიერი მნიშვნელობისთვის.`;
      }
			else {
        return `$u↖{→}$ და $v↖{→}$ ვერ იქნება ორთოგონალური $x$-ის ვერც ერთი მნიშვნელობისთვის.`;
      }
    }
		else return `$x=${this.v3}$.`;
	}

	writeExplanation() {
		if (this.v3 == true)
			return `თუმცა, რაკი $u↖{→}$ ვექტორის მესამე კომპონენტი $u_3= ${this.u[2]}$, რაც არ უნდა იყოს $x$ გავლენას ვერ იქონიებს $u↖{→}$
    და $v↖{→}$ ვექტორების ორთოგონალურობაზე.`;
		else
			return `ჩვენ შემთხვევაში, $v_3=x$, რომელიც შეგვიძლია, გამოვსახოთ: $$ x=-{u_1 v_1+u_2 v_2}/{u_3}=${this.v3}.$$`;
	}

	update_text() {
		this.question
			.text(`იპოვეთ $x$-ის ისეთი მნიშვნელობა, რომლისთვისაც ქვემოთ მოცემული $u↖{→}$ და $v↖{→}$, ვექტორები ერთმანეთის მართობულია:
      $$\\table u↖{→}=(\\table ${this.u[0]}; ${this.u[1]}; ${this.u[2]}), \\text",", v↖{→}=(\\table ${this.v1}; ${this.v2}; x).$$`);
		this.answer.text(`${this.writeAnswer()}`);
		this.explanation.text(
			`ვექტორები $u↖{→}$ და $v↖{→}$ არიან ორთოგონალური, თუ მათი სკალარული ნამრავლი ნულია, ანუ თუ $u_1 v_1+u_2 v_2+u_3 v_3=0$.`);
    this.explanation.append("p").text(
      `${this.writeExplanation()}`
		);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class NormalizeVector extends base.Problem {
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

	make_vector() {
		const vector = [
			base.getRandomInt(10, -10),
			base.getRandomInt(10, -10),
			base.getRandomInt(10, -10),
		];
		return vector;
	}

	randomize_and_calculate() {
		this.x = this.make_vector();
		this.normx = this.calculate_norm(this.x);
		while (this.normx == 0) {
			this.x = this.make_vector();
			this.normx = this.calculate_norm(this.x);
		}
		this.normedx = this.normalize_vector(this.x);
	}

	calculate_norm(vector) {
		return Math.sqrt(
			Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
		);
	}

	normalize_vector(vector) {
		this.normalized = [];
		this.norm = this.calculate_norm(vector);
		for (let i = 0; i < 3; i++) {
			this.normalized.push(this.roundToDecimal(vector[i] / this.norm, 2));
		}
		return this.normalized;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question.text(`გამოთვალეთ ვექტორის $x↖{→}$ სიგრძე და ააგეთ ერთეულოვანი ვექტორი ამ მიმართულებით:
      $$\\table x↖{→}=(\\table ${this.x[0]}; ${this.x[1]}; ${this.x[2]})$$`);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(
			`ვექტორის სიგრძეა $${this.roundToDecimal(
        this.normx,
        2
      )}$, ხოლო $x↖{→}$-ის მიმართულებით ერთეულოვანი ვექტორია $$\\table x↖{→}_0=(\\table ${this.normedx[0]}; ${this.normedx[1]}; ${this.normedx[2]}).$$`
		);
		this.explanation
			.text(`$x↖{→}$ ვექტორის სიგრძე გამოითვლება ფორმულით: $|x↖{→}|=√{x_1^2+x_2^2+x_3^2}=${this.roundToDecimal(
			this.normx,
			2
		)}$.
     ერთეულოვანი ვექტორის მისაღებად, $x↖{→}$ უნდა გავყოთ მის სიგრძეზე: $$x↖{→}_0={x↖{→}}/{|x↖{→}|}=(\\table ${
				this.normedx[0]
			}; ${this.normedx[1]}; ${this.normedx[2]})$$`);
		jqMath.parseMath(document.body);
	}
}

export class HalfSphereArea extends base.Problem {
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
		this.radius = base.getRandomInt(30, 1) / 10;
		this.area = this.roundToDecimal(
			2 * Math.PI * Math.pow(this.radius, 2) +
				Math.PI * Math.pow(this.radius, 2),
			2
		);
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question.text(
			`Give the surface area $A$ of a halved sphere with radius $r=${this.radius}$.`
		);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(`We find $A=${this.area}$.`);
		this.explanation
			.text(`Since we consider a halved sphere, its surface area is given by half of that of a whole sphere plus the area of a circle
      or radius $r$, yielding $A={1}/{2}·4πr^2+πr^2=3πr^2=${this.area}$.`);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class ScalarProduct extends base.Problem {
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
		this.u = this.make_vector();
		this.v = this.make_vector();
		this.scpr = this.scalar_product(this.u, this.v);
	}

	make_vector() {
		this.limit = 10;
		const vector = [
			base.getRandomInt(this.limit, -this.limit),
			base.getRandomInt(this.limit, -this.limit),
			base.getRandomInt(this.limit, -this.limit),
		];
		return vector;
	}

	calculate_norm(vector) {
		return Math.sqrt(
			Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
		);
	}

	normalize_vector(vector) {
		this.normalized = [];
		this.norm = this.calculate_norm(vector);
		for (let i = 0; i < 3; i++) {
			this.normalized.push(vector[i] / this.norm);
		}
		return this.normalized;
	}

	scalar_product(v1, v2) {
		return this.roundToDecimal(
			v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2],
			2
		);
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question.text(`გამოითვალეთ შემდეგი ვექტორების სკალარული ნამრავლი:
      $$\\table u↖{→}=(\\table ${this.u[0]}; ${this.u[1]}; ${this.u[2]})
      { },\\text",",v↖{→}=(\\table ${this.v[0]}; ${this.v[1]}; ${this.v[2]}).$$`);
		this.answer.text(`$u↖{→}·v↖{→}=${this.scpr}$.`);
		this.explanation
			.text(`განმარტების მიხედვით, $u↖{→}·v↖{→}=u_1 v_1+u_2 v_2+u_3 v_3=
      ${this.u[0]}·${this.make_bracket(this.v[0])}  ${this.write_number(
			this.u[1]
		)}·${this.make_bracket(this.v[1])}  ${this.write_number(
			this.u[2]
		)}·${this.make_bracket(this.v[2])}
      =${this.scpr}$.`);
		jqMath.parseMath(document.body);
	}
}

export class DistanceBetweenVectors extends base.Problem {
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
		this.u = this.make_vector();
		this.v = this.make_vector();
		this.uv = [
			this.u[0] - this.v[0],
			this.u[1] - this.v[1],
			this.u[2] - this.v[2],
		];
		this.distance = this.roundToDecimal(this.calculate_norm(this.uv), 2);
	}

	make_vector() {
		this.limit = 10;
		const vector = [
			base.getRandomInt(this.limit, -this.limit),
			base.getRandomInt(this.limit, -this.limit),
			base.getRandomInt(this.limit, -this.limit),
		];
		return vector;
	}

	calculate_norm(vector) {
		return Math.sqrt(
			Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
		);
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question
			.text(`გამოთვალეთ $d$ მანძილი ორ წერტილს შორის, რომლებიც მოცემულია ვექტორებით
      $$\\table u↖{→}=(\\table ${this.u[0]}; ${this.u[1]}; ${this.u[2]}),\\text"  და  ",v↖{→}=(\\table ${this.v[0]}; ${this.v[1]}; ${this.v[2]}).$$`);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(`$d=${this.distance}$.`);
		this.explanation
			.text(`პირველ რიგში, უნდა ავაგოთ $d↖{→}$ ვექტორი, რომელიც $u↖{→}$ და $v↖{→}$ ვექტორებს აერთებს ერთმანეთთან:
      $$d↖{→}=u↖{→}-v↖{→}=(\\table ${this.u[0]}; ${this.u[1]}; ${
			this.u[2]
		})-(\\table ${this.v[0]}; ${this.v[1]}; ${this.v[2]})=
      (\\table ${this.u[0] - this.v[0]}; ${this.u[1] - this.v[1]}; ${
			this.u[2] - this.v[2]
		}).$$
      მანძილი წერტილებს შორის იქნება $d↖{→}$ ვექტორის სიგრძე: $|d↖{→}|=${
				this.distance
			}$.`);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class CircleSector extends base.Problem {
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
		this.length = base.getRandomInt(20, 2);
		this.sector = base.getRandomInt(20, 1);
		//
		this.circumference = this.length + this.sector;
		this.ratio = this.roundToDecimal(this.sector / this.circumference, 2);
		//
		this.radius = this.roundToDecimal(this.circumference / (2 * Math.PI), 2);
		this.area = this.roundToDecimal(Math.PI * Math.pow(this.radius, 2), 2);
		this.sector_area = this.roundToDecimal(this.ratio * this.area, 2);
	}

	geom_series(a, m, n, more = false) {
		if (Math.abs(m / n) >= 1) return "diverges";
		if (more == true)
			return (
				`converges to $ {${a}}/{1-{${m}}/{${n}}}=$` +
				`$${this.roundToDecimal(a / (1 - m / n), 2)}$`
			);
		else
			return `converges to ` + `$${this.roundToDecimal(a / (1 - m / n), 2)}$`;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question
			.text(`${this.sector} Consider a circle with a sector cut out. The sector has length $s=${this.sector}$ and the residual circumference is $s_{\\text"res"}=${this.length}$.
      What is the area $A_s$ of the sector?`);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(`The area of the sector is $A_s=${this.sector_area}$.`);
		this.explanation
			.text(`We determine the entire circumference via $c=s_{\\text"res"}+s=${this.circumference}$. Then we can determine the radius
    of the circle by $r={c}/{2π}=${this.radius}$ and the entire area $A=πr^2=${this.area}$. The ratio of $A_s$ and $A$ must be equal to that of
    $s$ and $s_{\\text"res"}$, hence the area of the circular sector is $A_s={s}/{s_{\\text"res"}}·A=${this.sector_area}$.`);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class Thales extends base.Problem {
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
		this.radius = base.getRandomInt(20, 1);
		this.angle = base.getRandomInt(80, 1);
		//
		this.anglerad = this.roundToDecimal((this.angle * Math.PI) / 180, 2);
		this.kath = this.roundToDecimal(
			2 * this.radius * Math.cos(this.anglerad),
			2
		);
		this.height = this.roundToDecimal(this.kath * Math.sin(this.anglerad), 2);
		this.area_triangle = this.roundToDecimal(this.height * this.radius, 2);
		this.area_circle = this.roundToDecimal(
			(Math.PI * Math.pow(this.radius, 2)) / 2,
			2
		);
		this.area = this.roundToDecimal(
			(Math.PI * Math.pow(this.radius, 2)) / 2 - this.area_triangle,
			2
		);
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question
			.text(`Look at the following sketch of a triangle in a semicircle with radius $r=${this.radius}$. The hypothenuse of the triangle has length $2r$
      and the opposite corner of the triangle is located on the curved part of the semicircle. One of the inner angles of the triangle is $α =${this.angle}°$.
      Determine the area $A$ of the shaded area (semicircle without triangle).`);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(`The area is $A=${this.area}$.`);
		this.explanation
			.text(`Our first objective is to find the area of the triangle. According to Thales' theorem, a triangle constructed as here
    is rectangular. This knowledge we use to first determine the side length $k$ of the kathete that encloses $α$ with the hypothenuse. We find
    $k=2r\\cosα=${this.kath}$. Next, we want to determine the height $h$ of the triangle measured perpendicular to the hypothenuse. Using the same angle and kathete,
    we obtain $h=k\\sin α=${this.kath}$. Then, we can calculate the area of the triangle to be $A_Δ={1}/{2}·h·(2r)=h·r=${this.area_triangle}$.
    Lastly, we know that the area of a semicircle is given by $A_c={1}/{2}πr^2=${this.area_circle}$. Subtracting the triangle's area gives the wanted value of $A=A_c-A_Δ=${this.area}$.`);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}

export class TITLE extends base.Problem {
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

	randomize_and_calculate() {}

	geom_series(a, m, n, more = false) {
		if (Math.abs(m / n) >= 1) return "diverges";
		if (more == true)
			return (
				`converges to $ {${a}}/{1-{${m}}/{${n}}}=$` +
				`$${this.roundToDecimal(a / (1 - m / n), 2)}$`
			);
		else
			return `converges to ` + `$${this.roundToDecimal(a / (1 - m / n), 2)}$`;
	}

	write_number(num) {
		if (num >= 0) return "+" + num;
		/*if (num = 0) return "";*/
		if (num < 0) return "-" + Math.abs(num);
	}

	make_bracket(num) {
		if (num >= 0) return num;
		if (num < 0) return "(" + num + ")";
	}

	roundToDecimal(num, dec) {
		return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}

	update_text() {
		this.question.text(``);
		/*$∑↙{i=0}↖∞ ${this.make_bracket(this.a)}・({${this.m}}/{${this.n}})^i$.*/
		this.answer.text(``);
		this.explanation.text(``);
		/*this.explanation.append("p").text(``)*/
		jqMath.parseMath(document.body);
	}
}
