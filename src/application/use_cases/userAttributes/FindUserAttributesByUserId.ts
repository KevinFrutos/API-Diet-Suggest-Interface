import {IUserAttributesRepository} from "../../../domain/repositories/UserAttributesRepository";
import {IUserAttributes} from "../../../domain/models/UserAttributes";
import {Types} from "mongoose";

export class FindUserAttributesByUserId {

    constructor(private userAttributesRepository: IUserAttributesRepository) {}

    async execute(userId: string): Promise<IUserAttributes | null> {
        if (Types.ObjectId.isValid(userId)) {
            const objectId = new Types.ObjectId(userId);
            return this.userAttributesRepository.findByUserId(objectId);
        }
        throw new Error('Invalid user');
    }
}
