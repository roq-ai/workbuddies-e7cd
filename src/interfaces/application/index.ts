import { WorkerProfileInterface } from 'interfaces/worker-profile';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  status: string;
  worker_profile_id: string;
  job_posting_id: string;
  created_at?: any;
  updated_at?: any;

  worker_profile?: WorkerProfileInterface;
  job_posting?: JobPostingInterface;
  _count?: {};
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  worker_profile_id?: string;
  job_posting_id?: string;
}
