import {Response} from "express";
import {AuthenticatedRequest} from "../../http/middlewares/authenticate";
import {GroqCloudService} from "../../llm/GroqCloudService";
import {DietSuggestions} from "../../../application/use_cases/suggest/DietSuggestions";
import {UserAttributesRepositoryImpl} from "../../db/userAttributes/UserAttributesRepositoryImpl";

const groqCloudService = new GroqCloudService();
const userAttributesRepository = new UserAttributesRepositoryImpl();

export const suggestDiet = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;
    const { text } = req.body;
    const useCase = new DietSuggestions(groqCloudService, userAttributesRepository);
    try {
        const suggest = await useCase.execute(text, userId);
        res.status(200).json({ suggest });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unexpected error occurred' });
        }
    }
};
