import { Schema, model } from 'mongoose';

const userAttributesSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
        age: { type: Number, required: true, min: 0 },
        gender: { type: String, required: true, enum: ['male', 'female'] },
        weight: { type: Number, required: true, min: 0 },
        weightUnit: { type: String, required: true, enum: ['kg', 'lbs'] },
        height: { type: Number, required: true, min: 0 },
        heightUnit: { type: String, required: true, enum: ['cm', 'in'] },
        goals: { type: String, default: '' },
        allergies: [{ type: String}]
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
    });

export default model('UserAttributes', userAttributesSchema);
