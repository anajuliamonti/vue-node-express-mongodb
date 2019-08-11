const HttpStatus = require('http-status-codes');
var express = require('express');
var router = express.Router();

const Paciente = require('../../database/schemas/paciente/paciente');

/**
 * Função que faz a busca de pacientes
 * O parâmetro 'id' é opcional e segue a regex
 * definida na rota: ([0-9a-fA-F]{24})? => 24 caracteres
 * aceitando letras (maiúsculas e minúsculas) e números
 * 
 * Esta rota aceita 2 variações:
 * [1] => GET http://localhost:3333/api/v1/paciente => retorna todas as pacientes
 * [2] => GET http://localhost:3333/api/v1/paciente/<id> => retorna uma paciente buscando pelo ID
 * 
 * Esta rota sempre retornará um vetor. No caso de uma
 * busca por id o retorno será um vetor de somente um elemento.
 */
router.get('/:id([0-9a-fA-F]{24})?', async (req, res, next) => {
    let pacientes= []; //Vetor que será retornado

    let id = req.params.id; //Recebendo o valor do id da URL

    try {
        if (id && id != null) {//Testando se foi passado ID na requisição
            pacientes= await Paciente.findById(id).lean(); //Buscando paciente por ID
            //A função 'lean()' serve para converter o objeto retornado pelo mongoose em um json
        } else {
            pacientes= await Paciente.find().lean(); //Buscando todas as pacientes
        }

        res.status(HttpStatus.OK).send({ pacientes: pacientes}); //Devolvendo um vetor com todos os registros encontrados
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error }); //Caso houver um erro, será retornado na response
    }
});

/**
 * Função que faz a criação de uma paciente
 * 
 * POST http://localhost:3333/api/v1/paciente
 * 
 * Body:
{
    "dadosPessoais": {
        "nome": <nome>,
        "rg": <rg>,
        "cpf": <cpf>
    },
    "contato": {
        "email": <email>,
        "telefone": <telefone>
    },
    "acesso": {
        "usuario": <usuario>,
        "senha": <senha>
    },
}
 */
router.post('/', async (req, res, next) => {
    try {
        let paciente = await Paciente.create(req.body);

        res.status(HttpStatus.CREATED).send({ paciente: paciente });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error });
    }
});

/**
 * Função que faz a atualização de uma paciente por ID
 * Nesta função o ID segue o mesmo regex da função de
 * busca de pacientes, porém não é um parâmetro opcional
 * por isto no regex removemos o '?'.
 * 
 * PATCH http://localhost:3333/api/v1/paciente
 * 
 * Body:
{
    "dadosPessoais": {
        "nome": <nome>,
        "rg": <rg>,
        "cpf": <cpf>
    },
    "contato": {
        "email": <email>,
        "telefone": <telefone>
    }
}
 */
router.patch('/:id([0-9a-fA-F]{24})', async (req, res, next) => {
    try {
        let id = req.params.id; //Recebendo o valor do id da URL
        let result = await Paciente.findByIdAndUpdate(id, req.body).lean(); //Buscando paciente por id e atualizando seus dados

        if (result != null) { //Caso o resultado não seja nulo, quer dizer que encontramos um registro para atulizar e ele foi atualizado
            let paciente = await Paciente.findById(id); //Buscamos o registro atualizado
            res.status(HttpStatus.OK).send({ paciente: paciente });
        } else {
            res.status(HttpStatus.BAD_REQUEST).send({ result: result });
        }
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error });
    }
});

router.delete('/:id([0-9a-fA-F]{24})', async (req, res, next) => {
    try {
        let id = req.params.id; //Recebendo o valor do id da URL
        let result = await Paciente.findByIdAndDelete(id); //Buscando paciente por id e atualizando seus dados

        if (result != null) { //Caso o resultado não seja nulo, quer dizer que encontramos um registro para excluir e ele foi excluido
            res.status(HttpStatus.NO_CONTENT).send(); //Não retornamos nenhuma informação, isso quer dizer que o Paciente foi excluida
        } else {
            res.status(HttpStatus.BAD_REQUEST).send({ result: result });
        }
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: error });
    }
});

module.exports = router;
