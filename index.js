const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hermiones-library");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const Character = require("./models/character");
const Spell = require("./models/spell");
const Potion = require("./models/potion");

app.get("/characters", async (_, res) => {
  const characters = await Character.find();
  console.log(characters);
  res.json(characters);
});

app.get("/character/:Name", async (req, res) => {
  const { Name } = req.params;
  const name = await Character.findOne({ Name: Name });
  if (!name) {
    const desestruturacao = Name.split(" ");
    const firstName = await Character.find({
      Name: { $regex: desestruturacao[0] },
    });
    let nomeEncontrado;
    firstName.forEach((item) => {
      const result = item.Name.match(
        new RegExp(desestruturacao[desestruturacao.length - 1])
      );
      if (result && item.Name === result.input) {
        nomeEncontrado = item;
      }
    });
    res.json(nomeEncontrado);
  } else {
    console.log(name);
    res.json(name);
  }
});

app.get("/houses/:House", async (req, res) => {
  try {
    const { House } = req.params;
    const houseResponse = await Character.find({ House: House });
    if (houseResponse.length === 0) {
      res.json({ status: "This house dont't exist" });
    }
    console.log(houseResponse);
    res.json(houseResponse);
  } catch (error) {
    res.send(error);
  }
});

app.get("/potions", async (_, res) => {
  const potions = await Potion.find();
  console.log(potions);
  res.json(potions);
});

app.get("/potion/:Name", async (req, res) => {
  try {
    const { Name } = req.params;
    const potions = await Potion.find({ Name: Name });
    if (potions.length === 0) {
      res.status(404).json({error: "Potion don't exist"})
    }else{
      console.log(potions);
      res.json(potions);
    }

  } catch (error) {
    console.log(error);
  }
});

app.get("/spells", async (_, res) => {
  const spells = await Spell.find();
  console.log(spells);
  res.json(spells);
});


app.get("/spell/:Incantation", async (req, res) => {
  try {
    const { Incantation } = req.params;
    const spells = await Spell.findOne({Incantation: Incantation });
    if (!spells) {
      res.status(404).json({error: "Spell don't exist"})
    }else{
      console.log(spells);
      res.json(spells);
    }

  } catch (error) {
    console.log(error);
  }
});

// app.get("/everything/:parameter", async(req,res)=>{
//   try {
//     const {parameter} = req.params;
//     const characterResponse = await Character.find({ $text: { $search: parameter}});
//     const potionResponse = await Potion.find({ $text: { $search: parameter}});
//     const spellResponse = await Spell.find({ $text: { $search: parameter}});
//     const general = [characterResponse,potionResponse,spellResponse];
//     res.json(general); 
//   } catch (error) {
//     console.log(error)
//   }

// })



app.listen(PORT, () => {
  console.log(`Conectado`);
});
