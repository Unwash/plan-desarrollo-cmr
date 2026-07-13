const { analizarIssue } = require("../services/githubModel");

const postResponse = async (req, res) => {

    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({
            message: "Parámetros incompletos, se requiere title y body."
        });
    }

    try {

        const respuesta = await analizarIssue(title, body);

        return res.json({
            response: respuesta
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error al analizar el issue."
        });

    }

};

module.exports = {
    postResponse
};