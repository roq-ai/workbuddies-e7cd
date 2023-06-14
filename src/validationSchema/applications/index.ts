import * as yup from 'yup';

export const applicationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  worker_profile_id: yup.string().nullable().required(),
  job_posting_id: yup.string().nullable().required(),
});
