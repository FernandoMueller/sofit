const express = require('express')
const app = express()
const api = require('./js/utils/api')
const calculate = require('./js/controllers/calculateCtrl')

app.get('/',(req,res)=>{
  res.send(calculate.consumeDay())
})
app.get('/prices',(req,res)=>{
  api.get('prices').then( response => {
      res.send(JSON.parse(response))
    }
  ).catch(error=>{
    res.send(error)
  })
})
app.get('/supplies',(req,res)=>{
  api.get('supplies').then(response => {
      res.send(JSON.parse(response))
    }
  ).catch(error=>{
    res.send(error)
  })
})

app.get('/spents',(req,res)=>{
  api.get('spents').then(response => {
      res.send(JSON.parse(response))
    }
  ).catch(error=>{
    res.send(error)
  })
})

app.listen(3000, ()=>{
  console.log('listening on port 3000')
})