/**
 * Arquivo de configuração do documento que irá persistir no MongoDB
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Psicologo = require('../psicologo/psicologo').schema;
// const Registro = require('../registro/registro').schema;

const Paciente = new Schema(
    {
        dadosPessoais: {
            nome: { type: String, default: null },
            rg: { type: String, default: null },
            cpf: { type: String, default: null }
        },
        contato: {
            email: { type: String, default: null },
            telefone: { type: String, default: null }
        },
        acesso: {
            usuario: { type: String, required: true, unique: true },
            senha: { type: String, default: 'miojo123' },
            ultimoLogin: { type: Date, default: null }
        },
        psicologo: {type: Schema.Types.ObjectId, ref: 'Psicologo'}
    },
    { timestamps: true }
)

module.exports = mongoose.model('Paciente', Paciente);
