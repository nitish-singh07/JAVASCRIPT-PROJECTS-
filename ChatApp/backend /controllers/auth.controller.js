import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"


export const singup = async (req, res) => {
    
    try {
        const{fullname, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
           return res.status(400).json({error:"Password  don't match"});
        }

        const user =  await User.findOne({username});

        if(user){
            res.status(400).json({error:"Username already occupied try other user name "});
        }

        //hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        //https://avatar.iran.liara.run/public/boy?username=Scott

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === "male" ? maleProfilePic : femaleProfilePic

        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic:newUser.profilePic
        })
        

    } catch (error) {
        console.log("error in singup controller ",error.message);
        res.status(500).json({error:"internal server error"}); 
        
    }

}

export const login = (req, res) => {
    res.send("<h2>This is login route</h2>");
}


export const logout = (req, res) => {
    res.send("<h2>This is logout route</h2>");
}

