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

app.post("/modify", (req, res) => {
	if(req.body.project_name == undefined){
		res.send(JSON.stringify({
			"statusCode": 404,
			"message": "Project name must be required"
		}))
	}else{
		let json = JSON.parse(fs.readFileSync("codes.json", "utf8"))
		let keys = JSON.parse(fs.readFileSync("keys.json", "utf8"))
		let i = 0
		while(json[i][req.body.project_name] == undefined && i < json.length){
			i++
		}
		if(json[i][req.body.project_name] == undefined){
			let code = "01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
			let c = ""
			for(let i = 0; i < 6; i++){
				c += code[Math.floor(Math.random() * code.length)]
			}
			while(keys[c] != undefined){
				c = ""
				for(let i = 0; i < 6; i++){
					c += code[Math.floor(Math.random() * code.length)]
				}
			}
			keys[c] = json.length - 1
			
		}else{
			if(req.body.project_code == undefined){
				res.send(JSON.stringify({
					"statusCode": 400,
					"message": "The Project Code must be required if the project is already existed."
				}))
			}else{
				let key = keys[req.body.project_code]
				if(json[key]['name'] == req.body.project_name){
					// Goods
				}else{
					res.send(JSON.stringify({
						"statusCode": 400,
						"message": "Project name not match"
					}))
				}
			}
		}
	}
})

app.listen(PORT, () => {
	console.log(`Currently Listening to Default PORT: ${PORT}`)
})