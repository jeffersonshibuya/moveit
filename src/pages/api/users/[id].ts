import { NextApiRequest, NextApiResponse } from 'next'
import DbConnection from '../../../utils/database'

export default async(req: NextApiRequest, res: NextApiResponse):Promise<void> => {
  const { id } = req.query
  const { db } = await DbConnection();
  // const response = await db.collection('users').find({}).toArray()

  // console.log(response)

  const response = {id}
  return res.status(200).json(response)
}