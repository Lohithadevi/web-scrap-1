

// // const axios = require('axios');
// // const fs = require('fs-extra');

// // // --- BATCH CONFIGURATION ---
// // const BATCH_SIZE = 1;     
// // const WAIT_TIME = 3000;    

// // const Adapters = {
// //     // UPDATED HACKERRANK ADAPTER
// //     hackerrank: async (user) => {
// //         try {
// //             // We switch to the 'recent_challenges' endpoint which is more public
// //             const res = await axios.get(`https://www.hackerrank.com/rest/hackers/${user}/recent_challenges?limit=1000`, {
// //                 headers: { 
// //                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
// //                     'Accept': 'application/json',
// //                     'Referer': `https://www.hackerrank.com/${user}`
// //                 },
// //                 timeout: 10000
// //             });

// //             // This returns a list of unique challenges solved. 
// //             // We use a Set to ensure we only count unique solved problems.
// //             if (res.data && res.data.models) {
// //                 const uniqueSolved = new Set(res.data.models.map(m => m.ch_id));
// //                 return uniqueSolved.size;
// //             }
// //             return 0;
// //         } catch (e) {
// //             console.log(`❌ HR Error for ${user}: ${e.response?.status || e.message}`);
// //             return 0;
// //         }
// //     },

// //     leetcode: async (user) => {
// //         const query = `query { matchedUser(username: "${user}") { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`;
// //         try {
// //             const res = await axios.post("https://leetcode.com/graphql", { query }, { timeout: 10000 });
// //             return res.data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 0;
// //         } catch { return 0; }
// //     },

// //     codeforces: async (user) => {
// //         try {
// //             const res = await axios.get(`https://codeforces.com/api/user.status?handle=${user}`);
// //             const solved = new Set(res.data.result.filter(s => s.verdict === "OK").map(s => s.problem.name));
// //             return solved.size;
// //         } catch { return 0; }
// //     },

// //     atcoder: async (user) => {
// //         try {
// //             const res = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${user}`, {
// //                 headers: { 'User-Agent': 'Mozilla/5.0' }
// //             });
// //             return res.data?.count || 0;
// //         } catch { return 0; }
// //     }
// // };

// // async function runScraper() {
// //     try {
// //         const students = await fs.readJson('students_mock.json');
// //         const results = [];

// //         for (let i = 0; i < students.length; i += BATCH_SIZE) {
// //             const batch = students.slice(i, i + BATCH_SIZE);
// //             console.log(`📦 Processing Batch ${Math.floor(i/BATCH_SIZE) + 1}...`);

// //             const batchResults = await Promise.all(batch.map(async (student) => {
// //                 const [lc, cf, ac, hr] = await Promise.all([
// //                     Adapters.leetcode(student.handles.leetcode),
// //                     Adapters.codeforces(student.handles.codeforces),
// //                     Adapters.atcoder(student.handles.atcoder),
// //                     Adapters.hackerrank(student.handles.hackerrank)
// //                 ]);

// //                 return {
// //                     name: student.name,
// //                     handles: student.handles,
// //                     counts: { leetcode: lc, codeforces: cf, atcoder: ac, hackerrank: hr, total: lc + cf + ac + hr }
// //                 };
// //             }));

// //             results.push(...batchResults);
// //             await fs.writeJson('final_leaderboard.json', results, { spaces: 2 });

// //             if (i + BATCH_SIZE < students.length) {
// //                 await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
// //             }
// //         }
// //         console.table(results.map(r => ({ Name: r.name, LC: r.counts.leetcode, HR: r.counts.hackerrank, Total: r.counts.total })));
// //     } catch (err) {
// //         console.log("Error:", err.message);
// //     }
// // }

// // runScraper();


// // const axios = require('axios');
// // const fs = require('fs-extra');

// // // --- BATCH CONFIGURATION ---
// // const BATCH_SIZE = 1;     
// // const WAIT_TIME = 3000;    

// // const Adapters = {
// //     // NEW GITHUB ADAPTER
// //     github: async (user) => {
// //         try {
// //             const res = await axios.get(`https://api.github.com/users/${user}`, {
// //                 headers: { 'Accept': 'application/vnd.github.v3+json' },
// //                 timeout: 10000
// //             });
// //             const data = res.data;
// //             return {
// //                 repos: data.public_repos || 0,
// //                 followers: data.followers || 0,
// //                 following: data.following || 0,
// //                 // Stars require a separate call or a more complex query, 
// //                 // but we can estimate or leave as 0 if not using a Token.
// //                 stars: 0 
// //             };
// //         } catch (e) {
// //             console.log(`❌ GH Error for ${user}: ${e.message}`);
// //             return { repos: 0, followers: 0, following: 0, stars: 0 };
// //         }
// //     },

// //     hackerrank: async (user) => {
// //         try {
// //             const res = await axios.get(`https://www.hackerrank.com/rest/hackers/${user}/recent_challenges?limit=1000`, {
// //                 headers: { 
// //                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
// //                     'Accept': 'application/json',
// //                     'Referer': `https://www.hackerrank.com/${user}`
// //                 },
// //                 timeout: 10000
// //             });
// //             if (res.data && res.data.models) {
// //                 const uniqueSolved = new Set(res.data.models.map(m => m.ch_id));
// //                 return uniqueSolved.size;
// //             }
// //             return 0;
// //         } catch (e) { return 0; }
// //     },

// //     leetcode: async (user) => {
// //         const query = `query { matchedUser(username: "${user}") { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`;
// //         try {
// //             const res = await axios.post("https://leetcode.com/graphql", { query }, { timeout: 10000 });
// //             return res.data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 0;
// //         } catch { return 0; }
// //     },

// //     codeforces: async (user) => {
// //         try {
// //             const res = await axios.get(`https://codeforces.com/api/user.status?handle=${user}`);
// //             const solved = new Set(res.data.result.filter(s => s.verdict === "OK").map(s => s.problem.name));
// //             return solved.size;
// //         } catch { return 0; }
// //     },

// //     atcoder: async (user) => {
// //         try {
// //             const res = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${user}`, {
// //                 headers: { 'User-Agent': 'Mozilla/5.0' }
// //             });
// //             return res.data?.count || 0;
// //         } catch { return 0; }
// //     }
// // };

// // async function runScraper() {
// //     try {
// //         const students = await fs.readJson('students_mock.json');
// //         const results = [];

// //         for (let i = 0; i < students.length; i += BATCH_SIZE) {
// //             const batch = students.slice(i, i + BATCH_SIZE);
// //             console.log(`📦 Processing Batch ${Math.floor(i/BATCH_SIZE) + 1}...`);

// //             const batchResults = await Promise.all(batch.map(async (student) => {
// //                 const [lc, cf, ac, hr, gh] = await Promise.all([
// //                     Adapters.leetcode(student.handles.leetcode),
// //                     Adapters.codeforces(student.handles.codeforces),
// //                     Adapters.atcoder(student.handles.atcoder),
// //                     Adapters.hackerrank(student.handles.hackerrank),
// //                     Adapters.github(student.handles.github)
// //                 ]);

// //                 return {
// //                     name: student.name,
// //                     handles: student.handles,
// //                     counts: { 
// //                         leetcode: lc, 
// //                         codeforces: cf, 
// //                         atcoder: ac, 
// //                         hackerrank: hr, 
// //                         github: gh, // Added github object here
// //                         total: lc + cf + ac + hr 
// //                     }
// //                 };
// //             }));

// //             results.push(...batchResults);
// //             await fs.writeJson('final_leaderboard.json', results, { spaces: 2 });

// //             if (i + BATCH_SIZE < students.length) {
// //                 await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
// //             }
// //         }
        
// //         // Updated table view to show GitHub Repos and Followers
// //         console.table(results.map(r => ({ 
// //             Name: r.name, 
// //             LC: r.counts.leetcode, 
// //             GH_Repos: r.counts.github.repos,
// //             GH_Followers: r.counts.github.followers,
// //             Total_CP: r.counts.total 
// //         })));

// //     } catch (err) {
// //         console.log("Error:", err.message);
// //     }
// // }

// // runScraper();

// const axios = require('axios');
// const fs = require('fs-extra');

// // --- CONFIGURATION ---
// // Change BATCH_SIZE to process more students at once (e.g., 5 or 10).
// const BATCH_SIZE = 1;     
// // Change WAIT_TIME (in milliseconds) to wait between batches. 3000 = 3 seconds.
// const WAIT_TIME = 3000;    
// // Add your GitHub Token between the quotes to avoid "Rate Limit" errors.
// const GITHUB_TOKEN = ""; 

// const Adapters = {
//     github: async (user) => {
//         try {
//             // Setting up headers for GitHub API; version 3 is the standard stable version.
//             const headers = { 'Accept': 'application/vnd.github.v3+json' };
//             // If you provided a token above, it adds it to the request so GitHub knows it's you.
//             if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

//             // Line A: Fetching the main profile (contains repo count, followers, following).
//             const userRes = await axios.get(`https://api.github.com/users/${user}`, { headers, timeout: 10000 });
            
//             // Line B: Fetching the list of repositories (up to 100) to calculate stars.
//             const repoRes = await axios.get(`https://api.github.com/users/${user}/repos?per_page=100`, { headers, timeout: 10000 });
            
//             // Line C: .reduce loops through all repos and adds up the 'stargazers_count' for each.
//             const starCount = repoRes.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);

//             return {
//                 repos: userRes.data.public_repos || 0,
//                 followers: userRes.data.followers || 0,
//                 following: userRes.data.following || 0,
//                 stars: starCount
//             };
//         } catch (e) {
//             console.log(`❌ GH Error for ${user}: ${e.message}`);
//             return { repos: 0, followers: 0, following: 0, stars: 0 };
//         }
//     },

//     hackerrank: async (user) => {
//         try {
//             const res = await axios.get(`https://www.hackerrank.com/rest/hackers/${user}/recent_challenges?limit=1000`, {
//                 headers: { 
//                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
//                     'Accept': 'application/json',
//                     'Referer': `https://www.hackerrank.com/${user}`
//                 },
//                 timeout: 10000
//             });
//             if (res.data && res.data.models) {
//                 const uniqueSolved = new Set(res.data.models.map(m => m.ch_id));
//                 return uniqueSolved.size;
//             }
//             return 0;
//         } catch (e) { return 0; }
//     },

//     leetcode: async (user) => {
//         const query = `query { matchedUser(username: "${user}") { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`;
//         try {
//             const res = await axios.post("https://leetcode.com/graphql", { query }, { timeout: 10000 });
//             return res.data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 0;
//         } catch { return 0; }
//     },

//     codeforces: async (user) => {
//         try {
//             const res = await axios.get(`https://codeforces.com/api/user.status?handle=${user}`);
//             const solved = new Set(res.data.result.filter(s => s.verdict === "OK").map(s => s.problem.name));
//             return solved.size;
//         } catch { return 0; }
//     },

//     atcoder: async (user) => {
//         try {
//             const res = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${user}`, {
//                 headers: { 'User-Agent': 'Mozilla/5.0' }
//             });
//             return res.data?.count || 0;
//         } catch { return 0; }
//     }
// };

// async function runScraper() {
//     try {
//         const students = await fs.readJson('students_mock.json');
//         const results = [];

//         for (let i = 0; i < students.length; i += BATCH_SIZE) {
//             const batch = students.slice(i, i + BATCH_SIZE);
//             console.log(`📦 Processing Batch ${Math.floor(i/BATCH_SIZE) + 1}...`);

//             const batchResults = await Promise.all(batch.map(async (student) => {
//                 // Promise.all triggers all platform requests for one student simultaneously.
//                 const [lc, cf, ac, hr, gh] = await Promise.all([
//                     Adapters.leetcode(student.handles.leetcode),
//                     Adapters.codeforces(student.handles.codeforces),
//                     Adapters.atcoder(student.handles.atcoder),
//                     Adapters.hackerrank(student.handles.hackerrank),
//                     Adapters.github(student.handles.github)
//                 ]);

//                 return {
//                     name: student.name,
//                     handles: student.handles,
//                     counts: { 
//                         leetcode: lc, 
//                         codeforces: cf, 
//                         atcoder: ac, 
//                         hackerrank: hr, 
//                         github: gh, 
//                         total: lc + cf + ac + hr 
//                     }
//                 };
//             }));

//             results.push(...batchResults);
//             // Saves incrementally so you don't lose data if the script crashes.
//             await fs.writeJson('final_leaderboard.json', results, { spaces: 2 });

//             if (i + BATCH_SIZE < students.length) {
//                 await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
//             }
//         }
        
//         console.table(results.map(r => ({ 
//             Name: r.name, 
//             LC: r.counts.leetcode, 
//             GH_Repos: r.counts.github.repos,
//             GH_Stars: r.counts.github.stars,
//             Total_CP: r.counts.total 
//         })));

//     } catch (err) {
//         console.log("Error:", err.message);
//     }
// }

// runScraper();
// const axios = require('axios');
// const fs = require('fs-extra');

// // --- CONFIGURATION ---
// const BATCH_SIZE = 1;     
// const WAIT_TIME = 15000;    
// const GITHUB_TOKEN = ""; // Add your token here to avoid rate limits

// const Adapters = {
//     github: async (user) => {
//         try {
//             const headers = { 'Accept': 'application/vnd.github.v3+json' };
//             if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

//             // Fetch main profile (contains public_repos, followers, following)
//             const userRes = await axios.get(`https://api.github.com/users/${user}`, { headers, timeout: 10000 });
            
//             // Fetch repos to calculate stars
//             const repoRes = await axios.get(`https://api.github.com/users/${user}/repos?per_page=100`, { headers, timeout: 10000 });
            
//             const starCount = repoRes.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);

//             return {
//                 repos: userRes.data.public_repos || 0,
//                 followers: userRes.data.followers || 0,
//                 following: userRes.data.following || 0,
//                 stars: starCount
//             };
//         } catch (e) {
//             console.log(`❌ GH Error for ${user}: ${e.message}`);
//             return { repos: 0, followers: 0, following: 0, stars: 0 };
//         }
//     },

//     hackerrank: async (user) => {
//         try {
//             const res = await axios.get(`https://www.hackerrank.com/rest/hackers/${user}/recent_challenges?limit=1000`, {
//                 headers: { 
//                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
//                     'Accept': 'application/json',
//                     'Referer': `https://www.hackerrank.com/${user}`
//                 },
//                 timeout: 10000
//             });
//             if (res.data && res.data.models) {
//                 const uniqueSolved = new Set(res.data.models.map(m => m.ch_id));
//                 return uniqueSolved.size;
//             }
//             return 0;
//         } catch (e) { return 0; }
//     },

//     leetcode: async (user) => {
//         const query = `query { matchedUser(username: "${user}") { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`;
//         try {
//             const res = await axios.post("https://leetcode.com/graphql", { query }, { timeout: 10000 });
//             return res.data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 0;
//         } catch { return 0; }
//     },

//     codeforces: async (user) => {
//         try {
//             const res = await axios.get(`https://codeforces.com/api/user.status?handle=${user}`);
//             const solved = new Set(res.data.result.filter(s => s.verdict === "OK").map(s => s.problem.name));
//             return solved.size;
//         } catch { return 0; }
//     },

//     atcoder: async (user) => {
//         try {
//             const res = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${user}`, {
//                 headers: { 'User-Agent': 'Mozilla/5.0' }
//             });
//             return res.data?.count || 0;
//         } catch { return 0; }
//     }
// };

// async function runScraper() {
//     try {
//         const students = await fs.readJson('students_mock.json');
//         const results = [];

//         for (let i = 0; i < students.length; i += BATCH_SIZE) {
//             const batch = students.slice(i, i + BATCH_SIZE);
//             console.log(`📦 Processing Batch ${Math.floor(i/BATCH_SIZE) + 1}...`);

//             const batchResults = await Promise.all(batch.map(async (student) => {
//                 const [lc, cf, ac, hr, gh] = await Promise.all([
//                     Adapters.leetcode(student.handles.leetcode),
//                     Adapters.codeforces(student.handles.codeforces),
//                     Adapters.atcoder(student.handles.atcoder),
//                     Adapters.hackerrank(student.handles.hackerrank),
//                     Adapters.github(student.handles.github)
//                 ]);

//                 return {
//                     name: student.name,
//                     handles: student.handles,
//                     counts: { 
//                         leetcode: lc, 
//                         codeforces: cf, 
//                         atcoder: ac, 
//                         hackerrank: hr, 
//                         github: {
//                             repos: gh.repos,
//                             stars: gh.stars,
//                             followers: gh.followers,   // Fixed: Added followers
//                             following: gh.following    // Fixed: Added following
//                         }, 
//                         total: lc + cf + ac + hr 
//                     }
//                 };
//             }));

//             results.push(...batchResults);
//             await fs.writeJson('final_leaderboard.json', results, { spaces: 2 });

//             if (i + BATCH_SIZE < students.length) {
//                 await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
//             }
//         }
        
//         // Updated table view for terminal debugging
//         console.table(results.map(r => ({ 
//             Name: r.name, 
//             LC: r.counts.leetcode, 
//             GH_Repos: r.counts.github.repos,
//             GH_Stars: r.counts.github.stars,
//             GH_Followers: r.counts.github.followers,
//             GH_Following: r.counts.github.following,
//             Total_CP: r.counts.total 
//         })));

//     } catch (err) {
//         console.log("Error:", err.message);
//     }
// }

// runScraper();

const axios = require('axios');
const fs = require('fs-extra');

// --- CONFIGURATION ---
const BATCH_SIZE = 10;      
const WAIT_TIME = 3000;    

// This line allows the code to use the secret from GitHub Actions
const GITHUB_TOKEN = process.env.GH_TOKEN || ""; 

const Adapters = {
    github: async (user) => {
        try {
            const headers = { 'Accept': 'application/vnd.github.v3+json' };
            if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

            const userRes = await axios.get(`https://api.github.com/users/${user}`, { headers, timeout: 10000 });
            const repoRes = await axios.get(`https://api.github.com/users/${user}/repos?per_page=100`, { headers, timeout: 10000 });
            
            const starCount = repoRes.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);

            return {
                repos: userRes.data.public_repos || 0,
                followers: userRes.data.followers || 0,
                following: userRes.data.following || 0,
                stars: starCount
            };
        } catch (e) {
            console.log(`❌ GH Error for ${user}: ${e.message}`);
            return { repos: 0, followers: 0, following: 0, stars: 0 };
        }
    },

    hackerrank: async (user) => {
        try {
            const res = await axios.get(`https://www.hackerrank.com/rest/hackers/${user}/recent_challenges?limit=1000`, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                timeout: 10000
            });
            if (res.data && res.data.models) {
                return new Set(res.data.models.map(m => m.ch_id)).size;
            }
            return 0;
        } catch (e) { return 0; }
    },

    leetcode: async (user) => {
        const query = `query { matchedUser(username: "${user}") { submitStatsGlobal { acSubmissionNum { difficulty count } } } }`;
        try {
            const res = await axios.post("https://leetcode.com/graphql", { query }, { timeout: 10000 });
            return res.data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(s => s.difficulty === 'All')?.count || 0;
        } catch { return 0; }
    },

    codeforces: async (user) => {
        try {
            const res = await axios.get(`https://codeforces.com/api/user.status?handle=${user}`);
            const solved = new Set(res.data.result.filter(s => s.verdict === "OK").map(s => s.problem.name));
            return solved.size;
        } catch { return 0; }
    },

    atcoder: async (user) => {
        try {
            const res = await axios.get(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${user}`, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            return res.data?.count || 0;
        } catch { return 0; }
    }
};

async function runScraper() {
    try {
        const students = await fs.readJson('students_mock.json');
        const results = [];

        for (let i = 0; i < students.length; i += BATCH_SIZE) {
            const batch = students.slice(i, i + BATCH_SIZE);
            console.log(`📦 Processing Batch ${Math.floor(i/BATCH_SIZE) + 1}...`);

            const batchResults = await Promise.all(batch.map(async (student) => {
                const [lc, cf, ac, hr, gh] = await Promise.all([
                    Adapters.leetcode(student.handles.leetcode),
                    Adapters.codeforces(student.handles.codeforces),
                    Adapters.atcoder(student.handles.atcoder),
                    Adapters.hackerrank(student.handles.hackerrank),
                    Adapters.github(student.handles.github)
                ]);

                return {
                    name: student.name,
                    handles: student.handles,
                    counts: { 
                        leetcode: lc, 
                        codeforces: cf, 
                        atcoder: ac, 
                        hackerrank: hr, 
                        github: gh, 
                        total: lc + cf + ac + hr 
                    }
                };
            }));

            results.push(...batchResults);
            
            // Write only once after each batch to avoid corruption
            await fs.writeJson('final_leaderboard.json', results, { spaces: 2 });

            if (i + BATCH_SIZE < students.length) {
                await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
            }
        }
        console.log("✅ Final Leaderboard saved to final_leaderboard.json");
    } catch (err) {
        console.log("Error:", err.message);
    }
}

runScraper();