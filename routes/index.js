const mongoose = require('mongoose')
const Gas = mongoose.model("GAS")

exports.leta = (req,res)=>{
    const {gas,smoke,flame} = req.params
    const gas_db = new Gas()
    const date = new Date()
    const currentDate = date.toLocaleDateString("en-us",{timeZone:"Africa/Nairobi"})
    const currentTime = date.toLocaleTimeString("en-us",{timeZone:"Africa/Nairobi"})
    gas_db.gas = gas;
    gas_db.smoke = smoke;
    gas_db.flame = flame;
    gas_db.date = currentDate;
    gas_db.time = currentTime;
    gas_db.save((err,docs)=>{
            if(!err){
                send_sms()
                res.send("SUCCESS")
            }
    })
}

exports.pata = (req,res)=>{
   Gas.find((err,docs)=>{
        if (!err){
            res.json(docs)
        }
    })
}


const axios = require("axios");
const https = require("https");
var btoa = require("btoa");

const api_key = "21bccf4112ebd27c";
const secret_key = "MWIyNjdiM2QxYWRhNzliNTllMWQxYTk3NDU3NzA1MDFlNzJiNmNhZWI5MWE3NGY1ZDI0OGNiOGExOGYxZTU4Yg==";
const content_type = "application/json";
const source_addr ="INFO";

function send_sms() {
    Gas.find((err,docs)=>{
        if (!err){
            if (docs[docs.length-1].gas > 2000){
              caller(docs[docs.length-1].gas,"gas","ppm")
            }
            if (docs[docs.length-1].smoke > 2000){
              caller(docs[docs.length-1].smoke,"smoke","ppm")
            }
            if (docs[docs.length-1].flame == 1){
              caller(docs[docs.length-1].flame,"flame"," ")
            }
           
        }
    })
  
  
}

function caller(val,content,unit){
    axios
    .post(
      "https://apisms.beem.africa/v1/send",
      {
        source_addr: source_addr,
        schedule_time: "",
        encoding: 0,
        message: `The ${content} is ${val} ${unit} `,
        recipients: [
          {
            recipient_id: 1,
            dest_addr: "255759499365",
          },
        ],
      },
      {
        headers: {
          "Content-Type": content_type,
          Authorization: "Basic " + btoa(api_key + ":" + secret_key),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    )
    .then((response) => console.log(response, api_key + ":" + secret_key))
    .catch((error) => console.error(error.response.data));
}

send_sms()

