'use strict';

module.exports.createNote = async (event) => {
  return {
    statusCode: 201,
    body: JSON.stringify('A new note created!'),
  };
};

module.exports.updateNote = async (event) => {
  const noteId = event.pathParameters.id

  return {
    statusCode: 200,
    body: JSON.stringify(`Note ${noteId} updated!`),
  };
};

module.exports.deleteNote = async (event) => {
  const noteId = event.pathParameters.id

  return {
    statusCode: 200,
    body: JSON.stringify(`Note ${noteId} deleted!`),
  };
};

module.exports.getAllNotes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify('All notes returned!'),
  };
};
