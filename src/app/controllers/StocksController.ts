import Stock from "../models/Stock";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class StocksController{
  public async create(request: Request, response: Response){
    const { code } = request.body
    const stocksRepository = getRepository(Stock)

    const verifyIfStockExists = await stocksRepository.findOne({
      where: { code },
    })

    if(verifyIfStockExists){
      return response.status(401).json('Stock with code already exists!')
    }

    const stock = await stocksRepository.create(request.body)
    await stocksRepository.save(stock)

    return response.status(201).json(stock)

  }

  public async index(request: Request, response: Response){
    const stocksRepository = getRepository(Stock)

    const stocks = await stocksRepository.find({
      relations: ['exchanges']
    });

    return response.status(201).json(stocks)
  }

  public async show(request: Request, response: Response){
    const { id } = request.params

    const stocksRepository = getRepository(Stock)

    const stock = await stocksRepository.findOne({
      where: { id },
      relations: ['exchanges']
    })

    return response.status(201).json(stock)
  }
}

export default new StocksController();