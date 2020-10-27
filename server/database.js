const mongoose= require('mongoose')

var connection = mongoose.connect('mongodb+srv://<user>:<password>@cluster0.ebc1x.mongodb.net/<database>?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true })
if(connection){
    console.log("Conexão ao mongodb")
}else{
    console.log("Erro ao conectar ao mongodb")
}
module.exports = connection;