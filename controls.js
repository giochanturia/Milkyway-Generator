function newProblem() {
    exerciseFrame = document.getElementById("exercise").contentWindow;
    exerciseFrame.postMessage({"evaluate": "newProblem()"});
}
