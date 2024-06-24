import axios from "axios";

async function getRandomFossil() {
  const url = `/random-fossil.json`;
  const res = await axios.get(url);
  console.log(res.data);
  const imgString = `<img src= "${res.data.img}"></img>`;
  const nameString = res.data.name;
  console.log(imgString);
  console.log(nameString);
  document.querySelector("#random-fossil-image").innerHTML = imgString;
  //   console.log(document.querySelectorAll("#random-fossil-img").innerHTML);
  document.querySelector("#random-fossil-name").innerHTML = nameString;
  //   console.log(document[querySelectorAll("#random-fossil-name")]);
}

document
  .querySelector("#get-random-fossil")
  .addEventListener("click", getRandomFossil);
