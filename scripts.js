
import * as problemset1 from "./problemset1.js"
import * as problemset2 from "./problemset2.js"
import * as problemset3 from "./problemset3.js"
import * as problemset4 from "./problemset4.js"
import * as problemset5 from "./problemset5.js"

var problem_counter = 0;

var p1 = new problemset3.PythagoreanTheorem("#container", ++problem_counter);
d3.select("#container").append("hr");
var p2 = new problemset1.TriangleArea("#container", ++problem_counter);
d3.select("#container").append("hr");
var p3 = new problemset4.DistanceBetweenTwoPoints("#container", ++problem_counter);
d3.select("#container").append("hr");
var p4 = new problemset5.RightTriangleHeight("#container", ++problem_counter);