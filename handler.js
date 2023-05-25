'use strict';

const DynamoDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamoDB.documentClient({region: 'us-east-1'});

module.exports.createNote = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  console.log({data})
  
  try {
    const params = {
      TableName: 'notes',
      Item: {
        notesId: data.id,
        title: data.title,
        body: data.body
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    }
console.log({params})
    await documentClient.put(params).promise();

    callback(null, {
      statusCode: 201,
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log({error})
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error.message),
      });
  }
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
