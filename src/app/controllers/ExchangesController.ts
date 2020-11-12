import Exchange from "app/models/Exchange";
import Stock from "app/models/Stock";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class ExchangesController{
    public async create(request: Request, response: Response){
        const { date, operation, price, quantity, stock_id } = request.body;

        const exchangesRepository = getRepository(Exchange);
        const stockRepository = getRepository(Stock);

        const verifyIfStockExists = await stockRepository.findOne({
            where: { stock_id }
        })

        if (!verifyIfStockExists){
            return response.status(403).json("This stock does not exist.")
        }
        const exchange = await exchangesRepository.create({ date, operation, price, quantity, stock_id })

        await exchangesRepository.save(exchange);

        return response.status(201).json(exchange);
    }

    public async index(request: Request, response: Response){
        const exchangesRepository = getRepository(Exchange);

        const exchanges = exchangesRepository.find({
            relations: ['stocks'],
        }
        );

        return response.status(201).json(exchanges)
    }

    public async show(request: Request, response: Response){
        const { id } = request.params

        const exchangesRepository = getRepository(Exchange);

        const exchange = await exchangesRepository.findOne({
            where: { id },
            relations: ['stocks'],
        })

        return response.status(201).json(exchange)
    }
}

export default new ExchangesController();