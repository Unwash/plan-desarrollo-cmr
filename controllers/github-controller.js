const postResponse = async (req, res) => {

    const { title,body } = req.body

    if(!title || !body) return res.status(400).json({message:"Parametros incompletos, se requiere title y body"})

    try {
        return res.json({response:`Gracias por tu issue, lo recibimos con exito. Titulo: ${title}, Body: ${body}`})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error al recibir el issue" })
    }
}

module.exports = {
    postResponse
}