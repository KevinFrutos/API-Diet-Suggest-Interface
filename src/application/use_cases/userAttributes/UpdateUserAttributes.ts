import {IUserAttributesRepository} from "../../../domain/repositories/UserAttributesRepository";
import {IUserAttributes} from "../../../domain/models/UserAttributes";
import {UpdateUserAttributesRequest} from "../../DTO/userAttributes/UpdateUserAttributesRequest";

export class UpdateUserAttributes {

    constructor(private userAttributesRepository: IUserAttributesRepository) {}

    async execute(updateUserAttributesRequest: UpdateUserAttributesRequest): Promise<IUserAttributes | null> {
        return this.userAttributesRepository.update(updateUserAttributesRequest);
    }
}
