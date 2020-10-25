const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
var access_token=''

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  next();
});

app.post('/auth', (req, res) => {
  const { client_id, redirect_uri, client_secret, code } = req.body;
  const data = {};
  data["client_id"] = client_id;
  data["client_secret"] = client_secret;
  data["code"] = code;
  data["redirect_uri"] = redirect_uri;

  axios({
    url: 'https://github.com/login/oauth/access_token',
    method: "POST",
    dataType: "json",
    cache: false,
    data: data,
    contentType: "application/json; charset=UTF-8",
    timeout: 40000,
  }).then((response) => {
    let str = response.data.split(/&|=/).map(ele => ele);
    access_token = str[1];
    const scope = str[3];
    const token_type = str[5];
    axios({
      url: 'https://api.github.com/user',
      headers: { Authorization: `bearer ${access_token}` },
      method: "GET",
      dataType: "json",
      cache: false,
      contentType: "application/json; charset=UTF-8",
      timeout: 40000,
    }).then((response) => {
      
      return res.send({
        "status": true,
        "statusCode": 200,
        "message": "Successfully authenticated",
        "result": response.data
      })
    }).catch(error => {
      return res.send({
        "status": false,
        "message": error.message,
        "result": error
      })
    })
  }).catch(error => {
    res.send({
      "status": false,
      "message": error.message,
      "result": error
    })
  });

})

app.get('/repo',(req,res)=>{
  axios({
    url: 'https://api.github.com/user/repos',
    headers: { Authorization: `bearer ${access_token}` },
    method: "GET",
    dataType: "json",
    cache: false,
    contentType: "application/json; charset=UTF-8",
    timeout: 40000,
  }).then((response) => {
    res.send({
      "status": true,
      "statusCode": 200,
      "message": "Successfully get info for Repo",
      "result": response.data
    })
  }).catch(error => {
    res.send({
      "status": false,
      "message": error.message,
      "result": error
    })
  })
})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));