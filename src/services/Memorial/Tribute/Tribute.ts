import { env } from "@/utils/env.config"
import { ensureValidToken } from "../../Auth/GuestUserAuth";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;
const TRIBUTE_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/tribute/tributesByHonoreeId`;

export interface Tribute {
    tributeId: number;
    honoreeId: number;
    partnerId: number;
    content: string;
    tributeBy: string;
    createdBy: string;
    modifiedBy: string | null;
    commands: string;

}


export interface TributeResponse {
    status: {
        code: string;
        message: string;
    };
    data: Tribute[];

    paging: {
        next: string | null;
        previous: string | null;
        count: number;
    };
}

export const getTributeList = async (honoreeId: number): Promise<TributeResponse | null> => {
    try {
        const token = await ensureValidToken();
        if (!token) {
            throw new Error("Authentication failed: No valid token.");
        }
        const url = `${TRIBUTE_ENDPOINT}?honoreeId=${honoreeId}`;


        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData: TributeResponse = await response.json();
        // console.log("Tributes fetched successfully:", responseData);
        
        
        return responseData;


    } catch (error) {
        console.error("Error fetching tributes:", error);
        return null;
    }
};