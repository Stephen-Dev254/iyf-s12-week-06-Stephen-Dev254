// Day 2: Promise Chain with Random Delays & Timing
function randomDelayTask(stepName) {
    const ms = Math.floor(Math.random() * 1000) + 300; // 300ms to 1300ms
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`${stepName} completed in ${ms}ms`);
            resolve(ms);
        }, ms);
    });
}

const startTime = Date.now();

randomDelayTask("Step 1: Fetch Profile")
    .then(() => randomDelayTask("Step 2: Load Settings"))
    .then(() => randomDelayTask("Step 3: Render Dashboard"))
    .then(() => {
        const totalTime = Date.now() - startTime;
        console.log(`All 3 chained promises finished in ${totalTime}ms`);
    })
    .catch((err) => console.error("Chain error:", err));
