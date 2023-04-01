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
		return create_label(this.diagram.svg_object, x, y, {
			width: width,
			height: height,
			text: text,
			padding: padding,
			anchor_horizontal: anchor_horizontal,
			anchor_vertical: anchor_vertical,
			global_transformation: global_transformation,
		});
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
		align_label(label, x, y, {
			padding: padding,
			anchor_horizontal: anchor_horizontal,
			anchor_vertical: anchor_vertical,
			global_transformation: global_transformation,
		});
	}
}

export function align_label(
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

export function create_label(
	parent_svg,
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
	let label_container = parent_svg
		.append("foreignObject")
		.attr("width", width)
		.attr("height", height)
		.attr("transform", global_transformation);

	let label_tex = label_container
		.append("xhtml:div")
		.attr("xmlns", "http://www.w3.org/1999/xhtml")
		.text(text);

	let label = { container: label_container, tex: label_tex };

	align_label(label, x, y, {
		padding: padding,
		anchor_horizontal: anchor_horizontal,
		anchor_vertical: anchor_vertical,
		global_transformation: global_transformation,
	});

	return label;
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

	length() {
		return this.v12.r;
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

export function calculate_centroid(points) {
	let centroid = { x: 0, y: 0 };
	points.forEach((p) => {
		centroid.x += p.x;
		centroid.y += p.y;
	});
	centroid.x *= 1 / points.length;
	centroid.y *= 1 / points.length;

	return centroid;
}

export function angles_centroid(points) {
	let centroid = calculate_centroid(points);
	let angles = [];

	points.forEach((p) => {
		angles.push(Math.atan2(p.x - centroid.x, p.y - centroid.y) / degrees);
	});

	return angles;
}

export function convexify(points) {
	let centroid = calculate_centroid(points);

	points.sort(function (a, b) {
		return (
			Math.atan2(a.x - centroid.x, a.y - centroid.y) -
			Math.atan2(b.x - centroid.x, b.y - centroid.y)
		);
	});
	return points;
}

export class Polygon {
	constructor(
		parent_svg,
		vertices,
		vertex_names,
		{ css_class = "", global_transformation = "", other_attributes = {} } = {}
	) {
		if (vertices.length != vertex_names.length) {
			throw new Error(
				'Arrays "vertices" and "labels" must have the same length.'
			);
		}

		this.svg_object = parent_svg;
		this.global_transformation = global_transformation;

		this.vertices = vertices;
		this.vertex_names = vertex_names;
		this.n = vertices.length;

		this.edge_lengths = [];
		for (let i = 0; i < this.n; i++) {
			this.edge_lengths.push(
				this.vertices[i].distance(this.vertices[(i + 1) % this.n])
			);
		}
		this.smallest_edge = Math.min(...this.edge_lengths);

		this.pathGenerator = d3
			.line()
			.x((d) => d.x)
			.y((d) => d.y);

		this.path = this.svg_object
			.append("path")
			.attr("d", this.pathGenerator([...this.vertices, this.vertices[0]]))
			.attr("class", css_class)
			.attr("transform", global_transformation);

		for (let i in other_attributes) {
			this.path.attr(i, other_attributes[i]);
		}
	}

	redraw_polygon(new_vertices, new_global_transformation = "") {
		if (new_vertices.length != this.vertices.length) {
			throw new Error(
				"You cannot change the number of vertices while redrawing."
			);
		}
		this.vertices = new_vertices;
		this.global_transformation = new_global_transformation;
		this.path
			.attr("d", this.pathGenerator([...this.vertices, this.vertices[0]]))
			.attr("transform", this.global_transformation);
		for (let i in this.vertex_labels) {
			this.label_vertex(i);
		}
		for (let i in this.angle_labels) {
			this.label_angle(i);
		}
		for (let e in this.edge_labels) {
			this.label_edge(this.edge_labels[e].i1, this.edge_labels[e].i2);
		}
	}

	label_all_vertices(args = {}) {
		for (let i = 0; i < this.n; i++) {
			this.label_vertex(i, args);
		}
	}

	label_all_edges(args = {}) {
		for (let i = 0; i < this.n; i++) {
			this.label_edge(i, (i + 1) % this.n, args);
		}
	}

	label_all_angles(args = {}) {
		for (let i = 0; i < this.n; i++) {
			this.label_angle(i, args);
		}
	}

	label_vertex(
		i1,
		{ padding = 15, label_type = "name", label_text = "", in_out = 1 } = {}
	) {
		if (!this.vertex_labels) {
			this.vertex_labels = {};
		}

		if (i1 < 0 || i1 >= this.n) {
			throw new Error(`Invalid index for a vertex: ${i1}.`);
		}

		let label_types = {
			name: `$${this.vertex_names[i1]}$`,
			value: `$(${Math.round(this.vertices[i1].x)},${Math.round(
				this.vertices[i1].y
			)})$`,
			"name and value": `$${this.vertex_names[i1]} (${Math.round(
				this.vertices[i1].x
			)},${Math.round(this.vertices[i1].y)})$`,
			custom: label_text,
		};

		let vertex_name = label_types[label_type];
		let vertex_angle = new Angle3V(
			this.vertices[(parseInt(i1) + this.n - 1) % this.n],
			this.vertices[parseInt(i1)],
			this.vertices[(parseInt(i1) + this.n + 1) % this.n]
		);
		let vertex_label_center = vertex_angle.label_xy(-padding * in_out);

		if (!this.vertex_labels[i1]) {
			this.vertex_labels[i1] = {
				label: create_label(
					this.svg_object,
					vertex_label_center.x,
					vertex_label_center.y,
					{
						text: vertex_name,
						global_transformation: this.global_transformation,
					}
				),
				label_type: label_type,
				label_text: label_text,
			};
		} else {
			label_types["custom"] = this.vertex_labels[i1].label_text;
			this.vertex_labels[i1].label.tex.text(
				label_types[this.vertex_labels[i1].label_type]
			);
			align_label(
				this.vertex_labels[i1].label,
				vertex_label_center.x,
				vertex_label_center.y,
				{
					global_transformation: this.global_transformation,
				}
			);
		}
	}

	label_angle(
		i1,
		{
			arc_radius_inner = 0,
			arc_radius_outer = 32,
			padding = 42,
			label_type = "custom",
			label_text = "",
			in_out = 1,
		} = {}
	) {
		if (!this.angle_labels) {
			this.angle_labels = {};
		}

		if (!this.angle_arcs) {
			this.angle_arcs = {};
		}

		if (i1 < 0 || i1 >= this.n) {
			throw new Error(`Invalid index for a vertex: ${i1}.`);
		}

		let vertex_angle = new Angle3V(
			this.vertices[(parseInt(i1) + this.n - 1) % this.n],
			this.vertices[parseInt(i1)],
			this.vertices[(parseInt(i1) + this.n + 1) % this.n]
		);

		let label_types = {
			name: `$∠${this.vertex_names[i1]}$`,
			value: `$${Math.round(Math.abs(vertex_angle.value) * 10) / 10}°$`,
			"name and value": `$∠${this.vertex_names[i1]}=${vertex_angle.value}°$`,
			custom: label_text,
		};

		let real_arc_radius_outer = Math.min(
			arc_radius_outer,
			vertex_angle.v21.r / 2,
			vertex_angle.v23.r / 2
		);

		if (!this.angle_arcs[i1]) {
			this.angle_arcs[i1] = this.svg_object.append("path");
		}
		this.angle_arcs[i1]
			.attr(
				"d",
				d3
					.arc()
					.innerRadius(arc_radius_inner)
					.outerRadius(real_arc_radius_outer)
					.startAngle(vertex_angle.angle_start * degrees)
					.endAngle(vertex_angle.angle_end * degrees)
			)
			.attr(
				"transform",
				this.global_transformation +
					` translate(${this.vertices[parseInt(i1)].x}, ${
						this.vertices[parseInt(i1)].y
					})`
			)
			.attr("class", "angle");

		let angle_label_center = vertex_angle.label_xy(
			Math.min(padding, real_arc_radius_outer + 10) * in_out
		);

		if (!this.angle_labels[i1]) {
			this.angle_labels[i1] = {
				label: create_label(
					this.svg_object,
					angle_label_center.x,
					angle_label_center.y,
					{
						text: label_types[label_type],
						global_transformation: this.global_transformation,
					}
				),
				label_type: label_type,
				label_text: label_text,
			};
			this.angle_labels[i1].label.tex.attr("class", "angle-label");
		} else {
			label_types["custom"] = this.angle_labels[i1].label_text;
			this.angle_labels[i1].label.tex.text(
				label_types[this.angle_labels[i1].label_type]
			);
			align_label(
				this.angle_labels[i1].label,
				angle_label_center.x,
				angle_label_center.y,
				{
					global_transformation: this.global_transformation,
				}
			);
		}
	}

	label_edge(
		i1,
		i2,
		{
			padding = 15,
			label_type = "value",
			label_text = "",
			rotate = true,
			in_out = 1,
		} = {}
	) {
		if (!this.edge_labels) {
			this.edge_labels = {};
		}

		if (i1 < 0 || i1 >= this.n || i2 < 0 || i2 >= this.n || i1 == i2) {
			throw new Error(`Invalid indices for vertices: ${i1}, ${i2}.`);
		}

		let edge_name = this.vertex_names[i1] + this.vertex_names[i2];
		let edge_segment = new Segment2V(this.vertices[i1], this.vertices[i2]);
		let edge_length = Math.round(edge_segment.length() * 100) / 100;
		let edge_label_center = edge_segment.label_xy(padding * in_out);
		let edge_label_angle = edge_segment.inclination();

		if (edge_label_angle > 80 || edge_label_angle < -80) {
			edge_label_angle = edge_label_angle - 180;
		}

		let label_types = {
			name: `$${edge_name}$`,
			value: `$${edge_length}$`,
			"name and value": `$${edge_name}=${edge_length}$`,
			custom: label_text,
		};

		let rotate_transform = rotate
			? ` rotate(${-edge_label_angle}, ${edge_label_center.x}, ${
					edge_label_center.y
			  })`
			: "";

		if (!this.edge_labels[edge_name]) {
			this.edge_labels[edge_name] = {
				label: create_label(
					this.svg_object,
					edge_label_center.x,
					edge_label_center.y,
					{
						text: label_types[label_type],
						global_transformation:
							this.global_transformation + rotate_transform,
					}
				),
				label_type: label_type,
				label_text: label_text,
				i1: i1,
				i2: i2,
			};
		} else {
			label_types["custom"] = this.edge_labels[edge_name].label_text;
			this.edge_labels[edge_name].label.tex.text(
				label_types[this.edge_labels[edge_name].label_type]
			);
			align_label(
				this.edge_labels[edge_name].label,
				edge_label_center.x,
				edge_label_center.y,
				{
					global_transformation: this.global_transformation + rotate_transform,
				}
			);
		}
	}
}
