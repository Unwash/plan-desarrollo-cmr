const axios = require("axios");

const MODEL = process.env.GITHUB_MODEL || "openai/gpt-4.1";
const TOKEN = process.env.GITHUB_TOKEN;

const analizarIssue = async (title, body) => {

    if (!TOKEN) {
        throw new Error("No existe la variable de entorno GITHUB_TOKEN");
    }

    const prompt = `
Eres un desarrollador Senior experto en:

- Node.js
- Express
- MongoDB
- Jest
- GitHub Actions
- Azure Pipelines
- OWASP Top 10

Analiza el siguiente Issue de GitHub.

Título:
${title}

Descripción:
${body}

Responde exactamente con este formato Markdown:

# 🤖 AI Review

## Resumen

...

## Riesgos

...

## Seguridad

...

## Pruebas recomendadas

...

## Implementación sugerida

...

## Checklist

- [ ] Backend
- [ ] Tests
- [ ] Documentación
- [ ] Seguridad
`;

    const response = await axios.post(
        "https://models.github.ai/inference/chat/completions",
        {
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.2,
            max_tokens: 1200
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2026-03-10"
            }
        }
    );

    return response.data.choices[0].message.content;
};

module.exports = {
    analizarIssue
};