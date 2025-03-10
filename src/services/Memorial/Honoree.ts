// import { env } from "@/utils/env.config";
// // import  {ensureValidToken}  from "../Auth/Auth"; // Adjust the path accordingly


// const BASE_URL = env.BASE_URL
// const BASE_URL_VERSION = env.BASE_URL_VERSION
// const HONOREE_DETAILS = (id: string | number) => `${BASE_URL}/${BASE_URL_VERSION}/honoree/${id}`;

// interface HonoreeId {
//     honoreeId: string | number;
// }

// export const getHonoreeDetails = async ({ honoreeId }: HonoreeId) => {
//     try {
//         const token = await ensureValidToken(env.APP_SECRET);
//         if (!token) {
//             throw new Error("Authentication failed: No valid token.");
//         }

//         const response = await fetch(HONOREE_DETAILS(honoreeId), {  
//             method: "GET",
//             headers: {  
//                 "Accept": "application/json",  
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`API request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Honoree details fetched successfully:", data);
//         return data;
        
//     } catch (error) {
//         console.error("Error fetching honoree details:", error);
//         return null;
//     }
// };

// // Call function properly
// (async () => {
//     const data = await getHonoreeDetails({ honoreeId: "31613095699283970" });
//     console.log(data);
// })();
