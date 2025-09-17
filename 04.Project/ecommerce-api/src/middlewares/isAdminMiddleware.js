const isAdmin =(req, res, next)=>{
    if(req.user.role==='admin'){
        req.isAdmin=true;
        next(); 
    }else{
        res.status(403).json({message: 'Forbidden'});
    }; 
}