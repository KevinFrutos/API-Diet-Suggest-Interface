import UserAttributesModel from "./UserAttributesModel";
import {IUserAttributesRepository} from "../../../domain/repositories/UserAttributesRepository";
import {IUserAttributes} from "../../../domain/models/UserAttributes";
import {Types} from "mongoose";

export class UserAttributesRepositoryImpl implements IUserAttributesRepository {
    create(userAttributes: Partial<IUserAttributes>): Promise<IUserAttributes> {
        return UserAttributesModel.create(userAttributes);
    }

    update(userAttributes: Partial<IUserAttributes>): Promise<IUserAttributes | null> {
        if (!userAttributes.userId) {
            throw new Error('Note userId is required for update');
        }
        return UserAttributesModel.findOneAndUpdate(
            { userId: userAttributes.userId },
            { $set: userAttributes },
            { new: true }
        ).lean().exec();
    }

    findByUserId(userId: Types.ObjectId): Promise<IUserAttributes | null> {
        return UserAttributesModel.findOne({ userId }).lean().exec();
    }
}
