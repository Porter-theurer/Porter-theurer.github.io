var money = 0;
var submit = document.querySelector("button");
var output = document.getElementById("output");
var splits = [
  {
    name: "savings",
    percent: 50,
  },
  {
    name: "charity",
    percent: 10,
  },
  {
    name: "spending",
    percent: 40
  }
];
submit.addEventListener("click",function(){
    money = document.getElementById("amount").value;
    var outputHTML = 'Here are your results<br>';

    for(var i = 0; i < splits.length; i ++){
      outputHTML+=splits[i].name+": "+splits[i].percent/100*money+"<br>";
    }

    output.innerHTML = outputHTML;
});
