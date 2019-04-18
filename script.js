function makeCalculator(){
  var c_type = prompt('What calculator would you like to make?')
  if (c_type === "SPLIT") {
    window.location.href = "calculator";
  } else if ("NEEDED MON") {
    window.location.href = "neededMon";
  } else {
    alert('invalid response')
  }
}

var btn = document.getElementById("makeCalc");
btn.addEventListener("click", makeCalculator);
