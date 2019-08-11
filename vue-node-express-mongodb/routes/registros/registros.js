const HttpStatus = require('http-status-codes');
var express = require('express');
var router = express.Router();

const Registro = require('../../database/schemas/registro/registro');

/**
 * Função que faz a busca de registros
 * O parâmetro 'id' é opcional e segue a regex
 * definida na rota: ([0-9a-fA-F]{24})? => 24 caracteres
 * aceitando letras (maiúsculas e minúsculas) e números
 * 
 * Esta rota aceita 2 variações:
 * [1] => GET http://localhost:3333/api/v1/registro => retorna todas as registros
 * [2] => GET http://localhost:3333/api/v1/registro/<id> => retorna uma registro buscando pelo ID
 * 
 * Esta rota sempre retornará um vetor. No caso de uma
 * busca por id o retorno será um vetor de somente um elemento.
 */
router.get('/:id([0-9a-fA-F]{24})?', async (req, res, next) => {
    let registros= []; //Vetor que será retornado

    let id = req.params.id; //Recebendo o valor do id da URL

    try {
        if (id && id != null) {//Testando se foi passado ID na requisição
            registros= await Registro.findById(id).lean(); //Buscando registro por ID
            //A função 'lean()' serve para converter o objeto retornado pelo mongoose em um json
        } else {
            registros= await Registro.find().lean(); //Buscando todas as registros
        }

        res.status(HttpStatus.OK).send({ registros: registros}); //Devolvendo um vetor com todos os registros encontrados
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error }); //Caso houver um erro, será retornado na response
    }
});

/**
 * Função que faz a criação de uma registro
 * 
 * POST http://localhost:3333/api/v1/registro
 * 
 * Body:
{
    paciente: {
        idPaciente: { type: Schema.Types.ObjectId, required: true },
    },
    registro:
    {
        texto: { type: String, required: true }
    },
}
 */
router.post('/', async (req, res, next) => {
    try {
        let registro = await Registro.create(req.body);

        res.status(HttpStatus.CREATED).send({ registro: registro });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error });
    }
});

module.exports = router;