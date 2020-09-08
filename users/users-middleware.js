const jwt = require("jsonwebtoken")

function restricted(role) {

    const roles = ["basic", "admin", "premium"]

    return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
        }
        
    return async (req, res, next) => {
        try {

            const token = req.headers.authorization
			if(!token){
				return res.status(401).json(authError)
            }
            
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
                if(err){
                    return res.status(401).json(authError)
                }

                if(role && roles.indexOf(decodedPayload.userRole) < roles.indexOf(role)){
                    return res.status(403).json({
                        message:"You are not allowed here",
                    })
                }

                req.token = decodedPayload
            
                //user authenticated if gotten this far
                next()
            })

            
        } catch (err) {
            next(err)
        }
    } 
  }
}
module.exports = {
    restricted
}