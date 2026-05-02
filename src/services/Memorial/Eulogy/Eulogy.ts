import { apiFetch } from "../../../lib/apiFetch";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL_VERSION = process.env.NEXT_PUBLIC_BASE_URL_VERSION;
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
    const url = `${EULOGY_ENDPOINT}?honoreeId=${honoreeId}`;

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

    const data: EulogyResponse = await response.json();
    console.log("Eulogy data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching eulogy data:", error);
    return null;
  }
};