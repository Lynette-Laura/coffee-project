"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//____--this function= displays coffees that match search terms-__-

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    interactiveKey();
}




function interactiveKey() {
    var form = document.getElementById("input").value.toLowerCase();
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        var lowerCoffee = coffee.name;
        lowerCoffee = lowerCoffee.toLowerCase();
        if (lowerCoffee.indexOf(form) !== -1 && selectedRoast === "all") {
            filteredCoffees.push(coffee);
        }
        else {
            if (coffee.roast === selectedRoast && form === "") {
                filteredCoffees.push(coffee);
            }
            else if (lowerCoffee.indexOf(form) !== -1 && coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        }

    });

    tbody.innerHTML = renderCoffees(filteredCoffees);

}

function makeNewCoffee(e) {
    e.preventDefault();
    var newCoffee = document.getElementById("new-coffee").value;
    var newRoast = document.getElementById("new-roast").value;
    var lightIndex = coffees.findIndex(function(coffee, index) { return coffee.roast == "medium"});
    var mediumIndex = coffees.findIndex(function(coffee, index) { return coffee.roast == "dark"});
    var darkId = coffees.length + 1;
    var coffee = {
        id: "",
        name: newCoffee,
        roast: newRoast
    };
    if (newCoffee != "") {
        if (newRoast == "light") {
            coffee.id = lightIndex;
            coffees.splice(lightIndex, 0, coffee);
            for(var i = lightIndex; i < coffees.length; i++){
                coffees[i].id += 1;
            }
        }
        else if (newRoast == "medium") {
            coffee.id = mediumIndex;
            coffees.splice(mediumIndex, 0, coffee);
            for(i = mediumIndex; i < coffees.length; i++){
                coffees[i].id += 1;
            }
        } else if (newRoast == "dark") {
            coffee.id = darkId;
            coffees.push(coffee);
        }


        interactiveKey();
        document.getElementById("new-coffee").value = "";
    }
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'}
];

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var newCoffee = document.querySelector('#make-coffee');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
newCoffee.addEventListener('click', makeNewCoffee);




//-------------_-_-_--_-_-_--_--__-__-Animation Mug--__--_-_--_-_-__-__--_--_

var mug = document.querySelector("img");
var angle = 0, lastTime = null;
function animate(time){
    if (lastTime != null)
        angle += (time - lastTime) * 0.0007;
    lastTime = time;
    mug.style.top = (Math.sin(angle) * 20) + "px";
    mug.style.right = (Math.cos(angle) * 300) + "px";
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);