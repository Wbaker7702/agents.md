
async function simulateFetch(url, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
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
