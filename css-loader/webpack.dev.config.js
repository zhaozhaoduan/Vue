var path = require('path')
module.exports={
	entry:{
		"main": "./main.js"
	},
	output: {
		path: path.resolve(./dish),//相对路径转绝对路径
		"filename": "./build.js"
	},
	watch: true, 
}