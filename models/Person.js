const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')
//basicamente neste JS criamos o modelo que o mangoose ira trabalhar para converter 
//os dados para o banco de dados
//inserimos quais chaves serão criadas e quais seus respectivos tipos
//o modelo a ser seguido pela constante Person que será usado em todo o codigo
const Person = mongoose.model('Person', 
{
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person //exportando o Person para o sistema