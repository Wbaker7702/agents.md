const repoNames = [
  "openai/codex",
  "apache/airflow",
  "temporalio/sdk-java",
  "PlutoLang/Pluto",
];

const MOCK_LATENCY = 100; // ms

async function mockFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => [],
        headers: {
          get: (name) => null
        }
      });
    }, MOCK_LATENCY);
  });
}

async function sequentialFetch() {
  const start = Date.now();
  const contributorsByRepo = {};

  for (const fullName of repoNames) {
    try {
      // Fetch top 3 contributor avatars
      const avatarsRes = await mockFetch(`https://api.github.com/repos/${fullName}/contributors?per_page=3`);
      const avatarsData = await avatarsRes.json();
      const avatars = avatarsData.slice(0, 3).map((c) => c.avatar_url);

      // Fetch contributor count
      let total = avatarsData.length;
      try {
        const countRes = await mockFetch(`https://api.github.com/repos/${fullName}/contributors?per_page=1&anon=1`);
        const link = countRes.headers.get("link");
        total = 0; // simplified for simulation
      } catch (e) {}

      contributorsByRepo[fullName] = { avatars, total };
    } catch (e) {}
  }
  const end = Date.now();
  return end - start;
}

async function concurrentFetch() {
  const start = Date.now();

  const results = await Promise.all(repoNames.map(async (fullName) => {
    try {
      // Optimization: Fetch both concurrently
      const [avatarsRes, countRes] = await Promise.all([
        mockFetch(`https://api.github.com/repos/${fullName}/contributors?per_page=3`),
        mockFetch(`https://api.github.com/repos/${fullName}/contributors?per_page=1&anon=1`)
      ]);

      const avatarsData = await avatarsRes.json();
      const avatars = avatarsData.slice(0, 3).map((c) => c.avatar_url);

      let total = avatarsData.length;
      const link = countRes.headers.get("link");
      // ... logic here ...

      return [fullName, { avatars, total }];
    } catch (e) {
      return [fullName, { avatars: [], total: 0 }];
    }
  }));

  const contributorsByRepo = Object.fromEntries(results);

  const end = Date.now();
  return end - start;
}

async function run() {
  console.log("Starting benchmark simulation...");
  const seqTime = await sequentialFetch();
  console.log(`Sequential Fetch Time: ${seqTime}ms`);

  const conTime = await concurrentFetch();
  console.log(`Concurrent Fetch Time: ${conTime}ms`);

  const improvement = ((seqTime - conTime) / seqTime * 100).toFixed(2);
  console.log(`Improvement: ${improvement}%`);
}

run();
