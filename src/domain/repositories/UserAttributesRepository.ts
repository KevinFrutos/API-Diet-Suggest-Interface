import {IUserAttributes} from "../models/UserAttributes";
import {Types} from "mongoose";

export interface IUserAttributesRepository {
    create(userAttributes: Partial<IUserAttributes>): Promise<IUserAttributes>;
    update(userAttributes: Partial<IUserAttributes>): Promise<IUserAttributes | null>;
    findByUserId(userId: Types.ObjectId): Promise<IUserAttributes | null>;
}
