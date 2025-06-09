export interface ChatMessage {
    role: string;
    content: string;
}

export interface GroqCloudRequestDTO {
    messages: ChatMessage[];
    model: string;
}
