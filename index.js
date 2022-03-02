// config inicial
// Usando Express, Nodemon e Mongoose
const express = require('express')//requisitando o express
const mangoose = require('mongoose')//requisitando mangoose
// const res = require('express/lib/response')
const { default: mongoose } = require('mongoose')//requisitando mangoose
const app = express()//atribuindo express a app
//executando o dotenv para usar o user e senha
require('dotenv').config()
// ler json
app.use(
    express.urlencoded({ //comando do express para habilitar conversão para JSON
        extended:true
    })
)
app.use(express.json())//enviando a requisição em formato JSON
//rotas da API
//importando o arquivos JS personRoutes e suas funções
const personRoutes = require('./routes/personRoutes')
//inserindo no express quais rotas serão acessadas pelo arquivo
//tudo que vier de /person vai ser inserido no arquivo
//personRoutes que foi importado para a const de mesmo nome
app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req,res) => //Quando estiver na pagina / ele apresentara a mensagem abaixo como res(resposta)
{
    //mostrar req
    //tornar rota funcional
    res.json({message: 'Oi Express!'})//resposta para rota / será um json

})
// mongodb+srv://mariano:Eu88756313@apicluster.7fhnu.mongodb.net/bancodaapi?retryWrites=true&w=majority
// entregar porta
//puxando as variaveis de user e senha de um outro ambiente
const DB_USER = process.env.DB_USER //adicionando usuario de acesso ao DB em uma constante
const DB_PASSWORD =encodeURIComponent(process.env.DB_PASSWORD)//adicionando senha de acesso ao DB em uma constante
mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.7fhnu.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
// /\ está linha faz a conexão com o banco de dados
.then(()=> {console.log("Conectado com Sucesso") //se conectar ele executará este bloco
app.listen(3000)})
.catch((err)=> console.log(err))//se houver erro ele relatará o erro