import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Enterprise from "../models/Enterprise";

class EnterpriseController {
  public async create(request: Request, response: Response) {
    const { name } = request.body;
    const enterprisesRepository = getRepository(Enterprise);

    const verifyIfEnterpriseExists = await enterprisesRepository.findOne({
      where: { name },
    });

    if (verifyIfEnterpriseExists) {
      return response
        .status(401)
        .json({ message: "Enterprise with this name already exists!" });
    }

    const createEnterprise = new Enterprise();
    createEnterprise.name = name;

    const enterprise = await enterprisesRepository.create(createEnterprise);
    await enterprisesRepository.save(enterprise);

    return response.status(201).json(enterprise);
  }

  public async index(request: Request, response: Response) {
    const enterprisesRepository = getRepository(Enterprise);

    const enterprises = await enterprisesRepository.find({
      relations: ["exchangeEnterprise"],
    });

    return response.status(201).json(enterprises);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const enterprisesRepository = getRepository(Enterprise);

    const enterprise = await enterprisesRepository.findOne({
      where: { id },
      relations: ["exchangeEnterprise"],
    });

    if(!enterprise){
      return response.status(403).json({message: 'This enterprise does not exists'})
    }

    return response.status(201).json(enterprise);
  }
}

export default new EnterpriseController();
