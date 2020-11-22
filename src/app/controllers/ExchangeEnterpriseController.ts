import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ExchangeEnterprise from "../models/ExchangeEnterprise";

class ExchangeEnterprisesController {
  public async create(request: Request, response: Response) {
    const { name, enterprise_id } = request.body;
    const exchangeEnterprisesRepository = getRepository(ExchangeEnterprise);

    const verifyIfEnterpriseExists = await exchangeEnterprisesRepository.findOne({
      where: { name, enterprise_id },
    });

    if (verifyIfEnterpriseExists) {
      return response
        .status(401)
        .json({ message: "this Exchange Enterprise already exists!" });
    }

    const createExchangeEnterprise = new ExchangeEnterprise();
    createExchangeEnterprise.name = name;
    createExchangeEnterprise.enterprise_id = enterprise_id;

    const exchangeEnterprise = await exchangeEnterprisesRepository.create(createExchangeEnterprise);
    await exchangeEnterprisesRepository.save(exchangeEnterprise);

    return response.status(201).json(exchangeEnterprise);
  }

  public async index(request: Request, response: Response) {
    const exchangeEnterprisesRepository = getRepository(ExchangeEnterprise);

    const enterprises = await exchangeEnterprisesRepository.find();

    return response.status(201).json(enterprises);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const exchangeEnterprisesRepository = getRepository(ExchangeEnterprise);

    const enterprise = await exchangeEnterprisesRepository.findOne({
      where: { id },
      relations: ["enterprise"],
    });

    if(!enterprise){
      return response.status(403).json({message: 'This enterprise does not exists'})
    }

    return response.status(201).json(enterprise);
  }
}

export default new ExchangeEnterprisesController();
