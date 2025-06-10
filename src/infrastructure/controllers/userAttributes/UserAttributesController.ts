import {AuthenticatedRequest} from "../../http/middlewares/authenticate";
import {Response} from "express";
import {UserAttributesRepositoryImpl} from "../../db/userAttributes/UserAttributesRepositoryImpl";
import {CreateUserAttributes} from "../../../application/use_cases/userAttributes/CreateUserAttributes";
import {UpdateUserAttributes} from "../../../application/use_cases/userAttributes/UpdateUserAttributes";
import {FindUserAttributesByUserId} from "../../../application/use_cases/userAttributes/FindUserAttributesByUserId";
import {Types} from "mongoose";
import Sentry from "../../logging/sentry";

const userAttributesRepository = new UserAttributesRepositoryImpl()

export const createUserAttributes = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;
    const { age, gender, weight, weightUnit, height, heightUnit, goals, allergies } = req.body;
    const useCase = new CreateUserAttributes(userAttributesRepository);
    try {
        const objectUserId = new Types.ObjectId(userId);
        const userAttributes = await useCase.execute({userId: objectUserId, age, gender, weight, weightUnit, height, heightUnit, goals, allergies});
        res.status(201).json({ userAttributes });
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
};

export const updateUserAttributes = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;
    const { age, gender, weight, weightUnit, height, heightUnit, goals, allergies } = req.body;
    const useCase = new UpdateUserAttributes(userAttributesRepository);
    try {
        const objectUserId = new Types.ObjectId(userId);
        const userAttributes = await useCase.execute({userId: objectUserId, age, gender, weight, weightUnit, height, heightUnit, goals, allergies});
        res.status(200).json({ userAttributes });
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
};

export const findUserAttributesByUserId = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;
    const useCase = new FindUserAttributesByUserId(userAttributesRepository);
    try {
        const userAttributes = await useCase.execute(userId);
        res.status(200).json({ userAttributes });
    } catch (error) {
        Sentry.captureException(error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
};
