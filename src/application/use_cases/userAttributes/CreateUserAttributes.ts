import {IUserAttributesRepository} from "../../../domain/repositories/UserAttributesRepository";
import {CreateUserAttributesRequest} from "../../DTO/userAttributes/CreateUserAttributesRequest";
import {IUserAttributes} from "../../../domain/models/UserAttributes";

export class CreateUserAttributes {

    constructor(private userAttributesRepository: IUserAttributesRepository) {}

    async execute(createUserAttributesRequest: CreateUserAttributesRequest): Promise<IUserAttributes> {
        return this.userAttributesRepository.create(createUserAttributesRequest);
    }
}
