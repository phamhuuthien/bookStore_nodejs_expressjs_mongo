const User = require('../model/user');
const {genderateAccessToken,genderateRefreshToken} = require('../middlewares/jwt');
const register = async(req,res)=>{
   const {firstname,lastname,password,email,mobile,role} = req.body;
   console.log(req.body)
   if(!firstname || !lastname || !password || !email || !mobile || !role){
        return res.status(400).json({
            success: false, 
            mes:'missing inputs'
        })
   }
   const user = await User.findOne({ email : email})
   if(user){
        return res.status(401).json({
            success : false, 
            mes : 'user has existed'
        })
   }else{
       const newUser = await User.create(req.body)
       return res.status(200).json({
           success: newUser ? true : false,
           mes : newUser ? 'Register is successfully. Please go login' : 'something went wrong'
       }) 
   }
}


const login = async(req,res) => {
    const {email,password} = req.body
    if(!password || !email){
        return res.status(400).json({
            success: false, 
            mes:'missing inputs'
        })
   }

   const dataUser = await User.findOne({ email})
   if(dataUser && await dataUser.isCorrectPassword(password)){
        const {_id,password,role,refreshToken,...user} = dataUser.toObject();
        
        const newAccessToken = genderateAccessToken(dataUser._id,role)
        const newRefreshToken = genderateRefreshToken(dataUser._id)

        await User.findByIdAndUpdate(dataUser._id,{refreshToken:newRefreshToken}, {new : true})
        res.cookie('refreshToken',refreshToken,{maxAge:7*24*60*60*1000,httpOnly:true})
        return res.status(200).json({
            success: true,
            newAccessToken,
            userdata : user
        })
    }else {
        return res.status(404).json({
            success: false, 
            mes:'login falied'
        })
    }  
}

module.exports ={
    register,
    login
}