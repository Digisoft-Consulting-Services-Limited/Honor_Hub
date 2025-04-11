import { env } from "@/utils/env.config"
import { ensureValidToken } from "../../Auth/GuestUserAuth";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;
const TRIBUTE_CREATE_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/tribute/create`;

export interface TributeCreationPayload {
    honoreeId: number;
    partnerId: string;
    content: string;
    tributeBy: string;
    createdBy: string;
    modifiedBy: string | null;
}




export const createTributeList = async (payload:TributeCreationPayload ): Promise<boolean> => {
    try {
        const token = await ensureValidToken();
        if (!token) {
            throw new Error("Authentication failed: No valid token.");
        }


        const response = await fetch(TRIBUTE_CREATE_ENDPOINT, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Tribute creation failed:", errorData);
            return false;
        }

        console.log("Tributes created successfully");
        
        
        return true;


    } catch (error) {
        console.error("Error creating tributes:", error);
        return false;
    }
};