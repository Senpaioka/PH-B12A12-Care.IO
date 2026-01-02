
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const db_name = process.env.DB_NAME;


const collections = {
    USERS: 'users',
    PROFESSIONALS: 'caregivers',
}


// db_name.collection(PROFESSIONALS).createIndex({ email: 1 }, { unique: true });

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const dbConnect = (collection) => {
    return client.db(db_name).collection(collection);
}

export {collections, dbConnect};