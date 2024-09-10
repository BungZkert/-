const trycatch = (hander)  => {
    return async(req, res, next) =>{
        try{
            await hander(req, res, next);
        }catch(error){
            res.status(500).json({
                message: error.message,
            });
        }
    };
};

export default trycatch;