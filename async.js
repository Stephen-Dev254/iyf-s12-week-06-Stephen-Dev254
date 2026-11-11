// ==========================================
// TASK 11.1: UNDERSTANDING ASYNC
// ==========================================

// --- Exercise 1: Synchronous vs Asynchronous ---
console.log("--- Exercise 1: Sync vs Async ---");
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

console.log("1 - Start (Async)");
setTimeout(() => {
    console.log("2 - This is delayed by 2 seconds");
}, 2000);
console.log("3 - End (Async)");

// Output Prediction Test
console.log("--- Prediction Test (Expected: A, C, E, B, D) ---");
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");


// --- Exercise 2: Callback Pattern ---
console.log("--- Exercise 2: Callbacks ---");

function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "Baraka Wanjala", age: 27 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

// Build: Function simulating a 1.5-second database lookup
function loadUser(userId, callback) {
    console.log(`Fetching user #${userId} from database...`);
    setTimeout(() => {
        const userRecord = {
            id: userId,
            name: "Nyambura Karanja",
            role: "Software Engineer",
            city: "Nairobi"
        };
        callback(userRecord);
    }, 1500);
}

// Execute loadUser
loadUser(42, function(user) {
    console.log("Database lookup complete:", user);
});




// ==========================================
// TASK 11.2: CALLBACK HELL & PROMISES
// ==========================================

// --- Exercise 1: Experience Callback Hell ---
console.log("--- Task 11.2 Exercise 1: Callback Hell ---");

function getUserDataCallback(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "Tariq Ochieng" });
    }, 1000);
}

function getUserPostsCallback(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 101, title: "Building Async Apps in JavaScript" },
            { id: 102, title: "Understanding the Event Loop" }
        ]);
    }, 1000);
}

function getPostCommentsCallback(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Very clear explanation!" },
            { id: 2, text: "Thanks for sharing this guide." }
        ]);
    }, 1000);
}

// Nested Callback Execution ("Pyramid of Doom")
getUserDataCallback(1, function(user) {
    console.log("Callback User:", user);
    getUserPostsCallback(user.id, function(posts) {
        console.log("Callback Posts:", posts);
        getPostCommentsCallback(posts[0].id, function(comments) {
            console.log("Callback Comments:", comments);
        });
    });
});


// --- Exercise 2: Promises to the Rescue ---
console.log("--- Task 11.2 Exercise 2: Promises ---");

const myPromise = new Promise((resolve, reject) => {
    const success = true;
    
    setTimeout(() => {
        if (success) {
            resolve("Promise resolved: Operation succeeded!");
        } else {
            reject("Promise rejected: Something went wrong.");
        }
    }, 1000);
});

myPromise
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });


// --- Refactored Promise Functions (Required Build) ---
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: `Developer #${userId} (Makena)` });
            } else {
                reject("Invalid user ID: Must be greater than 0");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 201, userId: userId, title: "Refactored Promises Guide" },
                    { id: 202, userId: userId, title: "Clean Error Handling with Catch" }
                ]);
            } else {
                reject("Cannot fetch posts: Invalid user ID");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, postId: postId, text: "Much cleaner than nested callbacks!" },
                    { id: 2, postId: postId, text: "Promises make reading code easy." }
                ]);
            } else {
                reject("Cannot fetch comments: Invalid post ID");
            }
        }, 1000);
    });
}

// Verify refactored functions work cleanly
getUserData(1)
    .then(user => console.log("Refactored Promise User:", user))
    .catch(err => console.error(err));



    // ==========================================
// TASK 11.3: PROMISE CHAINING, ALL & RACE
// ==========================================
console.log("--- Task 11.3: Promise Chaining & Parallelism ---");

// --- Exercise 1: Chain Promises ---
getUserData(1)
    .then(user => {
        console.log("Task 11.3 Chained User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Task 11.3 Chained Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Task 11.3 Chained Comments:", comments);
    })
    .catch(error => {
        console.error("Promise Chain Error:", error);
    });


// --- Exercise 2 & Build: Fetch 3 users simultaneously using Promise.all ---
const userPromise1 = getUserData(1);
const userPromise2 = getUserData(2);
const userPromise3 = getUserData(3);

Promise.all([userPromise1, userPromise2, userPromise3])
    .then(allUsers => {
        console.log("Task 11.3 Build (3 Users Simultaneously):", allUsers);
    })
    .catch(error => {
        console.error("One of the parallel user fetches failed:", error);
    });


// --- Exercise 3: Promise.race ---
const fastTask = new Promise(resolve => setTimeout(() => resolve("Fast task finished first!"), 100));
const slowTask = new Promise(resolve => setTimeout(() => resolve("Slow task finished later."), 500));

Promise.race([fastTask, slowTask])
    .then(winner => {
        console.log("Task 11.3 Race Winner:", winner);
    });




// ==========================================
// TASK 11.4: ASYNC / AWAIT
// ==========================================
console.log("--- Task 11.4: Async / Await ---");

// Exercise 1: Converting Promise Chain to Async/Await
async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

// Exercise 2: Error Handling with Try/Catch
async function fetchUserDataSafe(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}

// Exercise 3: Parallel Execution with Async/Await
async function getAllUsersParallel() {
    try {
        const [u1, u2, u3] = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);
        console.log("Task 11.4 Parallel Users:", [u1, u2, u3]);
        return [u1, u2, u3];
    } catch (error) {
        console.error("Parallel fetch error:", error);
    }
}

// Build: Rewrite the callback hell example using async/await
async function displayCompleteUserThread(userId) {
    try {
        const user = await getUserData(userId);
        console.log("Async/Await User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Async/Await Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Async/Await Comments:", comments);
    } catch (error) {
        console.error("Thread lookup failed:", error);
    }
}

// Execute Task 11.4 functions
getAllUsersParallel();
displayCompleteUserThread(1);


// ==========================================
// TASK 12.1: FETCH API BASICS
// ==========================================
console.log("--- Task 12.1: Fetch API Practice ---");

// Helper function using Async/Await and HTTP status checks
async function fetchJsonData(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
}

// Practice: Fetch and display single user, all users, and user 1 posts
async function runTask12Practice() {
    try {
        // 1. Fetch a single user from JSONPlaceholder
        const singleUser = await fetchJsonData("https://jsonplaceholder.typicode.com/users/1");
        console.log("1. Single User:", singleUser);

        // 2. Fetch all users
        const allUsers = await fetchJsonData("https://jsonplaceholder.typicode.com/users");
        console.log("2. All Users (10 total):", allUsers);

        // 3. Fetch posts for user 1
        const userPosts = await fetchJsonData("https://jsonplaceholder.typicode.com/users/1/posts");
        console.log("3. Posts for User 1:", userPosts);
    } catch (error) {
        console.error("Task 12.1 Fetch Error:", error);
    }
}

runTask12Practice();



// ==========================================
// TASK 12.2: DISPLAY API DATA IN DOM
// ==========================================
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const usersContainer = document.getElementById("users-container");

async function renderUserDirectory() {
    try {
     const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();
        
        // Hide loading text once data arrives
        loadingEl.classList.add("hidden");
        
        // Build and append user cards safely via textContent
        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";
            
            const nameEl = document.createElement("h3");
            nameEl.textContent = user.name;
            
            const emailEl = document.createElement("p");
            emailEl.textContent = `Email: ${user.email}`;
            
            const detailsEl = document.createElement("p");
            detailsEl.textContent = `Company: ${user.company.name} | City: ${user.address.city}`;
            
            card.append(nameEl, emailEl, detailsEl);
            usersContainer.appendChild(card);
        });
    } catch (error) {
        loadingEl.classList.add("hidden");
        errorEl.classList.remove("hidden");
        errorEl.textContent = `Failed to load users: ${error.message}`;
    }
}

renderUserDirectory();






// ==========================================
// TASK 12.3: POST REQUESTS
// ==========================================
console.log("--- Task 12.3: POST Requests ---");

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });
    
    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    
    return response.json();
}

// Exercise Demo
async function demoPost() {
    try {
        const newPost = await createPost(
            "My First Post",
            "This is the content of my post.",
            1
        );
        console.log("Task 12.3 Created Post:", newPost);
    } catch (error) {
        console.error("POST Error:", error);
    }
}
demoPost();

// Build: Form submission handler for creating a post
const postForm = document.getElementById("post-form");
const postTitleInput = document.getElementById("post-title");
const postBodyInput = document.getElementById("post-body");
const postResultDiv = document.getElementById("post-result");

postForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const title = postTitleInput.value.trim();
    const body = postBodyInput.value.trim();
    if (!title || !body) return;
    
    try {
        const created = await createPost(title, body, 1);
        
        // Render user-typed text safely using textContent
        postResultDiv.innerHTML = "";
        postResultDiv.className = "post-result";
        
        const heading = document.createElement("h3");
        heading.textContent = `Post Published (ID: ${created.id}) — ${created.title}`;
        
        const content = document.createElement("p");
        content.textContent = created.body;
        
        postResultDiv.append(heading, content);
        postForm.reset();
    } catch (error) {
        postResultDiv.innerHTML = "";
        postResultDiv.className = "post-result";
        postResultDiv.textContent = `Error: ${error.message}`;
    }
});


// ==========================================
// TASK 12.2 & 12.4: DIRECTORY, SEARCH & FILTER
// ==========================================
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort-select");
const cityFilter = document.getElementById("city-filter");

let allUsers = [];

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
    if (users.length === 0) {
        container.innerHTML = "<p>No matching users found.</p>";
        return;
    }

    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Populate city dropdown options dynamically from fetched users
function populateCityDropdown(users) {
    const uniqueCities = [...new Set(users.map(user => user.address.city))].sort();
    uniqueCities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

// Combined Search, City Filter, and Name Sort handler
function updateDirectoryView() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedCity = cityFilter.value;
    const sortOrder = sortSelect.value;

    // 1. Filter by search query and city
    let processedUsers = allUsers.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);
        const matchesCity = selectedCity === "all" || user.address.city === selectedCity;
        return matchesSearch && matchesCity;
    });

    // 2. Sort by name (A-Z or Z-A)
    if (sortOrder === "asc") {
        processedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
        processedUsers.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayUsers(processedUsers);
}

// Attach control event listeners
searchInput.addEventListener("input", updateDirectoryView);
sortSelect.addEventListener("change", updateDirectoryView);
cityFilter.addEventListener("change", updateDirectoryView);

// Initialize directory
async function initDirectory() {
    try {
        showLoading();
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        
        allUsers = await response.json();
        populateCityDropdown(allUsers);
        displayUsers(allUsers);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

initDirectory();
