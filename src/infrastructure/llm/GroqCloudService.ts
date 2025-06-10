import {ILLMService} from "../../domain/ports/LLMService";
import axios from 'axios';
import dotenv from 'dotenv';
import {ChatMessage, GroqCloudRequestDTO} from "../DTO/GroqCloud/GroqCloudRequestDTO";
import {ChatCompletionResponse} from "../DTO/GroqCloud/GroqCloudResponseDTO";

dotenv.config();

export const baseModel = "meta-llama/llama-4-scout-17b-16e-instruct";
export const url = "https://api.groq.com/openai/v1/chat/completions";

export class GroqCloudService implements ILLMService {

    async postRequest(userContext: string, systemContext?: string, model: string = baseModel): Promise<string> {

        const messages: ChatMessage[] = [];

        if (systemContext) {
            messages.push({
                role: "system",
                content: systemContext
            });
        }

        messages.push({
            role: "user",
            content: userContext
        });

        const payload: GroqCloudRequestDTO = {
            messages,
            model
        };

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
                }
            });

            return this.parseResponse(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Axios error: ${error.response?.status} ${error.response?.data}`);
            } else {
                throw new Error(`Unexpected error: ${error}`);
            }
        }
    }

    private parseResponse(response: ChatCompletionResponse): string {
        try {
            return response.choices[0].message.content.trim();
        } catch (error) {
            throw error;
        }
    }
}
