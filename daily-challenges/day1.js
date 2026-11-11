// Day 1: Delayed Promise
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function runDay1() {
    console.log("Waiting 2 seconds...");
    await delay(2000);
    console.log("This prints after 2 seconds");
}

runDay1();
