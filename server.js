const express = require("express");
const app = express();
const port = 3000;

let keitinPaalla = false;

app.get("/", (req, res) => {
  res.send(
    "Tervetuloa kahvinkeittimen palvelimeen! Käytä /set/on, /set/off, /switch tai /coffee."
  );
});

app.get("/set/on", (req, res) => {
  keitinPaalla = true;
  res.send("Kahvinkeitin on nyt päällä");
});

app.get("/set/off", (req, res) => {
  keitinPaalla = false;
  res.send("Kahvinkeitin on nyt pois päältä");
});

app.get("/switch", (req, res) => {
  keitinPaalla = !keitinPaalla;
  res.send(
    `Kahvinkeitin vaihdettiin ${keitinPaalla ? "päälle" : "pois päältä"}`
  );
});

app.get("/coffee", async (req, res) => {
  try {
    const kahvi = await keitaKahvia(keitinPaalla);
    res.send(kahvi);
  } catch (error) {
    res.status(400).send(error);
  }
});

function keitaKahvia(keitinPaalla) {
  return new Promise((resolve, reject) => {
    console.log("Kahvinkeitin käynnistyy...");
    setTimeout(() => {
      if (keitinPaalla) {
        resolve("Kahvi on valmista!");
      } else {
        reject("Kahvinkeitin on pois päältä. Laita se päälle.");
      }
    }, 2000);
  });
}

app.listen(port, () => {
  console.log(
    `Kahvinkeitin-palvelin toimii osoitteessa http://localhost:${port}`
  );
});
