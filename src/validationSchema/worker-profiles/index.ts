import * as yup from 'yup';
import { applicationValidationSchema } from 'validationSchema/applications';

export const workerProfileValidationSchema = yup.object().shape({
  skills: yup.string().required(),
  experience: yup.string().required(),
  availability: yup.date().required(),
  user_id: yup.string().nullable().required(),
  application: yup.array().of(applicationValidationSchema),
});
