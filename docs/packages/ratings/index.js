/* eslint-disable no-console */
const ApiBuilder = require('claudia-api-builder');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const api = new ApiBuilder();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function dbGet(request, id, page) {
  const params = {
    TableName: request.env.tableName,
    Key: {
      id,
      page,
    },
    ConsistentRead: true,
  };

  try {
    console.log('dbGet()', params);
    const response = await dynamoDb.get(params).promise();
    console.log({ response });
    return response.Item;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dbPut(request, id, item = {}) {
  const params = {
    TableName: request.env.tableName,
    Item: {
      id,
      page: request.body.page,
      rating: request.body.rating,
      comment: request.body.comment,
      dateTime: new Date().toString(),
    },
  };

  await Object.assign(params.Item, item);

  try {
    console.log('dbPut()', params);
    const response = await dynamoDb.put(params).promise();
    console.log({ response });
    return params.Item;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function dbQuery(request, id) {
  const params = {
    TableName: request.env.tableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
    ConsistentRead: true,
  };

  try {
    console.log('dbQuery()', params);
    const response = await dynamoDb.query(params).promise();
    console.log({ response });
    return response.Items;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateAverageRating(request, currentUserRating) {
  console.log('updateAverageRating()');

  const id = 'averageRating';
  const pageAverage = await dbGet(request, id, request.body.page);

  const average = (pageAverage && pageAverage.rating) || 0;
  let count = (pageAverage && pageAverage.count) || 0;

  let rating;
  if (currentUserRating !== null) {
    rating = (average * count - currentUserRating + request.body.rating) / count;
  } else {
    rating = (average * count + request.body.rating) / (count + 1);
    count += 1;
  }

  const newAverageRating = {
    rating,
    count,
    comment: undefined,
  };

  return dbPut(request, id, newAverageRating);
}

api.post(
  '/rating',
  async (request) => {
    console.log('post /rating', request.body);
    const id = request.body.id || uuid();

    let currentRating = null;
    if (request.body.id) {
      const userPage = await dbGet(request, id, request.body.page);
      console.log({ userPage });
      currentRating = userPage && userPage.rating;
    }

    try {
      const result = await dbPut(request, id);
      await updateAverageRating(request, currentRating);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  { success: 201 },
);

api.get('/rating/{id}', (request) => {
  console.log(`get /rating/${request.pathParams.id}`);
  return (async () => {
    const result = await dbQuery(request, request.pathParams.id);
    return result.reduce((acc, curr) => {
      const { rating, comment, count } = curr;
      acc[curr.page] = { rating, comment, count };
      return acc;
    }, {});
  })();
});

api.addPostDeployConfig('tableName', 'DynamoDB Table Name:', 'configure-db');

module.exports = api;
