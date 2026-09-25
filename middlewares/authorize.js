
export const authorize=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user)
            return res.status(401).json({message:"login first"})

        if(!allowedRoles.includes(req.user.role))
            return res.status(403).json({message:"you are not authorized to access this resource"})
   
        return next()
    }
}