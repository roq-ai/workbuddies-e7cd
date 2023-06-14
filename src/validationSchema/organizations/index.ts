import * as yup from 'yup';
import { jobPostingValidationSchema } from 'validationSchema/job-postings';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  job_posting: yup.array().of(jobPostingValidationSchema),
});
