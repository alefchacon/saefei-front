import * as yup from 'yup'
import { MESSAGES_FIELD } from '../../../stores/MESSAGES'

export const eventSchema = yup.object().shape({
  name: yup.string().required(MESSAGES_FIELD.REQUIRED),
})