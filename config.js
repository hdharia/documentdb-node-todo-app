var config = {}

config.host = process.env.HOST;
config.authKey = process.env.AUTH_KEY;
config.databaseId = process.env.CONTAINER_ID;
config.collectionId = "Items";

module.exports = config;
