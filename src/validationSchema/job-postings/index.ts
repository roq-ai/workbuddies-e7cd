import * as yup from 'yup';
import { applicationValidationSchema } from 'validationSchema/applications';

export const jobPostingValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  organization_id: yup.string().nullable().required(),
  application: yup.array().of(applicationValidationSchema),
});
