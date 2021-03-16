import { Db, MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

interface ConnectType {
  db: Db;
  client: MongoClient;
}

async function DbConnection(): Promise<ConnectType> {
  if(!client.isConnected()) await client.connect();

  const db = client.db("moveit");
  return {db, client};
}

export default DbConnection;