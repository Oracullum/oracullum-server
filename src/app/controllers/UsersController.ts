import User from "../models/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { hash } from 'bcryptjs';

class UsersController{
  public async create(request: Request, response: Response){
    const { name, email, password } = request.body;
    
    const usersRepository = getRepository(User)
    const password_hash = await hash(password, 8);
    const user = await usersRepository.create({ name, email, password_hash })

    await usersRepository.save(user);

    return response.status(201).json(user)
  }
}

export default new UsersController();