const express = require('express');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api/github', async (req, res) => {
    const { username, role } = req.body;
    try {
        // Fetch GitHub repos
        const githubResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        const repos = githubResponse.data.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description',
            url: repo.html_url,
            language: repo.language || 'Unknown'
        }));

        // LLM prompt
        const prompt = `Given these GitHub repositories: ${JSON.stringify(repos)}, identify the top 3 most relevant to the role "${role}". Return only their names, descriptions, and URLs as a JSON array.`;
        const llmResponse = await openai.createCompletion({
            model: 'text-davinci-003', // Or latest model
            prompt: prompt,
            max_tokens: 500
        });

        // Parse LLM output (assuming it returns valid JSON)
        const relevantProjects = JSON.parse(llmResponse.data.choices[0].text);
        res.json(relevantProjects);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error processing request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});