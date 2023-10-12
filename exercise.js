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


var JStoStyle = (js_object) => {
	return Object.entries(js_object)
		.map(([k, v]) => `${k}:${v}`)
		.join(";");
};

window.onmessage = (event) => {
	if (event.data) console.log(event.data);
	if (event.data.style) {
		document.body.setAttribute("style", JStoStyle(event.data.style));
	}
    if (event.data.evaluate) {
        eval(event.data.evaluate);
    }
};

var problem_collection = {
    "TriangleThirdAngle": problemset13.TriangleThirdAngle,
    "TriangleSecondEdge": problemset13.TriangleSecondEdge,
    "TriangleThirdEdge": problemset13.TriangleThirdEdge,
    "RightTriangleHeight": problemset5.RightTriangleHeight,
    "TriangleArea": problemset1.TriangleArea,
    "PolynomialFactorization": problemset11.PolynomialFactorization,
    "GeometricProgression": problemset11.GeometricProgression,
    "ScalarProduct": problemset11.ScalarProduct,
    "OrthogonalLines": problemset11.OrthogonalLines,
    "NormalizeVector": problemset11.NormalizeVector,
    "DistanceBetweenVectors": problemset11.DistanceBetweenVectors,
    "Lines3D": problemset11.Lines3D,
    "SimilarTriangles1": problemset11.SimilarTriangles1,
    // "SimilarTriangles2": problemset11.SimilarTriangles2,
    "HalfSphereArea": problemset11.HalfSphereArea,
    "CircleSector": problemset11.CircleSector,
    "Thales": problemset11.Thales,
    "Probability": problemset6.Probability,
    "Percentage": problemset7.Percentage,
    "Ratios": problemset8.Ratios,
    "Percentage2": problemset8.Percentage,
    "Quadraticequationsolving": problemset8.Quadraticequationsolving,
    "Ratios2": problemset9.Ratios,
    "Arithmeticprogression": problemset9.Arithmeticprogression,
}

var p0 = new problem_collection["TriangleThirdAngle"]("#container", ++problem_counter);

function newProblem() {
    document.getElementById("container").innerHTML = "";
    let allProblems = Object.keys(problem_collection)
    let randomProblem = allProblems[Math.floor(Math.random()*allProblems.length)]
    var p0 = new problem_collection[randomProblem]("#container", ++problem_counter);
    jqMath.parseMath(document.body);
}