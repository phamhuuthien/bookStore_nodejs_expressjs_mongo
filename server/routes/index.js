
const userRouters = require('./userRouter')
const roleRouters = require('./roleRouter')




const initRouters = (app)=>{
    app.use("/api/v1/user",userRouters)
    app.use("/api/v1/role",roleRouters)
}

module.exports = initRouters;