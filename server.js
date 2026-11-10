
const express = require("express");

const app = express();

const PORT = 3000;

// Redirect localhost homepage to the fun fact API
app.get("/", (req, res) => {
    res.redirect("/api/fun-fact");
});

// GET route to retrieve a random fun fact
app.get("/api/fun-fact", async (req, res) => {

    try {
        // Fetch
        const response = await fetch(
            "https://uselessfacts.jsph.pl/api/v2/facts/random"
        );

        // Check if the API request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch fun fact");
        }

        // Convert the response to JSON
        const data = await response.json();

        // Send only the fact text to the client
        res.json({
            fact: data.text
        });

    } catch (error) {
        // Display error in terminal
        console.log("Error:", error.message);

        // Send error response
        res.status(500).json({
            error: "Could not fetch fun fact"
        });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
