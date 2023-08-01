import express from 'express';
import morgan from 'morgan';
import * as PersonService from './Services/PersonService.js';
import { errorHandler } from './Errors/ErrorHandler.js';

const app = express();
// logger
morgan.token('body', function getReqBody(req) {
  return JSON.stringify(req.body);
});

app.use(express.static('frontend-dist'));
app.use(express.json());
app.use(
  morgan(
    ':date[web]\n:method :url :status :res[content-length] - :response-time ms :body'
  )
);

const PORT = 33001;
const BASE_URL = '/api';

app.get(`${BASE_URL}/persons`, async (req, res, next) => {
  try {
    const data = await PersonService.getAll();
    const response = {
      success: true,
      phonebook_data: data,
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
});

app.get(`${BASE_URL}/persons/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await PersonService.getOne(id);
    // check for null
    if (person === null) {
      res.status(404).send({
        message: `Person with id '${id}' not found`,
      });
      return;
    }
    // retrieval successful
    res.json(person);
  } catch (err) {
    next(err);
  }
});

app.post(`${BASE_URL}/persons/`, async (req, res, next) => {
  try {
    const new_person = req.body;
    // validate request
    // name and number should exist in the request
    if (new_person.name === '' || new_person.number === '') {
      res.status(400).json({
        message:
          'Bad request. Please make sure that you have filled both name and number.',
      });
      return;
    }
    // valid request, add new person to phonebook
    const data = await PersonService.addOne(new_person);
    const response = {
      success: true,
      newlyAddedContact: data,
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
});

app.put(`${BASE_URL}/persons/:id`, async (req, res, next) => {
  const id = req.params.id;
  const updated_info = req.body;
  try {
    const response = await PersonService.updateOne(updated_info, id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

app.delete(`${BASE_URL}/persons/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await PersonService.deleteOne(id);
    // unable to delete person with the given id
    if (!data) {
      res.status(404).send({
        message: `Unable to delete. Person with id ${id} does not exist`,
      });
      return;
    }
    // successful deletion
    res.json({
      deleted: true,
    });
  } catch (err) {
    next(err);
  }
});

app.get(`${BASE_URL}/info`, async (req, res, next) => {
  try {
    const data = await PersonService.getAll();
    const pb_info = `<p>Phonebook has info for ${data.length} people</p>`;
    const current_date = `<p>${new Date().toUTCString()}</p>`;
    const response = `${pb_info}${current_date}`;
    res.send(response);
  } catch (err) {
    next(err);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
