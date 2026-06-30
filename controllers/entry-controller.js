const Entry = require("../models/entry");

const postEntries = async (req, res) => {

    const { description } = req.body

    const newEntry = new Entry({
        description,
        createdAt: Date.now()
    })

    try {
        await newEntry.save()
        return res.status(201).json(newEntry)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Algo salio mal" })
    }
}

const getEnabledCategories = async (req,res) => {
    const entries = await Entry.find().sort({ createdAt: 'ascending' })
    return res.json(entries)
}

const getEntry = async (req,res)=>{
try {

const {id} = req.params

const entry = await Entry.findById(id)

if(!entry) return res.status(400).json({message:"No existe una entrada con este id"})

return res.json(entry)

    
} catch (error) {
    console.log(error)
    res.status(500).json({message:"Ocurrio un error en el servidor"})
}
}

const updateEntry = async (req,res) =>{
    try {
        
    const {id} = req.params
    
    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate){
        return res.status(400).json({message: "No existe una entrada con ese id: " + id})
    }

    const {description = entryToUpdate.description, status = entryToUpdate.status} = req.body

    const updatedEntry = await Entry.findByIdAndUpdate(id,{description,status}, {runValidators:true,new:true})
    
    res.json(updatedEntry)
        
    } catch (error) {
    console.log(error)
    res.status(400).json({message:"Error de servidor"})
    }
    } 

const deleteEntry = async (req, res) =>{
    try {
        const {id} = req.params

        const entry = await Entry.findByIdAndDelete(id)

        return res.status(200).json(entry)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error de servidor"})
    }
}

module.exports = {
postEntries,
getEnabledCategories,
getEntry,
updateEntry,
deleteEntry
};
