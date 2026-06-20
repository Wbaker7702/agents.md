const benchmark = () => {
  const line = "This is a line with `inline code` and another `bit of code`.";
  const iterations = 10000000;

  console.log(`Running benchmark with ${iterations} iterations...`);

  // Baseline: Regex instantiation in loop
  const startBaseline = performance.now();
  for (let i = 0; i < iterations; i++) {
    const parts = line.split(/(`[^`]+`)/g);
  }
  const endBaseline = performance.now();
  const baselineTime = endBaseline - startBaseline;

  // Optimized: Module-level Regex
  const INLINE_CODE_REGEX = /(`[^`]+`)/g;
  const startOptimized = performance.now();
  for (let i = 0; i < iterations; i++) {
    const parts = line.split(INLINE_CODE_REGEX);
  }
  const endOptimized = performance.now();
  const optimizedTime = endOptimized - startOptimized;

  console.log(`Baseline (in-loop): ${baselineTime.toFixed(4)}ms`);
  console.log(`Optimized (module-level): ${optimizedTime.toFixed(4)}ms`);
  const diff = baselineTime - optimizedTime;
  console.log(`Improvement: ${(diff / baselineTime * 100).toFixed(2)}% (${diff.toFixed(4)}ms)`);
};

benchmark();
benchmark();
benchmark();
