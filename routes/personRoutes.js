const router = require('express').Router()//requisitando o metodo Router do express
const req = require('express/lib/request')
const Person = require('../models/Person')//requisitando o model Person para definir o padrão de user

//Create = Criação de dados
router.post('/', async  (req, res) => //inserindo dados para o banco de dados usando o modelo Person.js já criado
//adicionado async para só responder quando os valores estiverem OK
{
    // req.body
    //{name: "Mariano", salary: 5000, approved: false}
    const {name, salary, approved} = req.body
    //valida se o campo nome está preenchido
    if(!name)
    {
        res.status(422).json({error:'O nome é obrigatorio'})
    }
    //adicionando os itens ao modelo Person a ser criado
    const person = {
        name,
        salary,
        approved
    }
    //metodo create
    try {
        //criando dados
        //o modelo person vai ser criado e preenchido com 
        //os dados recolhidos por person na constante acima
        //os atributos de person foram requeridos pelo req.body
        await Person.create(person)
        //enviando mensagem de retorno bem sucedido
        res.status(201).json({message:'Pessoa inserida no sistema com sucesso!!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})
//Read - leitura de daods
router.get('/', async(req,res)=>{
    try {
        //constante 'people' para retornar todos os dados da colection
        //await para esperar que todos os dados venha
        const people = await Person.find()
        //resposta mostrando o status 200 de que deu tudo certo
        //em seguida envia o person convertido para json
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
    }

})
//passando ID como parametro de busca
router.get('/:id', async(req,res) => 
{
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        //atribuindo a person apenas UM dado que é o ID neste caso
        const person = await Person.findOne({_id: id})
        //testando se o nome consta na coleção person
        if(!person){
            res.status(424).json({message: 'O usuario não foi encontrado'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Update - Atualização de Dados 
//(PUT(total) - atualiza todos os campos , PATCH(parcial) - atualiza apenas alguns campos)
router.patch('/:id', async(req,res) =>{
    //recebendo id como parametro e inserindo em const id
    const id = req.params.id
    //puxando os dados do body informando quais dados serão atualizados

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }
    try {
        
        //constante updatePerson recebe os valores a sere atualizados
        //em person na chave id
        const updatePerson = await Person.updateOne({_id: id}, person)
        //matechedCount informa quantos registros foram atualizados
        //se o valor for === 0 então ele não atualizou com sucesso
        //sendo assim ele retorna o erro 424 e a mensagem de erro
        if(updatePerson.matchedCount === 0)
        {
            res.status(424).json({message: 'O usuario não foi encontrado'})
            return
        }
        res.status(200).json(person)
        res.status('Usuario atualizado com sucesso!')

    } catch (error) {
        res.status(500).json({error: error})
    }
})
//Delete - Deletar dados
router.delete('/:id', async(req,res) =>
{
    const id = req.params.id
    const person = await Person.findOne({_id: id})
    //teste se o item ID existe no banco
    if (!person) 
    {
        res.status(422).json({message: 'O usuario não foi encontrado!'})
        return
    }
    try {
        //função para deletar baseado no id do request
        await Person.deleteOne({_id:id})
        res.status(200).json({message: 'Usuario removido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router