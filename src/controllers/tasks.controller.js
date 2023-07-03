import Task from "../models/task.model.js"

export const getTasks =  (req, res) => {
    try {
        
        res.json({message: "tasks"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getTask = async (req, res) => {
    try {
        

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const register = async (req, res) => {
    try {
        const {title, description} = req.body
        
        const task = new Task({
            title,
            description,
            user: req.user.id
        })

        const newTask = await task.save()

        res.status(200).json(newTask)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const update = async (req, res) => {
    try {
        

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const destroy = async (req, res) => {
    try {
        

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}