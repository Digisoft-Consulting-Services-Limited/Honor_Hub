import { env } from "@/utils/env.config"
import { ensureValidToken } from "../../Auth/GuestUserAuth";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;
const PROGRAM_ENDPOINT =  `${BASE_URL}/${BASE_URL_VERSION}/honoreeProgram/honoreesProgramByHonoreeId`;

export interface Program {
  honoreeProgramId: number;
  honoreeId: number;
  partnerId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  createdBy: string;
  modifiedBy: string | null;
}


interface ProgramResponse {
  status: {
    code: string;
    message: string;
  };
  data: Program[];

  paging: {
    next: string | null;
    previous: string | null;
    count: number;
  };
}

export const getProgramList = async (honoreeId: number): Promise<ProgramResponse | null> => {
  try {
    const token = await ensureValidToken();
    if (!token) {
      throw new Error("Authentication failed: No valid token.");
    }
    const url = `${PROGRAM_ENDPOINT}?honoreeId=${honoreeId}`;


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

    const responseData: ProgramResponse = await response.json();
    // console.log("Programs fetched successfully:", responseData);
    return responseData;
    
  } catch (error) {
    console.error("Error fetching Programs:", error);
    return null;
  }
};