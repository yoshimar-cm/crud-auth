import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import {createAccessToken} from '../libs/jwt.js';


export const register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body

        const passwordHash = await bcrypt.hash(password,10)
        
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save();

        //Todo: generate token
        const token = await createAccessToken({id: userSaved._id})

        res.cookie('token', token)
        res.status(200).json({message: 'User creted successfully'})

        // res.status(201).send({
        //         id: userSaved._id,
        //         username: userSaved.username,
        //         email: userSaved.email
        //     });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        //? Validation use exist
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message: 'User not found'});
        
        //? validation password
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: 'Incorect password'});

        //Todo: generate token
        const token = await createAccessToken({id: userFound._id})

        res.cookie('token', token)
        res.status(200).json({message: 'User found successfully'})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const logout = (req, res) => {
    try {
        res.cookie('token',"",{
            expires: new Date(0)
        })
        
        return res.sendStatus(200)
        
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}

export const profile = async (req, res) => {
    try {

        const userFound = await User.findById(req.user.id)

        if(!userFound) return res.status(400).json({message: 'ser not found'})
        
        return res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
        
    } catch (error) {
      res.status(500).json({message: error.message})   
    }
}