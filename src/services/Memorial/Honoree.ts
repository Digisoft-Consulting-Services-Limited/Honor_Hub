
import { apiFetch } from "../../lib/apiFetch";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const BASE_URL_VERSION = process.env.NEXT_PUBLIC_BASE_URL_VERSION
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

export const getHonoreeList = async (): Promise<HonoreeResponse | null> => {
    try {
        const response = await apiFetch(HONOREE_ENDPOINT, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: HonoreeResponse = await response.json();
        console.log("Honoree details fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Error fetching honoree details:", error);
        return null;
    }
};

