import User from "../models/User";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class UsersController{
  public async create(request: Request, response: Response){
    const { name, email, password } = request.body;
    
    const usersRepository = getRepository(User)

    const user = await usersRepository.create({ name, email, password_hash: password })

    await usersRepository.save(user);

    return response.status(201).json(user)
  }
}

export default new UsersController();