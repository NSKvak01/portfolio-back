const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

function dispatchErrorDevelopment (error,req,res){
    if(req.originalUrl.startsWith('/api')){
        console.log(req)
        return res.status(error.statusCode).json({
            status:error.status,
            error:error,
            message:error.message,
            stack:error.stack
        })
    }
}
function dispatchErrorProduction (error,req,res){
    if (req.originalUrl.startsWith("/api")){
        if(error.isOperational){
            return res.status(error.statusCode).json({
                status:error.status,
                error:error,
                message:error.message
            })
        }
        // if it's not operational we return "error" and our message we create here
        return res.status(error.statusCode).json({
            status:"Error",
            message:"Something went wrong"
        })
    }
}


module.exports = (err, req, res, next) =>{
    err.statusCode= err.statusCode || 500;
    err.status = err.status || "error"

    let error  = {...err}
    error.message = err.message

    if(process.env.NODE_ENV === "development"){
        dispatchErrorDevelopment(error, req, res)
    } else{
        dispatchErrorProduction(error, req, res)
    }
}