function makeCalculator(){
  var c_type = prompt('What calculator would you like to make?')
  if (c_type === "SPLIT") {

  } else {
    alert('invalid response')
  }
}

var btn = document.getElementById("makeCalc");
btn.addEventListener("click", makeCalculator);
alert("!")
