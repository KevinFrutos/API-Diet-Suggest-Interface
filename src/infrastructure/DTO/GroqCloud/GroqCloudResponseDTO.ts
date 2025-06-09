export interface ChatMessage {
    role: string;
    content: string;
}

export interface Choice {
    index: number;
    message: ChatMessage;
    logprobs: any | null;
    finish_reason: string;
}

export interface Usage {
    queue_time: number;
    prompt_tokens: number;
    prompt_time: number;
    completion_tokens: number;
    completion_time: number;
    total_tokens: number;
    total_time: number;
}

export interface UsageBreakdown {
    models: any | null;
}

export interface XGroq {
    id: string;
}

export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
    usage_breakdown: UsageBreakdown;
    system_fingerprint: string;
    x_groq: XGroq;
}
