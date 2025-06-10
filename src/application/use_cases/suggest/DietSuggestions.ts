import {GroqCloudService} from "../../../infrastructure/llm/GroqCloudService";
import {Types} from "mongoose";
import {IUserAttributesRepository} from "../../../domain/repositories/UserAttributesRepository";
import {IUserAttributes} from "../../../domain/models/UserAttributes";

export class DietSuggestions {
    private systemContext = `
        You are a certified nutritionist and dietitian assistant.
        You are helping users create healthy, balanced daily diet plans.
        You MUST respect the user's allergies and dietary restrictions.
        You MUST avoid including any ingredients the user cannot consume.
        You should also consider the user's goals (such as weight loss, muscle gain, etc.) and adjust portion sizes accordingly.
        Provide clear and practical meal suggestions.
        For each meal, provide the following details:
            - **Meal Name**  
            - **Ingredients list (with quantities)**  
            - **Preparation instructions (step by step)**  
            - **Estimated preparation time**  
            - **Portion size / suggested serving**  
            - **Nutritional information (kcal, protein, carbohidrates, fat...)**
            - **Nutritional notes**  
        Provide your answer in the following format:
        
        ### BREAKFAST

        **Meal Name:** X
        
        **Ingredients:**  
        - Item  
        - Item 
        - ... 
        
        **Instructions:**  
        1. Step 1  
        2. Step 2  
        3. ...
        
        **Preparation time:** X min  
        
        **Portion size:** ...
        
        **Nutritional information:** ...
        
        **Nutritional notes:** ...
        
        ### SNACK:
        [Repeat same structure as above]
        
        ### LUNCH:
        [Repeat same structure as above]
        
        ### SNACK:
        [Repeat same structure as above]
        
        ### DINNER:
        [Repeat same structure as above]
        
        DO NOT add any explanations or introductions before or after the diet plan.
        DO NOT suggest any ingredients that the user cannot consume (allergies, restrictions).
    `;

    constructor(
        private groqCloudService: GroqCloudService,
        private userAttributesRepository: IUserAttributesRepository
    ) {}

    async execute(userContext: string, userId: string) {
        if (Types.ObjectId.isValid(userId)) {
            const objectUserId = new Types.ObjectId(userId);
            const userParams = await this.userAttributesRepository.findByUserId(objectUserId);
            const userContextParsed = this.parseUserContext(userContext, userParams)

            return await this.groqCloudService.postRequest(userContextParsed, this.systemContext);
        }
        throw new Error('Invalid user');
    }

    private parseUserContext(userContext: string, userParams: IUserAttributes | null): string {

        let userParamsParsed = '';
        if (userParams !== null) {
            userParamsParsed = `
                USER PROFILE:
                Age: ${userParams.age}
                Gender: ${userParams.gender}
                Weight: ${userParams.weight} ${userParams.weightUnit}
                Height: ${userParams.height} ${userParams.heightUnit}
                Goals: ${userParams.goals}
                Allergies: ${userParams.allergies.length > 0 ? userParams.allergies.join(', ') : 'None'}
            `;
        }

        return `
            ${userContext}
            
            ${userParamsParsed}
            
            Please provide a personalized DAILY DIET PLAN for this user.
            Remember to avoid the allergens and adjust the plan for the user's goals.
        `;
    }
}
