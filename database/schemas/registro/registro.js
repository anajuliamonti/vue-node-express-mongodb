/**
 * Arquivo de configuração do documento que irá persistir no MongoDB
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Paciente = require('../paciente/paciente');

const Registro = new Schema(
    {
        texto: { type: String, required: true },
        paciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    },
    { timestamps: true }
);

module.exports = mongoose.model('Registro', Registro);