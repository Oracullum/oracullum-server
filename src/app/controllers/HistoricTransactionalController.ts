import Exchange from "../models/Exchange";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Stock from "../models/Stock";
import HistoricTransactional from "../models/HistoricTransactional";

class HistoricTransactionalController{
    public async create(request: Request, response: Response){
        const { date, operation, price, quantity, exchange_id } = request.body;

        const stocksRepository = getRepository(Stock);
        const historicTransactionalsRepository = getRepository(HistoricTransactional)
        const exchangesRepository = getRepository(Exchange)

        const verifyIfStockExists = await stocksRepository.findOne({
            where: { exchange_id: exchange_id }
        })

        const exchange = await exchangesRepository.findOne({
            where: { id: exchange_id }
        })

        if(operation !== "buy" && operation !== "sell"){
            return response.status(403).json({ message : "You need to set an operation 'buy' or 'sell'" })
        }

        if (!verifyIfStockExists || (verifyIfStockExists.user_id !== request.user.id) || !exchange){
            return response.status(403).json({ message : "This exchange does not exist." })
        }

        const createHistoricTransactional = new HistoricTransactional();
        createHistoricTransactional.date = date;
        createHistoricTransactional.operation = operation;
        createHistoricTransactional.price = price;
        createHistoricTransactional.quantity = quantity;
        createHistoricTransactional.exchange_id = exchange_id;

        if(operation === "buy") {
            const historicTransactional = await historicTransactionalsRepository.create(createHistoricTransactional)
            await historicTransactionalsRepository.save(historicTransactional);
            exchange.quantity = Number(exchange.quantity) + quantity as number;
            await exchangesRepository.save(exchange)
            return response.status(201).json(historicTransactional);
        }

        else if(operation === "sell") {
            if(quantity > exchange.quantity){
                return response.status(403).json({ message : "Your quantity is bigger then your exchanges" })
            }

            const historicTransactional = await historicTransactionalsRepository.create(createHistoricTransactional)
            await historicTransactionalsRepository.save(historicTransactional);
            exchange.quantity = Number(exchange.quantity) - quantity as number;
            await exchangesRepository.save(exchange)
            return response.status(201).json(historicTransactional);

        }
    }

    public async index(request: Request, response: Response){
        const historicTransactionalsRepository = getRepository(HistoricTransactional);
        const historicTransactionals = await historicTransactionalsRepository.find({
            relations: ['exchange'],
        });

        return response.status(201).json(historicTransactionals)
    }

    public async show(request: Request, response: Response){
        const { id } = request.params

        const historicTransactionalsRepository = getRepository(HistoricTransactional);
        
        const historicTransactional = await historicTransactionalsRepository.findOne({
            where: { id },
            relations: ['exchange'],
        })
        
        if(!historicTransactional){
            return response.status(401).json({ message:'This historic transactonal does not exists!' })
        }
        
        return response.status(201).json(historicTransactional)
    }
}

export default new HistoricTransactionalController();