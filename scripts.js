import * as base from "./base.js";

import * as problemset1 from "./problemset1.js"
// import * as problemset2 from "./problemset2.js" // This is physics set, which needs more work.
import * as problemset3 from "./problemset3.js"
import * as problemset4 from "./problemset4.js"
import * as problemset5 from "./problemset5.js"
import * as problemset13 from "./problemset13.js"
var problem_counter = 0;

// var p0 = new problemset13.TriangleProblem("#container", ++problem_counter);
var p1 = new problemset13.PolygonProblem("#container", ++problem_counter);
// var p1 = new problemset3.PythagoreanTheorem("#container", ++problem_counter);
// d3.select("#container").append("hr");
// var p2 = new problemset1.TriangleArea("#container", ++problem_counter);
// d3.select("#container").append("hr");
// var p3 = new problemset4.DistanceBetweenTwoPoints("#container", ++problem_counter);
d3.select("#container").append("hr");
var p4 = new problemset5.RightTriangleHeight("#container", ++problem_counter);

// var v1 = new base.Vector2D(0,-1);
// var v2 = new base.Vector2D(1,2);
// console.log(v1.longitudinal_to(v2));
// console.log(v1.transverse_to(v2));
