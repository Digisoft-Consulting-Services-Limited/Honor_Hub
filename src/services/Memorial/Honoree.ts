import { env } from "@/utils/env.config";
import { ensureValidToken } from "../Auth/GuestUserAuth";


const BASE_URL = env.BASE_URL
const BASE_URL_VERSION = env.BASE_URL_VERSION
const HONOREE_ENDPOINT =  `${BASE_URL}/${BASE_URL_VERSION}/honoree/honorees`;
interface Honoree {
    honoreeId: number;
    partnerId: number;
    title: string;
    fullName: string;
    dateOfBirth: string;
    dateOfPassing: string;
    profilePicture: string;
    biography: string;
    createdBy: string;
    modifiedBy: string | null;
    commands: null;
  }

  interface HonoreeResponse {
    pageIndex: number;
    pageSize: number;
    pageCollection: Honoree[];
    itemsCount: number;
  }

export const getHonoreeList = async ():Promise<HonoreeResponse | null> => {
    try {
        const token = await ensureValidToken();
        if (!token) {
            throw new Error("Authentication failed: No valid token.");
        }

        const response = await fetch(HONOREE_ENDPOINT, {  
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

        const data: HonoreeResponse = await response.json();
        // console.log("Honoree details fetched successfully:", data);
        return data;
        
    } catch (error) {
        console.error("Error fetching honoree details:", error);
        return null;
    }
};

