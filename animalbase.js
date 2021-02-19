"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "",
  type: "",
  age: 0,
};

function start() {
  // TODO: Add event-listeners to filter and sort buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", filtering);
  });
  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(prepareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function prepareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";
  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);
  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;
  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

function filtering(filter) {
  let animals = allAnimals.slice(); // default list all animals
  filter = this.dataset.filter;
  if (filter === "cat") {
    animals = allAnimals.filter((animal) => animal.type === "cat");
  } else if (filter === "dog") {
    animals = allAnimals.filter((animal) => animal.type === "dog");
  } else if (filter === "dragon") {
    animals = allAnimals.filter((animal) => animal.type === "dragon");
  } else if (filter === "horse") {
    animals = allAnimals.filter((animal) => animal.type === "horse");
  }
  console.table(animals);

  displayList(animals);
}
