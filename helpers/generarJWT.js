const jwt = require('jsonwebtoken')
const generarJWT = ( uid = '' )=>{
    
    return new Promise((resolve,reject)=>{
        const payload = { uid }
        jwt.sign(payload,process.env.SECRETKEY,{
            expiresIn: '4h'
        },
        (err,token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generrar Token')
            }else{
                resolve( token )
            }
        })
    })

}

module.exports = {generarJWT}