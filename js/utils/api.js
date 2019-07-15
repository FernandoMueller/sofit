const request = require('request')
const id = '5d0a90cb898da50014bfc3c7'
const apiUrl = 'https://challenge-for-adventurers.herokuapp.com'

module.exports = {
  get(data) {
    return new Promise((resolve,reject) => {
      request.get(`${apiUrl}/data/${id}/${data}`, (error,response,body) => {
        if(error){
          reject(error)
        }else {
          resolve(body)
        }  
      })
    })
  },
  post(body) {
    return new Promise((resolve,reject) => {
      request.post({
        uri:`${apiUrl}/check?id=${id}`,
        method:'POST',
        json: true,
        body: body
      },
      ( error, response ) => {
        if( error ) {
          reject(error)
        } else {
          resolve(response.body)
        }
      })
    })
  }
}
