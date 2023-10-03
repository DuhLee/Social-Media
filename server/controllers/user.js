import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Oauth from '../models/oauth.js';

export const oauth = async (req, res) => {

    
    const { email, name, picture, sub } = req.body;

    console.log(req.body);
    try {
        
        const existingUser = await User.findOne({ email: `${email}` })
        
        if(!existingUser) {
            const result = Oauth.create({
                _id: `${sub}`,
                _type: 'user',
                name: `${name}`,
                email: `${email}`,
                picture: `${picture}`,
            })
            
            const token = jwt.sign({ email: result.email, id: result._id, }, 'test', { expiresIn: "1h" });
            
            return res.status(200).json({ result, token });
        } else {
            const token = jwt.sign({ email: existingUser, id: existingUser._id }, 'test', { expiresIn: "1h" })
            
            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }
}


export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"});

        const token = jwt.sign({ email: existingUser, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token });
        
    } catch (error) {

        res.status(500).json({ message: "Something went wrong"});
        
    }
}

export const signup = async (req, res) => {

    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email: `${email}` })

        if (existingUser) return res.status(400).json({ message: "User already exist."});

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match"});

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email: `${email}`, password: `${hashPassword}`, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id, }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong"});
    }

}
