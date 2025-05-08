import { env } from "@/utils/env.config";
import { ensureValidToken } from "../../Auth/GuestUserAuth";




const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;
const EULOGY_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/eulogy/eulogyByHonoreeId`;

export interface Eulogy {
  eulogyId: number;
  honoreeId: number;
  partnerId: number;
  title: string;
  content: string;
  sequence: number;
  createdBy: string;
  modifiedBy: string | null;
  commands: null;
}

export interface EulogyResponse {
  status: {
    code: string;
    message: string;
  };
  data: Eulogy[];
  paging: {
    next: string | null;
    previous: string | null;
    count: number;
  };
}

export const getEulogyList = async (
  honoreeId: number
): Promise<EulogyResponse | null> => {
  try {
    const token = await ensureValidToken();
    if (!token) {
      throw new Error("Authentication failed: No valid token.");
    }

    const url = `${EULOGY_ENDPOINT}?honoreeId=${honoreeId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData: EulogyResponse = await response.json();
    // console.log("Eulogy data fetched successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching eulogy data:", error);
    return null;
  }
};

