import { apiFetch } from "../../../lib/apiFetch";

const BASE_URL = process.env.BASE_URL;
const BASE_URL_VERSION = process.env.BASE_URL_VERSION;
const TRIBUTE_CREATE_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/tribute/create`;

export interface TributeCreationPayload {
  honoreeId: number;
  partnerId: string;
  content: string;
  tributeBy: string;
  createdBy: string;
  modifiedBy: string | null;
}

export const createTributeList = async (payload: TributeCreationPayload): Promise<boolean> => {
  try {
    const response = await apiFetch(TRIBUTE_CREATE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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