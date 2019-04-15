//Calculator Variables
var calc = {
    money: 0,
    splits: [
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
  ],
}
//HTML Objects
var elements = {
    submit: document.getElementById("submit"),
    output: document.getElementById("output"),
    edit: document.getElementById("edit"),
    editOutput: document.getElementById("editCalcOutput"),
}
//Modifying functions
var modifiers = {
    upFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
//Event listeners
elements.submit.addEventListener("click", function(){
    calc.money = document.getElementById("amount").value;
    var outputHTML = 'Here are your results';

    for(var i = 0; i < calc.splits.length; i ++){
        var splitWay = calc.splits[i];
        var name = modifiers.upFirstLetter(splitWay.name)
        var amount = splitWay.percent/100 * calc.money;

        outputHTML+="<br>";
        outputHTML+= name + ": " + Math.floor(amount*100)/100;
    }

    elements.output.innerHTML = outputHTML;
});
function createInputArea(){
    
}
elements.edit.addEventListener("click", createInputArea)
