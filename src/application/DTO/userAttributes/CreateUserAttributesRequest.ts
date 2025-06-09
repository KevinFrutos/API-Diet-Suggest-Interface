import {Types} from "mongoose";
import {Gender, HeightUnit, WeightUnit} from "../../../domain/models/UserAttributes";

export interface CreateUserAttributesRequest {
    userId: Types.ObjectId;
    age: number;
    gender: Gender;
    weight: number;
    weightUnit: WeightUnit;
    height: number;
    heightUnit: HeightUnit;
    goals?: string;
    allergies: string[];
}
