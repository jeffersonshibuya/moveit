import { NextApiRequest, NextApiResponse } from 'next'
import DbConnection from '../../../utils/database'
import { ObjectId } from 'mongodb'

export default async(req: NextApiRequest, res: NextApiResponse):Promise<void> => {
  if(req.method === 'POST') {
    const { name, email } = req.body
    
    if(!name || !email) {
      return res.status(400).json({error: 'Missing body field'})
    }

    const { db } = await DbConnection();
    const emailExists = await db.collection('users').findOne({email: email})
    if(emailExists) {
      return res.status(200).json({error: 'E-mail already registered!'})
    }

    const response = await db.collection('users').insertOne({
      name, email
    });

    return res.status(200).json(response.ops[0])
  } else if(req.method === 'GET') {
    const { db } = await DbConnection();
    // const response = await db.collection('users').find({}).toArray()
    const response = await db.collection('users').find({}).sort({"level": -1, "currentExperience": -1}).limit(10).toArray()

    return res.status(200).json(response)
  } else if(req.method === 'PUT') {
    const { id, level, currentExperience, challengesCompleted} = req.body;
    
    const filter = { _id: new ObjectId(id) }
    const updateDoc = {$set: { level, currentExperience, challengesCompleted }}
    
    const { db } = await DbConnection();

    await db.collection('users').updateOne(filter, updateDoc)
    return res.status(200).json({message: 'User updated'})
  }
  
  
}