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