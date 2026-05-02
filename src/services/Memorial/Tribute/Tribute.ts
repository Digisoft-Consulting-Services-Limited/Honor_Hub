import { apiFetch } from "../../../lib/apiFetch";

const BASE_URL = process.env.BASE_URL;
const BASE_URL_VERSION = process.env.BASE_URL_VERSION;
const TRIBUTE_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/tribute/tributesByHonoreeId`;

export interface Tribute {
  tributeId: number;
  honoreeId: number;
  partnerId: number;
  content: string;
  tributeBy: string;
  createdBy: string;
  createdAt: Date;
  modifiedBy?: string | null;
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
    const url = `${TRIBUTE_ENDPOINT}?honoreeId=${honoreeId}`;

    const response = await apiFetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: TributeResponse = await response.json();
    console.log("Tributes fetched successfully:", data);
    return data;

  } catch (error) {
    console.error("Error fetching tributes:", error);
    return null;
  }
};