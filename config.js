var config = {}

config.host = process.env.HOST || "https://hd-cosmo-db.documents.azure.us:443/";
config.authKey = process.env.AUTH_KEY || "vPPuAAriMrL0rXQTUOLlpNTmkJhtIzt6zYKLTdTFrhFwhGMJ58qassh0mGsXHVH13nEIGRcGEilIAuLHlQ7Z3w==";
config.databaseId = process.env.CONTAINER_ID || "ToDoList_local";
config.collectionId = "Items";

module.exports = config;
