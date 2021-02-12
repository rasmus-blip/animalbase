"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
  console.log("loaded");
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array

    const firstSpace = jsonObject.fullname.indexOf(" ");
    const lastSpace = jsonObject.fullname.lastIndexOf(" ");
    // const middleSpace = jsonObject.fullname.indexOf(firstSpace, " ");
    const nameAnimal = jsonObject.fullname.substring(0, firstSpace).trim();
    const type = jsonObject.fullname.substring(lastSpace).trim();
    // const description = jsonObject.fullname
    //   .substring(middleSpace, lastSpace)
    //   .trim();
    const age = jsonObject.age;

    const animal = {
      name: nameAnimal,
      //   desc: description, MANGLER!!
      type: type,
      age: age,
    };
    console.log(animal);

    allAnimals.name = animal.name;
    allAnimals.type = animal.type;
    // allAnimals.desc = animal.description;
    allAnimals.age = animal.age;

    allAnimals.push(animal);
    delete allAnimals.fullname;

    // TODO: MISSING CODE HERE !!!
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  // clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
