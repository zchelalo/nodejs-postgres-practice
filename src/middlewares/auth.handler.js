import boom from '@hapi/boom'

function checkToken(req, res, next){
  const token = req.headers['token']
  if (token === '123'){
    next()
  }
  else{
    next(boom.unauthorized())
  }
}

export { checkToken }