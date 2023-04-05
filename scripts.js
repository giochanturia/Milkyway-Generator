import * as base from "./base.js";

import * as problemset1 from "./problemset1.js"
// import * as problemset2 from "./problemset2.js" // This is physics set, which needs more work.
import * as problemset3 from "./problemset3.js"
import * as problemset4 from "./problemset4.js"
import * as problemset5 from "./problemset5.js"
import * as problemset6 from "./problemset6.js"
import * as problemset7 from "./problemset7.js"
import * as problemset8 from "./problemset8.js"
import * as problemset9 from "./problemset9.js"
import * as problemset11 from "./problemset11.js"
import * as problemset13 from "./problemset13.js"
var problem_counter = 0;


var p0 = new problemset13.TriangleThirdAngle("#container", ++problem_counter);
d3.select("#container").append("hr");
var p1 = new problemset13.TriangleSecondEdge("#container", ++problem_counter);
d3.select("#container").append("hr");
var p2 = new problemset13.TriangleThirdEdge("#container", ++problem_counter);
d3.select("#container").append("hr");
var p4 = new problemset5.RightTriangleHeight("#container", ++problem_counter);
d3.select("#container").append("hr");
var p5 = new problemset1.TriangleArea("#container", ++problem_counter);

d3.select("#container").append("hr");
var m1 = new problemset11.PolynomialFactorization("#container", ++problem_counter);
d3.select("#container").append("hr");
var m2 = new problemset11.GeometricProgression("#container", ++problem_counter);
d3.select("#container").append("hr");
var m9 = new problemset11.ScalarProduct("#container", ++problem_counter);
d3.select("#container").append("hr");
var m6 = new problemset11.OrthogonalLines("#container", ++problem_counter);
d3.select("#container").append("hr");
var m7 = new problemset11.NormalizeVector("#container", ++problem_counter);
d3.select("#container").append("hr");
var m10 = new problemset11.DistanceBetweenVectors("#container", ++problem_counter);
d3.select("#container").append("hr");
var m3 = new problemset11.Lines3D("#container", ++problem_counter);
d3.select("#container").append("hr");
var m4 = new problemset11.SimilarTriangles1("#container", ++problem_counter);
d3.select("#container").append("hr");
var m5 = new problemset11.SimilarTriangles2("#container", ++problem_counter);
d3.select("#container").append("hr");
var m8 = new problemset11.HalfSphereArea("#container", ++problem_counter);
d3.select("#container").append("hr");
var m11 = new problemset11.CircleSector("#container", ++problem_counter);
d3.select("#container").append("hr");
var m12 = new problemset11.Thales("#container", ++problem_counter);
d3.select("#container").append("hr");

var e1 = new problemset6.Probability("#container", ++problem_counter);
d3.select("#container").append("hr");
var e2 = new problemset7.Percentage("#container", ++problem_counter);
d3.select("#container").append("hr");
var e3 = new problemset8.Ratios("#container", ++problem_counter);
d3.select("#container").append("hr");
var e4 = new problemset8.Percentage("#container", ++problem_counter);
d3.select("#container").append("hr");
var e5 = new problemset8.Quadraticequationsolving("#container", ++problem_counter);
d3.select("#container").append("hr");
var e6 = new problemset9.Ratios("#container", ++problem_counter);
d3.select("#container").append("hr");
var e7 = new problemset9.Arithmeticprogression("#container", ++problem_counter);
d3.select("#container").append("hr");
