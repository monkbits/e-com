import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from './../helpers/authHelper.js';
import JwT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ error: 'Name is Required' })
        }
        if (!email) {
            return res.send({ error: 'Email is Required' })
        }
        if (!password) {
            return res.send({ error: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone is Required' })
        }
        if (!address) {
            return res.send({ error: 'Address is Required' })
        }
        // check user
        const existingUser = await userModel.findOne({ email });
        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Register Please login"
            })
        }
        // register user
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();

        return res.status(201).send({
            success: true,
            msg: "user registered successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in registration",
            error
        });
    }
}

// method post login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            })
        }
        //token
        const token = await JwT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: "login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })
    } catch (error) {
        console.log(`logincontroller error : ${error}`)
        return res.status(500).send({
            success: true,
            message: "error in log in",
            error
        })
    }
}

export const testController = (req, res) => {
    res.send("Protected route")
}