const express = require("express")
const fs = require("fs")

const app = express()

const PORT = process.env.PORT || 3000 || 5000

app.get("/", (req, res) => {
	res.send("Kindly message <a href='https://facebook.com/MPOP.ph'>Hello World Facebook Page</a> for details.")
})

app.post("/data", (req, res) => {
	if(req.body.key == undefined){
		res.send(JSON.stringify({
			"statusCode": 404,
			"message": "You have no permission to visit this."
		}))
	}else if(req.body.key == process.env['key']){
		let json = JSON.parse(fs.readFileSync("codes.json", "utf8"))
		res.send(JSON.stringify(json))
	}else{
		res.send(JSON.stringify({
			"statusCode": 404,
			"message": "You have no permission to visit this."
		}))
	}
})

app.listen(PORT, () => {
	console.log(`Currently Listening to Default PORT: ${PORT}`)
})