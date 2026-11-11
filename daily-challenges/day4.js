// Day 4: Callback-based Database Lookup Rewritten with Async/Await
function loadUserPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Nyambura Karanja",
                    role: "Software Engineer",
                    city: "Nairobi"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

async function runDay4() {
    try {
        console.log("Looking up user record...");
        const user = await loadUserPromise(42);
        console.log("Async/Await User Loaded:", user);
    } catch (error) {
        console.error("Lookup failed:", error.message);
    }
}

runDay4();
