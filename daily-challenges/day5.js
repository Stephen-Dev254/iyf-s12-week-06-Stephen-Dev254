// Day 5: Parallel Fetches Across 3 Endpoints using Promise.allSettled
async function fetchParallelEndpoints() {
    const endpoints = [
        { name: "Users", url: "https://typicode.com" },
        { name: "Posts", url: "https://typicode.com" },
        { name: "Todos", url: "https://typicode.com" }
    ];

    // Attach individual completion loggers so results display as each finishes
    const requests = endpoints.map((item) =>
        fetch(item.url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log(`[Completed] ${item.name}:`, data);
                return { endpoint: item.name, data };
            })
    );

    const settledResults = await Promise.allSettled(requests);
    console.log("All 3 endpoints settled:", settledResults);
}

fetchParallelEndpoints();
