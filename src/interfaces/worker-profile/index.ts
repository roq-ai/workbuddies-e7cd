import { ApplicationInterface } from 'interfaces/application';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WorkerProfileInterface {
  id?: string;
  skills: string;
  experience: string;
  availability: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  application?: ApplicationInterface[];
  user?: UserInterface;
  _count?: {
    application?: number;
  };
}

export interface WorkerProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  skills?: string;
  experience?: string;
  user_id?: string;
}
