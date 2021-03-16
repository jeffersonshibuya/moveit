import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import Providers from 'next-auth/providers'
import DbConnection from '../../../utils/database'

import Adapters from "next-auth/adapters"

import Models from "../../../models"

const providers = [
  // Providers.GitHub({
  //     clientId: process.env.GITHUB_CLIENT_ID,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
  // }),
  // Providers.Facebook({
  //   clientId: process.env.FACEBOOK_CLIENT_ID,
  //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  // }),
  // Providers.Google({
  //   clientId: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // }),
  Providers.Auth0({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN
  })
]

const callbacks = {
  async signIn(user, account, profile) {
    const { db } = await DbConnection();

    const userExists = await db.collection('users').findOne({auth_id: user.id})
    if(!userExists) {
      await db.collection('users').insertOne({
        auth_id: user.id,
        name: user.name, 
        email: user.email, 
        image: user.image, 
        level: 1,
        currentExperience: 0,
        challengesCompleted: 0,
      });
    } 
    return true
  },
  async redirect(url, baseUrl) {
    return baseUrl
  },
  async session(session, user) {  
    const { db } = await DbConnection();
    const dbUser = await db.collection('users').findOne({auth_id: user.sub})
    return dbUser
    return {session, user}
  },
  async jwt(token, user, account, profile, isNewUser) {
    return token
  }
}


const options = {
  providers,
  session: {
    jwt: true
  },
  pages: {
    signIn: '/auth/signin',
    newUser: null
  },
  // adapter: Adapters.TypeORM.Adapter(
  //   {
  //     type: 'postgres',
  //     synchronize: true,
  //     username: 'postgres',
  //     password: 'docker',
  //     database: 'moveit',
  //     port: 5432,
  //   },
  //   {
  //     models: {
  //       User: Models.User,
  //     }
  //   }
  // ),
  jwt: {
    secret: process.env.JWT_SECRET
  },
  callbacks
  // database: 'postgres://postgres:docker@127.0.0.1:5432/moveit?synchronize=true'
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)