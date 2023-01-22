import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'somethingsecret', 
    {expiresIn: '30d'}
  );
};

// User token validation or verification
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization){
    const token = authorization.slice(7, authorization.length) // Bearer XXXXXX

    // verifying user token
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
      // if user token not valid
      if(err){
        res.status(401).send({message: 'Invalid token'})
      }else{
        // after user token decode user info gotted
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({message: 'No token'})
  }
}
