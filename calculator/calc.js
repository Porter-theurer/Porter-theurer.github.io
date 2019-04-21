var stage = "show"

//Calculator Variables
var calc = {
    money: 0,
    splits: [
        {
            name: "Spending",
            percent: 0
        },
        {
            name: "Savings",
            percent: 50,
        },
        {
            name: "Charity",
            percent: 10,
        },
    ],
}

//Set localStorage
for(var i = 0; i < localStorage.length/2; i ++){
    calc.splits[i] = {};
    calc.splits[i].name = localStorage[i+"name"];
    calc.splits[i].percent = parseInt(localStorage[i+"value"],10);
}

//HTML Objects
var elements = {
    main: document.getElementById("main"),
    amount: document.getElementById("amount"),
    output: document.getElementById("output"),
    edit: document.getElementById("edit"),
    editOutput: document.getElementById("editCalcOutput"),
    saveLocal: document.getElementById("saveToLocal"),
    removeLocal: document.getElementById("removeLocal"),
}

//Modifying functions
var modifiers = {
    upFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

//Updates spending amount in relation to others
function updateSpending(){
    var totalPercent = 0;
    for(var i = 1; i < calc.splits.length; i ++){
        totalPercent+=parseInt(calc.splits[i].percent,10);
    }
    var newValue = 100 - totalPercent;
    calc.splits[0].percent = newValue;
    if(newValue < 0){
        calc.splits[0].name = "Debt";
    } else if(calc.splits[0].name!=="Spending"){
        calc.splits[0].name = "Spending";
    }
};
updateSpending();

//Creates the edit area for changing the calculator
function createInputArea(){

    //Hide original and reset
    updateSpending();
    main.style.display = "none";
    elements.output.innerHTML = "";
    var outputHTML = "";
    stage = "edit"

    //Add current values
    for (var i = 0; i < calc.splits.length; i++) {
        var split = calc.splits[i];

        outputHTML += 'Name: "' + split.name + '", Percent: ' + split.percent + '.' + (i===0?"":' <button class="remove">Remove</button> <button class="edit">Edit</button>') + "<br>";
    }

    // Add new button
    outputHTML += '<button id="add">Add New</button><br><button id="done">Done</button>';

    // Set HTML to output
    elements.editOutput.innerHTML = outputHTML;

    //New Element Code
    elements.done = document.getElementById("done");
    elements.done.addEventListener("click", function(){
        elements.editOutput.innerHTML = "";
        elements.main.style.display = "block";
        stage = "show";
        returnAnswer();
    });

    //Remove Buttons
    elements.removeBtns = document.getElementsByClassName("remove")
    for(var i = 0; i < elements.removeBtns.length; i ++){
        elements.removeBtns[i].index = i+1;
        elements.removeBtns[i].addEventListener("click",function(){
            calc.splits.splice(this.index,1);
            createInputArea();
        })
    }

    //Edit Buttons
    elements.editBtns = document.getElementsByClassName("edit");
    for(var i = 0; i < elements.editBtns.length; i ++){
        elements.editBtns[i].index = i+1;
        elements.editBtns[i].addEventListener("click", function(){
            var outputHTML = "";
            outputHTML += '<label>Name:</label><input id="newName" type="text" value="'+calc.splits[this.index].name+'" placeholder="Name"> ';
            outputHTML += '<label>Percent:</label><input id="newPercent" type="number" value="'+calc.splits[this.index].percent+'" placeholder="Percent">';
            outputHTML += "<br>";
            outputHTML += '<button id="cancel">Cancel</button><button id="saveEdit">Save</button>';
            elements.editOutput.innerHTML = outputHTML;

            //More element code
            elements.saveEdit = document.getElementById("saveEdit")
            elements.saveEdit.index = this.index;
            elements.saveEdit.addEventListener("click", function(){
                calc.splits[this.index].name = document.getElementById("newName").value
                calc.splits[this.index].percent = parseInt(document.getElementById("newPercent").value,10) || 0;
                createInputArea();
            });
            document.getElementById("cancel").addEventListener("click", function(){
                createInputArea();
            })
        })
    }

    // Add NEW Button
    elements.addNewBtn = document.getElementById("add");
    elements.addNewBtn.addEventListener("click", function(){
        var outputHTML = "";
        outputHTML += '<label>Name:<input id="newName" type="text" placeholder="Name"></label> ';
        outputHTML += '<label>Percent:<input id="newPercent" type="number" placeholder="Percent"></label>';
        outputHTML += "<br>";
        outputHTML += '<button id="cancel">Cancel</button><button id="addSplit">Add</button>';
        elements.editOutput.innerHTML = outputHTML;

        //More element code
        elements.addSplit = document.getElementById("addSplit")
        elements.addSplit.addEventListener("click", function(){
            calc.splits.push({
                name: document.getElementById("newName").value,
                percent: parseInt(document.getElementById("newPercent").value,10) || 0,
            })
            createInputArea();
        });
        document.getElementById("cancel").addEventListener("click", function(){
            createInputArea();
        })

    })
};

//Outputs answers
function returnAnswer(force){

    calc.money = parseFloat(document.getElementById("amount").value,10) || 0;
    if(((calc.money||elements.output.innerHTML)&&stage=="show")||force){
        outputHTML = 'Here are your results';

        for(var i = 0; i < calc.splits.length; i ++){
            var splitWay = calc.splits[i];
            var name = modifiers.upFirstLetter(splitWay.name)
            var amount = splitWay.percent/100 * calc.money;

            outputHTML+="<br>";
            outputHTML+= name + ": $" + Math.floor(amount*100)/100;
        }

    }
    elements.output.innerHTML = outputHTML;
}
returnAnswer(true);

//Event listeners
elements.edit.addEventListener("click", createInputArea)
elements.saveLocal.addEventListener("click", function(){
    localStorage.clear();
    for(var i = 0; i < calc.splits.length; i ++){
        localStorage[i+"name"] = calc.splits[i].name;
        localStorage[i+"value"] = calc.splits[i].percent;
    }
})
elements.amount.addEventListener("keyup", returnAnswer);
