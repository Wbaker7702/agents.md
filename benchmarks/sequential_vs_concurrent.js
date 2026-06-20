const repoNames = [
  "openai/codex",
  "apache/airflow",
  "temporalio/sdk-java",
  "PlutoLang/Pluto",
];

const MOCK_LATENCY = 100; // ms

async function mockFetch(url) {

async function simulateFetch(url, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => [],
        headers: {
          get: (name) => null,
        },
      });
    }, MOCK_LATENCY);
  });
}

async function sequential() {
  const start = Date.now();
  const contributorsByRepo = {};

  for (const fullName of repoNames) {
    try {
      const avatarsRes = await mockFetch(
        `https://api.github.com/repos/${fullName}/contributors?per_page=3`
      );
      const avatarsData = await avatarsRes.json();
      const avatars = avatarsData.slice(0, 3).map((c) => c.avatar_url);

      let total = avatarsData.length;
      try {
        const countRes = await mockFetch(
          `https://api.github.com/repos/${fullName}/contributors?per_page=1&anon=1`
        );
        const link = countRes.headers.get("link");
        // ... simplified
      } catch (e) {
        // ignore
      }
      contributorsByRepo[fullName] = { avatars, total };
    } catch (e) {
      contributorsByRepo[fullName] = { avatars: [], total: 0 };
    }
  }
  return Date.now() - start;
}

async function concurrent() {
  const start = Date.now();

  const results = await Promise.all(
    repoNames.map(async (fullName) => {
      try {
        // We can even parallelize the two requests for the same repo
        const [avatarsRes, countRes] = await Promise.all([
          mockFetch(`https://api.github.com/repos/${fullName}/contributors?per_page=3`),
          mockFetch(`https://api.github.com/repos/${fullName}/contributors?per_page=1&anon=1`)
        ]);

        const avatarsData = await avatarsRes.json();
        const avatars = avatarsData.slice(0, 3).map((c) => c.avatar_url);

        let total = avatarsData.length;
        const link = countRes.headers.get("link");
        // ... simplified

        return { fullName, data: { avatars, total } };
      } catch (e) {
        return { fullName, data: { avatars: [], total: 0 } };
      }
    })
  );

  const contributorsByRepo = {};
  for (const { fullName, data } of results) {
    contributorsByRepo[fullName] = data;
  }

  return Date.now() - start;
}

async function run() {
  console.log("Starting benchmark...");

  const seqTime = await sequential();
  console.log(`Sequential execution time: ${seqTime}ms`);

  const conTime = await concurrent();
  console.log(`Concurrent execution time: ${conTime}ms`);

  const improvement = ((seqTime - conTime) / seqTime) * 100;
  console.log(`Improvement: ${improvement.toFixed(2)}%`);
        json: async () => ({ url, data: [] }),
        headers: {
          get: (name) => name === 'link' ? '<...page=10>; rel="last"' : null
        }
      });
    }, ms);
  });
}

const repoNames = [
  "openai/codex",
  "apache/airflow",
  "temporalio/sdk-java",
  "PlutoLang/Pluto",
];

async function sequential() {
  const start = Date.now();
  const results = {};
  for (const repo of repoNames) {
    // Simulate avatars fetch
    const avatarsRes = await simulateFetch(`avatars/${repo}`, 100);
    const avatarsData = await avatarsRes.json();

    // Simulate count fetch
    const countRes = await simulateFetch(`count/${repo}`, 100);
    const link = countRes.headers.get('link');

    results[repo] = { avatars: avatarsData, total: 10 };
  }
  const end = Date.now();
  return end - start;
}

async function parallel() {
  const start = Date.now();
  const results = await Promise.all(repoNames.map(async (repo) => {
    const [avatarsRes, countRes] = await Promise.all([
      simulateFetch(`avatars/${repo}`, 100),
      simulateFetch(`count/${repo}`, 100)
    ]);
    const avatarsData = await avatarsRes.json();
    const link = countRes.headers.get('link');
    return { repo, data: { avatars: avatarsData, total: 10 } };
  }));
  const end = Date.now();
  return end - start;
}

async function run() {
  console.log("Running benchmarks...");
  const seqTime = await sequential();
  console.log(`Sequential time: ${seqTime}ms`);

  const parTime = await parallel();
  console.log(`Parallel time: ${parTime}ms`);

  console.log(`Improvement: ${((seqTime - parTime) / seqTime * 100).toFixed(2)}%`);
}

run();
