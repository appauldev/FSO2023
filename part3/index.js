import express from "express";
import morgan from "morgan";
import cors from "cors";
import PHONEBOOK_DATA from "./data.js";
import crypto from "node:crypto";
import * as PersonService from "./Service/PersonService.js";

const app = express();

app.use(express.static("frontend-dist"));

morgan.token("body", function getReqBody(req) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(
  morgan(
    ":date[web]\n:method :url :status :res[content-length] - :response-time ms :body"
  )
);
app.use(express.json());

const PORT = 33001;
const BASE_URL = "/api";

let pb_data = [...PHONEBOOK_DATA];

app.get(`${BASE_URL}/persons`, async (req, res) => {
  const data = await PersonService.getAll();
  if (data.error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
  const response = {
    success: true,
    phonebook_data: data,
  };
  res.json(response);
});

app.get(`${BASE_URL}/persons/:id`, async (req, res) => {
  const id = req.params.id;

  const person = await PersonService.getOne(id);

  if (person === null) {
    res.status(404).send({
      message: `Person with id '${id}' not found`,
    });
    return;
  }
  if (person.error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
  res.json(person);
});

app.post(`${BASE_URL}/persons/`, async (req, res) => {
  const new_person = req.body;
  // validate request
  // name and number should exist in the request
  if (new_person.name === "" || new_person.number === "") {
    res.status(400).json({
      message:
        "Bad request. Please make sure that you have filled both name AND number.",
    });
    return;
  }
  // dont accept duplicate names
  const doesNameExist = await PersonService.getOne(undefined, new_person.name);
  if (doesNameExist !== null) {
    res.status(409).json({
      message: `The name '${new_person.name}' already exists in the phonebook`,
    });
    return;
  }
  // valid request, add new person to phonebook
  const data = await PersonService.addOne(new_person);
  if (data.error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }

  const response = {
    success: true,
    newlyAddedContact: data,
  };
  res.json(response);
});

app.delete(`${BASE_URL}/persons/:id`, (req, res) => {
  const id = req.params.id;
  pb_data = pb_data.filter((note) => {
    return note.id !== id;
  });

  res.json({
    deleted: true,
  });
});

app.get(`${BASE_URL}/info`, async (req, res) => {
  const data = await PersonService.getAll();
  const pb_info = `<p>Phonebook has info for ${data.length} people</p>`;
  const current_date = `<p>${new Date().toUTCString()}</p>`;
  const response = `${pb_info}${current_date}`;
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
