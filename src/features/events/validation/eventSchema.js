import * as yup from 'yup'
import { MESSAGES_FIELD } from '../../../stores/MESSAGES'

export const eventSchema = yup.object().shape({
  name: yup
    .string()
    .required(MESSAGES_FIELD.REQUIRED),
  description: yup
    .string()
    .required(MESSAGES_FIELD.REQUIRED),
  reservations: yup
    .array()
    .min(1, MESSAGES_FIELD.REQUIRED) 
    .required(MESSAGES_FIELD.REQUIRED),
  programs: yup
    .array()
    .min(1, MESSAGES_FIELD.REQUIRED) 
    .required(MESSAGES_FIELD.REQUIRED),
  audiences: yup
    .array()
    .min(1, MESSAGES_FIELD.REQUIRED) 
    .required(MESSAGES_FIELD.REQUIRED),
  idTipo: yup
    .number()
    .required(MESSAGES_FIELD.REQUIRED),
  scope: yup
    .string()
    .required(MESSAGES_FIELD.REQUIRED),
  axis: yup
    .string()
    .required(MESSAGES_FIELD.REQUIRED),
  themes: yup
    .array()
    .min(1, MESSAGES_FIELD.REQUIRED) 
    .max(3, "Sólo puede seleccionar hasta 3 temáticas") 
    .required(MESSAGES_FIELD.REQUIRED),
})