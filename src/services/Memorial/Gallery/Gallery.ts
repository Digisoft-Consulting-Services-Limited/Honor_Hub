import { env } from "@/utils/env.config";
import { ensureValidToken } from "../../Auth/GuestUserAuth";

const BASE_URL = env.BASE_URL;
const BASE_URL_VERSION = env.BASE_URL_VERSION;
const PHOTO_ALBUM_ENDPOINT = `${BASE_URL}/${BASE_URL_VERSION}/photoAlbum`;

export interface PhotoAlbumDetail {
  photoAlbumId: string | number;
  honoreeId?: number;
  partnerId?: number;
  title?: string;
  url?: string;
  sequence?: number;
  createdBy?: string;
  modifiedBy?: string | null;
  commands?: null;
}

export interface PhotoAlbumResponse {
  status: {
    code: string;
    message: string;
  };
  data: PhotoAlbumDetail[];
  paging: {
    next: string | null;
    previous: string | null;
    count: number;
  };
}

// Fetch photo albums by honoree ID using paginated endpoint
// Endpoint: GET /v1/photoAlbum/photoAlbums?searchTerm=honoreeId:{id}&offset=0&pageSize=100
export const getPhotoAlbumList = async (
  honoreeId: number,
  pageSize: number = 100,
  offset: number = 0
): Promise<PhotoAlbumResponse | null> => {
  try {
    const token = await ensureValidToken();
    if (!token) {
      throw new Error("Authentication failed: No valid token.");
    }

    // Use searchTerm with honoreeId filter
    const searchTerm = `honoreeId:${honoreeId}`;
    const url = `${PHOTO_ALBUM_ENDPOINT}/photoAlbums?searchTerm=${encodeURIComponent(
      searchTerm
    )}&offset=${offset}&pageSize=${pageSize}`;

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

    const responseData: PhotoAlbumResponse = await response.json();
    
    // Sort by sequence if available
    if (responseData?.data) {
      responseData.data.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching photo album list:", error);
    return null;
  }
};

// Alternative: Fetch all photos for an honoree with pagination handling
export const getAllPhotoAlbumsForHonoree = async (
  honoreeId: number
): Promise<PhotoAlbumDetail[]> => {
  try {
    const allPhotos: PhotoAlbumDetail[] = [];
    let offset = 0;
    const pageSize = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await getPhotoAlbumList(honoreeId, pageSize, offset);

      if (!response || !response.data) {
        break;
      }

      allPhotos.push(...response.data);

      // Check if there are more pages
      if (response.paging?.next) {
        offset += pageSize;
      } else {
        hasMore = false;
      }
    }

    return allPhotos;
  } catch (error) {
    console.error("Error fetching all photo albums:", error);
    return [];
  }
};

export const createPhotoAlbum = async (
  photoData: {
    honoreeId: number;
    partnerId: number;
    title: string;
    url: string;
    createdBy: string;
    modifiedBy?: string;
  }
): Promise<PhotoAlbumResponse | null> => {
  try {
    const token = await ensureValidToken();
    if (!token) {
      throw new Error("Authentication failed: No valid token.");
    }

    const url = `${PHOTO_ALBUM_ENDPOINT}/create`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(photoData),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData: PhotoAlbumResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating photo album:", error);
    return null;
  }
};