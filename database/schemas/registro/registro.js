/**
 * Arquivo de configuração do documento que irá persistir no MongoDB
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Registro = new Schema(
    {
        paciente: {
            idPaciente: { type: Schema.Types.ObjectId, required: true },
        },
        registro:
        {
            texto: { type: String, required: true }
        },
        criadoEm: { type: Date, default: Date.now }
    })

    module.exports = mongoose.model('Registro', Registro);