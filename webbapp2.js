import { DecisionTree } from "./libraries/decisiontree.js";
import { VegaTree } from "./libraries/vegatree.js";

function addEventListenerToSubmitButton() {
    let glucose = document.getElementById("glucose");
    let pedigree = document.getElementById("pedigree");
    let age = document.getElementById("age");
    let submitBtn = document.getElementById("submit-button");
  
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!glucose.value || !pedigree.value || !age.value) {
        alert("Please fill out all fields");
      } else {
        let patient = { Glucose: glucose.value, Pedigree: pedigree.value, Age: age.value };
        loadSavedModel(patient);
      }
    });
  }
  
  addEventListenerToSubmitButton();
  
  function loadSavedModel(patient) {
    fetch("model/model.json")
      .then((response) => response.json())
      .then((model) => {
        modelLoaded(model, patient);
        console.log(model);
      });
  }
  
  function modelLoaded(model, patient) {
    let decisionTree = new DecisionTree(model);
    let prediction = decisionTree.predict(patient);
    console.log("predicted: " + prediction);
  
    let userInput = document.getElementById("userInput");
    if (userInput !== null && prediction !== undefined && prediction == "1") {
        //userInput.innerText = `The prediction is: ${prediction}`;
        userInput.innerText = "you have diabetes, go to a doctor";
      }
      else if (userInput !== null && prediction !== undefined && prediction == "0") {
        userInput.innerText = "you don't have diabetes, but I hope you stay healthy";
      }
      
    let visual = new VegaTree("#view", 900, 500, decisionTree.toJSON());
  }
    loadSavedModel();