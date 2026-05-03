import { apiFetch } from "../../../lib/apiFetch";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL_VERSION = process.env.NEXT_PUBLIC_BASE_URL_VERSION;
const PROGRAM_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/honoreeProgram/honoreesProgramByHonoreeId`;

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
    const url = `${PROGRAM_ENDPOINT}?honoreeId=${honoreeId}`;

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

    const data: ProgramResponse = await response.json();
    console.log("Programs fetched successfully:", data);
    return data;

  } catch (error) {
    console.error("Error fetching Programs:", error);
    return null;
  }
};