import { env } from "@/utils/env.config"
import { ensureValidToken } from "../../Auth/GuestUserAuth";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;
const HYMNS_ENDPOINT =  `${BASE_URL}/${BASE_URL_VERSION}/honoreeSong/honoreesSongsByHonoreeId`;

export interface Hymn {
  honoreeSongId: number;
  honoreeId: number;
  partnerId: number;
  title: string;
  artist: string;
  lyrics: string;
  createdBy: string;
  modifiedBy: string | null;
  commands: null;
}


interface HymnResponse {
  status: {
    code: string;
    message: string;
  };
  data: Hymn[];

  paging: {
    next: string | null;
    previous: string | null;
    count: number;
  };
}

export const getHymnList = async (honoreeId: number): Promise<HymnResponse | null> => {
  try {
    const token = await ensureValidToken();
    if (!token) {
      throw new Error("Authentication failed: No valid token.");
    }
    const url = `${HYMNS_ENDPOINT}?honoreeId=${honoreeId}`;


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

    const responseData: HymnResponse = await response.json();
    // console.log("Hymns fetched successfully:", responseData);
    return responseData;
    
  } catch (error) {
    console.error("Error fetching hymns:", error);
    return null;
  }
};