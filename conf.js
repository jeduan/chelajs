var fs = require('fs'),
	enviroment;

var readConf = function (filePath) {
	var conf = fs.readFileSync(filePath).toString();

	return JSON.parse(conf);
};

if( process.env.NODE_ENV === 'production' ){
	enviroment = readConf('./config/prod.json');
	enviroment.env = "production";
}else{
	enviroment = readConf('./config/dev.json');
	enviroment.env = "development";
}

module.exports = enviroment;