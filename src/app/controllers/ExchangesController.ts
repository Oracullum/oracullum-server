import Exchange from "../models/Exchange";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ExchangeEnterprise from "../models/ExchangeEnterprise";

class ExchangesController{
    public async create(request: Request, response: Response){
        const { quantity, exchange_enterprise_id } = request.body;

        const exchangesRepository = getRepository(Exchange);
        const exchangeEnterprisesRepository = getRepository(ExchangeEnterprise);

        const verifyIfExchangeEnterpriseExists = await exchangeEnterprisesRepository.findOne({
            where: { id: exchange_enterprise_id }
        })
        if (!verifyIfExchangeEnterpriseExists){
            return response.status(403).json({ message : "This exchange enterprise does not exist." })
        }

        const createExchange = new Exchange();
        createExchange.quantity = quantity;
        createExchange.exchange_enterprise_id = exchange_enterprise_id;

        const exchange = await exchangesRepository.create(createExchange)
        await exchangesRepository.save(exchange);

        return response.status(201).json(exchange);
    }

    public async index(request: Request, response: Response){
        const exchangesRepository = getRepository(Exchange);
        const exchanges = await exchangesRepository.find({
            relations: ['exchange', 'historic_transactional'],
        });

        return response.status(201).json(exchanges)
    }

    public async show(request: Request, response: Response){
        const { id } = request.params

        const exchangesRepository = getRepository(Exchange);
        
        const exchange = await exchangesRepository.findOne({
            where: { id },
            relations: ['exchange', 'historic_transactional'],
        })
        
        if(!exchange){
            return response.status(401).json({ message:'This exchange does not exists!' })
        }
        
        return response.status(201).json(exchange)
    }
}

export default new ExchangesController();