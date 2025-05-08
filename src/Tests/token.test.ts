// // Create a test file to verify AuthManager functionality

// // Import your AuthManager
// import { authManager } from '@/services/Auth/Netlify-Auth'; // Adjust the import path as necessary

// // Mock global fetch
// const mockTokenResponse = {
//   accessToken: 'mock-access-token',
//   refreshToken: 'mock-refresh-token',
//   expiresIn: 3600 // 1 hour
// };

// // Helper to simulate responses
// function setupFetchMock(responseData, status = 200) {
//   global.fetch = jest.fn().mockImplementation(() =>
//     Promise.resolve({
//       ok: status >= 200 && status < 300,
//       status,
//       json: () => Promise.resolve(responseData)
//     })
//   );
// }

// describe('AuthManager Tests', () => {
//   beforeEach(() => {
//     // Reset mocks and global state
//     jest.resetAllMocks();
//     global.window = {
//       __NETLIFY_ACCESS_TOKEN__: null,
//       __NETLIFY_TOKEN_EXPIRY__: null
//     };
//     setupFetchMock(mockTokenResponse);
//   });

//   test('getAccessToken should fetch a new token when none exists', async () => {
//     const token = await authManager.getAccessToken();
    
//     expect(token).toBe('mock-access-token');
//     expect(global.fetch).toHaveBeenCalledWith('/.netlify/functions/auth-proxy', {
//       method: 'POST',
//       headers: { 'Accept': 'application/json' }
//     });
//   });

//   test('getAccessToken should return existing token if not expired', async () => {
//     // First call to set the token
//     await authManager.getAccessToken();
    
//     // Reset the mock to verify it's not called again
//     jest.resetAllMocks();
    
//     const token = await authManager.getAccessToken();
    
//     expect(token).toBe('mock-access-token');
//     expect(global.fetch).not.toHaveBeenCalled();
//   });

//   test('getAccessToken should refresh token when expired', async () => {
//     // First call to set the token
//     await authManager.getAccessToken();
    
//     // Manipulate token expiry to simulate expiration
//     // @ts-ignore (accessing private property for testing)
//     authManager.tokenExpiry = Date.now() - 1000; 
    
//     // Setup mock for refresh response
//     const refreshResponse = {
//       accessToken: 'new-access-token',
//       refreshToken: 'new-refresh-token',
//       expiresIn: 3600
//     };
//     setupFetchMock(refreshResponse);
    
//     const token = await authManager.getAccessToken();
    
//     expect(token).toBe('new-access-token');
//     expect(global.fetch).toHaveBeenCalledWith('/.netlify/functions/refresh', 
//       expect.objectContaining({
//         method: 'POST',
//         headers: expect.objectContaining({
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         })
//       })
//     );
//   });

//   test('setupAutoRefreshAndFetchOverride should override fetch to include token', async () => {
//     // First get a token
//     await authManager.getAccessToken();
    
//     // Setup the override
//     authManager.setupAutoRefreshAndFetchOverride();
    
//     // Now make a fetch request
//     await global.fetch('https://api.example.com/data', {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' }
//     });
    
//     // The last call should have our Authorization header
//     const lastCall = global.fetch.mock.calls[global.fetch.mock.calls.length - 1];
//     expect(lastCall[0]).toBe('https://api.example.com/data');
//     expect(lastCall[1].headers.get('Authorization')).toBe('Bearer mock-access-token');
//   });
// });