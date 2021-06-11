// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const missionDestination = document.getElementById("missionTarget");
         let jsonIndex = Math.floor(Math.random()*json.length);
         missionDestination.innerHTML = `
            <div>
               <h2>Mission Destination</h2>
               <ol>
                  <li id="planetName">Name: ${json[jsonIndex].name}</li>
                  <li>Diameter: ${json[jsonIndex].diameter}</li>
                  <li>Star: ${json[jsonIndex].star}</li>
                  <li>Distance from Earth: ${json[jsonIndex].distance}</li>
                  <li>Number of Moons: ${json[jsonIndex].moons}</li>
               </ol>
               <img src="${json[jsonIndex].image}">
            </div>
         `
      })
   });
   let pilotNameInput = document.querySelector("input[name=pilotName]");
   let coPilotNameInput = document.querySelector("input[name=copilotName]");
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   let cargoMassInput = document.querySelector("input[name=cargoMass]");
   let form = document.querySelector("form");
   let submitButton = document.getElementById("formSubmit");
   let faultyItemsList = document.getElementById("faultyItems");
   
   let isFormValid = function () {
      let validCheck = false;
      if (pilotNameInput.value === "" || coPilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields required!");
         event.preventDefault();
         return validCheck;
      }
                  
      else if (isNaN(pilotNameInput.value) === false) {
         alert("Please enter a valid pilot name")
         event.preventDefault();
         return validCheck;
      }

      else if (isNaN(coPilotNameInput.value) === false) {
         alert("Please enter a valid Co-Pilot name")
         event.preventDefault();
         return validCheck;
      }

      else if (isNaN(fuelLevelInput.value) === true) {
         alert("Please enter a valid number for fuel level")
         event.preventDefault();
         return validCheck;
      }

      else if (isNaN(cargoMassInput.value) === true) {
         alert("Please enter a valid number for cargo mass")
         event.preventDefault();
         return validCheck;
      }

      else {
         validCheck = true;
         event.preventDefault();
         return validCheck;
      }
   };
   
   let updateFaultyItems = function() {
      let passedValidations = isFormValid();
      let readyForLaunch = false;
      let pilotStatus = document.getElementById("pilotStatus");
      let coPilotStatus = document.getElementById("copilotStatus");
      let cargoStatus = document.getElementById("cargoStatus")
      let fuelStatus = document.getElementById("fuelStatus");
      let launchStatus = document.getElementById("launchStatus");
      let planetName = document.getElementById("planetName");

      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for liftoff!`;
      document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${coPilotNameInput.value} is ready for liftoff!`;
      

      if (passedValidations === true && readyForLaunch === false) {
            
            if (fuelLevelInput.value < 10000 && cargoMassInput.value > 10000) {
               faultyItemsList.style.visibility = "visible";
               cargoStatus.innerHTML = `Current mass of ${cargoMassInput.value}kg is too heavy to safely launch.`;
               fuelStatus.innerHTML = `Current fuel level of ${fuelLevelInput.value}L is too low to safely launch.`;
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
               alert("Not safe to launch. Please review Launch Status Checklist.");
               readyForLaunch = false;
            }
            
            else if (fuelLevelInput.value < 10000 && cargoMassInput.value <= 10000) {
               faultyItemsList.style.visibility = "visible";
               fuelStatus.innerHTML = `Current fuel level of ${fuelLevelInput.value}L is too low to safely launch.`;
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
               alert("Not safe to launch. Please review Launch Status Checklist.");
               readyForLaunch = false;
            }

            else if (cargoMassInput.value > 10000 && fuelLevelInput.value >= 10000){
               faultyItemsList.style.visibility = "visible";
               cargoStatus.innerHTML = `Current mass of ${cargoMassInput.value}kg is too heavy to safely launch.`;
               launchStatus.innerHTML = "Shuttle Not Ready for Launch";
               launchStatus.style.color = "red";
               alert("Not safe to launch. Please review Launch Status Checklist.");
               readyForLaunch = false;
            }
            
           else if (fuelLevelInput.value >= 10000 && cargoMassInput.value <= 10000) {
               faultyItemsList.style.visibility = "visible";
               launchStatus.innerHTML = "Shuttle Is Ready for Launch";
               launchStatus.style.color = "green";
               fuelStatus.innerHTML = "Fuel level high enough for launch."
               cargoStatus.innerHTML = "Cargo mass low enough for launch."
               alert("Safe for launch, pack your bags!")
               readyForLaunch = true;
           }
         }
      }
   
   submitButton.addEventListener("click", updateFaultyItems);
});