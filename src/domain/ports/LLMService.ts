export interface ILLMService {
    postRequest(userContext: string, systemContext: string, model: string): Promise<string>;
}
