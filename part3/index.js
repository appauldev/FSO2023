import express from "express";
import morgan from "morgan";
import cors from "cors";
import PHONEBOOK_DATA from "./data.js";
import crypto from "node:crypto";

const app = express();

app.use(express.static("frontend-build"));

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

app.get(`${BASE_URL}/persons`, (req, res) => {
  const response = {
    success: true,
    phonebook_data: pb_data,
  };
  res.json(response);
});

app.get(`${BASE_URL}/persons/:id`, (req, res) => {
  const id = req.params.id;

  const person = pb_data.find((person) => {
    return id === person.id;
  });

  if (person === undefined) {
    res.status(404).send({
      message: `Person with id '${id}' not found`,
    });
    return;
  }

  res.json(person);
});

app.post(`${BASE_URL}/persons/`, (req, res) => {
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
  const doesNameExist = pb_data.find((person) => {
    return person.name.toLowerCase() === new_person.name.toLowerCase();
  });
  if (doesNameExist !== undefined) {
    res.status(409).json({
      message: `The name '${new_person.name}' already exists`,
    });
    return;
  }
  // valid request
  const id = crypto.randomUUID().split("-")[1];
  const new_data = {
    id,
    ...new_person,
  };
  pb_data = [...pb_data, new_data];

  const response = {
    success: true,
    phonebook_data: pb_data,
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

app.get(`${BASE_URL}/info`, (req, res) => {
  const pb_info = `<p>Phonebook has info for ${pb_data.length} people</p>`;
  const current_date = `<p>${new Date().toUTCString()}</p>`;
  const response = `${pb_info}${current_date}`;
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
