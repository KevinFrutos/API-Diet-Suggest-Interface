import {Types} from "mongoose";

export type Gender = 'male' | 'female';

export type WeightUnit = 'kg' | 'lbs';

export type HeightUnit = 'cm' | 'in';

export interface IUserAttributes {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    age: number;
    gender: Gender;
    weight: number;
    weightUnit: WeightUnit;
    height: number;
    heightUnit: HeightUnit;
    goals?: string;
    allergies: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
