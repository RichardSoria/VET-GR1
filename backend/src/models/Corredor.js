import mongoose, { Schema, model } from 'mongoose';

const corredorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    inauguracion: {
      type: Date,
      required: true,
    },
    "integracion alimentador": {
      type: String,
      required: true,
    },
    "integracion corredores": {
      type: String,
      required: true,
    },
    longitud: {
      type: String,
      required: true,
    },
    "tipo de servicio": {
      type: String,
      required: true,
    },
    vehiculos: {
      trolebus: {
        type: Number,
        required: true,
      },
      biarticulados: {
        type: Number,
        required: true,
      },
      mb0500: {
        type: Number,
        required: true,
      },
    },
    "demanda diaria": {
      type: String,
      required: true,
    },
    tarifa: {
      normal: {
        type: Number,
        required: true,
      },
      reducida: {
        type: Number,
        required: true,
      },
      preferencial: {
        type: Number,
        required: true,
      },
    },
    historia: {
      type: String,
      required: true,
    },
    paradas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Parada',  
      }
    ]
  },
  {
    timestamps: true,
  },
  { collection: 'corredores' }
);

export default model('Corredores', corredorSchema);
