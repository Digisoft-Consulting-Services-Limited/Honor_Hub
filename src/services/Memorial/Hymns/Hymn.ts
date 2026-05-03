import { apiFetch } from "../../../lib/apiFetch";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL_VERSION = process.env.NEXT_PUBLIC_BASE_URL_VERSION;
const HYMNS_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/honoreeSong/honoreesSongsByHonoreeId`;

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
    const url = `${HYMNS_ENDPOINT}?honoreeId=${honoreeId}`;

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

    const data: HymnResponse = await response.json();
    console.log("Hymns fetched successfully:", data);
    return data;

  } catch (error) {
    console.error("Error fetching hymns:", error);
    return null;
  }
};