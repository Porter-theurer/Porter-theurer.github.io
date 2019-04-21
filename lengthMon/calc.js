var ins = {
    cost: $("#cost"),
    spending: $("#spending"),
    hour: $("#hour"),
    avgHours: $("#avgHours"),
}
for(var i in ins){
    if(localStorage[i]){
        ins[i].val(parseFloat(localStorage[i]));
    }
}

function roundToHundred(num){
    return Math.round(num*100)/100;
}

$("#submit").click(function(){

    var cV = ins.cost.val();
    var sV = ins.spending.val()*0.01;
    var hV = ins.hour.val();
    var aHV = ins.avgHours.val();

    var outputHTML = "";
    if(!cV||!sV){
        alert("Please input something before submiting");
    } else {
        var amountNeeded = roundToHundred(cV/sV);
        outputHTML += "You need to earn $" + amountNeeded + " to have enough spending money to buy something worth $" + cV;
        if(hV){
            var neededHours = Math.ceil(amountNeeded/hV);
            outputHTML += "<br>This will take you " + neededHours + " hours to earn at $" + hV + " per hour";
            if(aHV){
                var neededDays = Math.ceil(neededHours/aHV)
                outputHTML += ", which will take you about "+neededDays+" day(s)."
            }
        }
    }

    $("#output").html(outputHTML);

    for(var i in ins) {
        localStorage[i] = ins[i].val();
    }

})
$("#reset").click(function(){
    $("#output").html("");
    for(var i in ins){
        ins[i].val(undefined);
    }
})
