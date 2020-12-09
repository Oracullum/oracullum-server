import Stock from "../models/Stock";
import Exchange from "../models/Exchange";
import ExchangeEnterprise from "../models/ExchangeEnterprise";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class StocksController {
  public async create(request: Request, response: Response) {
    const { code, exchange_enterprise_id } = request.body;

    const stocksRepository = getRepository(Stock);
    const exchangesRepository = getRepository(Exchange);
    const exchangeEnterprisesRepository = getRepository(ExchangeEnterprise);

    const verifyIfStockExists = await stocksRepository.findOne({
      where: { code },
    });

    if (verifyIfStockExists) {
      return response.status(401).json({ message: "Stock with code already exists!" });
    }

    const verifyIfExchangeEnterpriseExists = await exchangeEnterprisesRepository.findOne({
      where: { id: exchange_enterprise_id }
    })

    if (!verifyIfExchangeEnterpriseExists){
      return response.status(403).json({ message : "This exchange enterprise does not exist." })
    }

    const createExchange = new Exchange();
    createExchange.quantity = 0;
    createExchange.exchange_enterprise_id = exchange_enterprise_id;

    const exchange = await exchangesRepository.create(createExchange)
    await exchangesRepository.save(exchange);


    const createStock = new Stock();
    createStock.code = code;
    createStock.exchange_id = exchange.id;
    createStock.user_id = request.user.id;

    const stock = await stocksRepository.create(createStock);
    await stocksRepository.save(stock);

    return response.status(201).json(stock);
  }

  public async index(request: Request, response: Response) {
    const stocksRepository = getRepository(Stock);

    const stocks = await stocksRepository.find({
      relations: ["exchanges", "exchanges.exchange", "exchanges.exchange.enterprise", "exchanges.historic_transactional"],
      where: {user_id: request.user.id},
    });

    return response.status(201).json(stocks);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const stocksRepository = getRepository(Stock);

    const stock = await stocksRepository.findOne({
      where: { id },
      relations: ["exchanges", "exchanges.exchange", "exchanges.exchange.enterprise", "exchanges.historic_transactional"],
    });

    if(!stock || stock?.user_id !== request.user.id){
      return response.status(403).json({message: 'This stock does not exists'})
    }

    return response.status(201).json(stock);
  }
}

export default new StocksController();
