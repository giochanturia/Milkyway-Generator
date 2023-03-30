// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF FUNCTIONS:
// - - - - - - - - - - - - - - - - - - - - - - - - -

export function getRandomInt(max, min = 1) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

export function gcd(x, y) {
	if (typeof x !== "number" || typeof y !== "number") return false;
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		var t = y;
		y = x % y;
		x = t;
	}
	return x;
}

export function getRandomstr(strarray) {
	max = length(strarray);
	return strarray[Math.floor(Math.random() * max)];
}

export function distanceBetweenPoints(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function direction(p1, p2) {
	let dis = distanceBetweenPoints(p1, p2);
	return { x: (p2.x - p1.x) / dis, y: (p2.y - p1.y) / dis };
}

export var degrees = Math.PI / 180;

// - - - - - - - - - - - - - - - - - - - - - - - - -
// DEFINITIONS OF CLASSES:
// - - - - - - - - - - - - - - - - - - - - - - - - -

export class Diagram {
	constructor(
		parent_selector,
		width = 600,
		height = 400,
		padding = 20,
		bg = "#EEEEEE"
	) {
		this.parent_selector = parent_selector;
		this.width = width;
		this.height = height;
		this.padding = padding;
		this.bg = bg;
		this.center = { x: this.width / 2, y: this.height / 2 };

		this.svg_object = d3
			.select(this.parent_selector)
			.append("div")
			.attr("id", "svg-container")
			.append("svg")
			.attr("id", "diagram")
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("viewBox", `0 0 ${this.width} ${this.height}`);

		this.svg_object
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", this.width)
			.attr("height", this.height)
			.attr("fill", this.bg);
	}
}

export class Problem {
	constructor(
		parent_selector,
		problem_number,
		diagram_width = 600,
		diagram_height = 400,
		diagram_padding = 20,
		diagram_bg = "#EEEEEE"
	) {
		this.parent_selector = parent_selector;
		this.problem_number = problem_number;

		this.problem_div = d3
			.select(this.parent_selector)
			.append("div")
			.attr("id", `problem-${this.problem_number}`)
			.attr("class", "problem");

		this.title = this.problem_div
			.append("h4")
			.attr("class", "problem-title")
			.text(`ამოცანა #${this.problem_number} `);

		this.new_numbers_button = this.title
			.append("button")
			.attr("class", "btn btn-danger")
			.text("ახალი რიცხვები")
			.on("click", this.new_numbers.bind(this));

		this.diagram = new Diagram(
			`#problem-${this.problem_number}`,
			diagram_width,
			diagram_height,
			diagram_padding,
			diagram_bg
		);

		this.text = this.problem_div.append("p").attr("class", "problem-text");
		this.answer = this.problem_div.append("p").attr("class", "answer-text");
		this.explanation = this.problem_div
			.append("div")
			.attr("class", "explanation-text");

		this.randomize_and_calculate();
		this.draw_diagram();
		this.update_text();
	}

	randomize_and_calculate() {
		return;
	}

	draw_diagram() {
		return;
	}

	update_diagram() {
		return;
	}

	update_text() {
		return;
	}

	new_numbers() {
		this.randomize_and_calculate();
		this.update_diagram();
		this.update_text();
	}

	create_label(
		x,
		y,
		{
			width = 100,
			height = 20,
			text = "",
			padding = 10,
			anchor_horizontal = "center",
			anchor_vertical = "center",
			global_transformation = "",
		} = {}
	) {
		let label_container = this.diagram.svg_object
			.append("foreignObject")
			.attr("width", width)
			.attr("height", height)
			.attr("transform", global_transformation);

		let label_tex = label_container
			.append("xhtml:div")
			.attr("xmlns", "http://www.w3.org/1999/xhtml")
			.text(text);

		let label = { container: label_container, tex: label_tex };

		this.align_label(label, x, y, {
			padding: padding,
			anchor_horizontal: anchor_horizontal,
			anchor_vertical: anchor_vertical,
			global_transformation: global_transformation,
		});

		return label;
	}

	align_label(
		label,
		x,
		y,
		{
			padding = 10,
			anchor_horizontal = "center",
			anchor_vertical = "center",
			global_transformation = "",
		} = {}
	) {

		let dx = {
			center: -label.container.attr("width") / 2,
			left: padding,
			right: -label.container.attr("width") - padding,
		};

		let dy = {
			center: -label.container.attr("height") / 2,
			left: padding,
			right: -label.container.attr("height") - padding,
		};

		let fl = {
			center: "center",
			left: "flex-start",
			right: "flex-end",
		};

		label.container
			.attr("x", x + dx[anchor_horizontal])
			.attr("y", y + dy[anchor_vertical])
			.attr("transform", global_transformation);

		label.tex.attr(
			"style",
			`display:flex; width:100%; height:100%; justify-content:${fl[anchor_horizontal]}; align-items:${fl[anchor_vertical]};`
		);
	}
}

// Geometric objects:

export class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = Math.sqrt(x * x + y * y);
	}

	direction() {
		return new Vector2D(this.x / this.r, this.y / this.r);
	}

	scale(s) {
		return new Vector2D(this.x * s, this.y * s);
	}

	add(v2) {
		return new Vector2D(this.x + v2.x, this.y + v2.y);
	}

	subtract(v2) {
		return new Vector2D(this.x - v2.x, this.y - v2.y);
	}

	dot_product(v2) {
		return this.x * v2.x + this.y * v2.y;
	}

	cos_theta(v2) {
		return this.dot_product(v2) / (this.r * v2.r);
	}

	area_spanned(v2) {
		return this.x * v2.y - this.y * v2.x;
	}

	angle_x() {
		return Math.atan2(this.y, this.x) / degrees;
	}

	angle_y() {
		return Math.atan2(this.x, this.y) / degrees;
	}

	angle_x_js() {
		// in SVG y increases top to bottom:
		return Math.atan2(-this.y, this.x) / degrees;
	}

	angle_y_js() {
		// in SVG y increases top to bottom:
		return Math.atan2(this.x, -this.y) / degrees;
	}

	rotate(angle) {
		let x_new =
			this.x * Math.cos(angle * degrees) - this.y * Math.sin(angle * degrees);
		let y_new =
			this.x * Math.sin(angle * degrees) + this.y * Math.cos(angle * degrees);

		return new Vector2D(x_new, y_new);
	}

	distance(v2) {
		return this.subtract(v2).r;
	}

	midpoint(v2) {
		return this.add(v2).scale(0.5);
	}

	midnormal(v2) {
		return v2.subtract(this).rotate(90).direction();
	}

	longitudinal_to(v2) {
		return this.dot_product(v2) / v2.r;
	}

	transverse_to(v2) {
		return this.longitudinal_to(v2.rotate(90));
	}

	angle_between(v2) {
		return (
			Math.atan2(this.transverse_to(v2), this.longitudinal_to(v2)) / degrees
		);
	}
}

export class Segment2V {
	constructor(v1, v2) {
		this.v1 = v1;
		this.v2 = v2;
		this.v12 = this.v2.subtract(this.v1);
	}

	midpoint() {
		return this.v1.midpoint(this.v2);
	}

	midnormal() {
		return this.v1.midnormal(this.v2);
	}

	inclination() {
		return this.v12.angle_x_js();
	}

	label_xy(distance = 15) {
		let lb = this.midpoint().add(this.midnormal().scale(distance));
		return { x: lb.x, y: lb.y };
	}
}

export class Angle3V {
	constructor(v1, v2, v3) {
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		this.calculate();
	}

	calculate() {
		this.v21 = this.v1.subtract(this.v2);
		this.v23 = this.v3.subtract(this.v2);
		this.value = this.v21.angle_between(this.v23);
		this.angle_start = this.v23.angle_y_js();
		this.angle_end = this.angle_start + this.value;
	}

	bisector() {
		return this.v21.direction().midpoint(this.v23.direction()).direction();
	}

	label_xy(distance = 15) {
		let lb = this.v2.add(this.bisector().scale(distance));
		return { x: lb.x, y: lb.y };
	}
}
