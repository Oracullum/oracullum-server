import User from "../models/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../config/auth'

class SessionsController{
  public async create(request: Request, response: Response){
    const { email, password } = request.body;
    
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({
      where: { email },
    })

    if(!user){
      return response.status(401).json({ message : 'E-Mail or Password incorrect!' })
    }
    
    const passwordMatched = await bcrypt.compare(password, user.password_hash);

    if(!passwordMatched) {
      return response.status(401).json({ message : 'E-Mail or Password incorrect!' })
    }

    const { expiresIn, secret } = authConfig;

    const token = sign(
      {}, secret, { subject: user.id, expiresIn },
    );

    return response.status(201).json({ user, token });
  }
}

export default new SessionsController();