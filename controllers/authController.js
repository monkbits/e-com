import { userModel } from '../models/userModel.js';
import { hashPassword } from './../helpers/authHelper.js';
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
        //check user
        const existinguser = await userModel.findOne({ email });
        // existing user
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: "Already Register Please login"
            })
        }
        //register user
        const hashedPassword = new hashPassword(password);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in registration",
            error
        });
    }
}

