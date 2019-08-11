/**
 * Arquivo de configuração do documento que irá persistir no MongoDB
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        psicologo: {
            idPsicologo: { type: Schema.Types.ObjectId, required: true },
        },
//        registros: [{
//            idRegistro: { type: Schema.Types.ObjectId, required: true },
//        }],
        criadoEm: { type: Date, default: Date.now }
    }
)

module.exports = mongoose.model('Paciente', Paciente);
