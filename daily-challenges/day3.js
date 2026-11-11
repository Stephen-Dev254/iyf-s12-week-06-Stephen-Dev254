// Day 3: Error Handling with 404 Fallback User
async function fetchUserWithFallback(userId) {
    try {
        const response = await fetch(`https://typicode.com{userId}`);

        if (response.status === 404) {
            console.warn(`User #${userId} not found (404). Returning default guest profile.`);
            return {
                id: 0,
                name: "Guest User",
                username: "guest",
                email: "guest@example.com"
            };
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Network or server error:", error.message);
        throw error;
    }
}

async function runDay3() {
    const validUser = await fetchUserWithFallback(1);
    console.log("Valid User:", validUser.name);

    const missingUser = await fetchUserWithFallback(9999);
    console.log("Fallback User:", missingUser);
}

runDay3();
