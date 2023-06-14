import axios from 'axios';
import queryString from 'query-string';
import { WorkerProfileInterface, WorkerProfileGetQueryInterface } from 'interfaces/worker-profile';
import { GetQueryInterface } from '../../interfaces';

export const getWorkerProfiles = async (query?: WorkerProfileGetQueryInterface) => {
  const response = await axios.get(`/api/worker-profiles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWorkerProfile = async (workerProfile: WorkerProfileInterface) => {
  const response = await axios.post('/api/worker-profiles', workerProfile);
  return response.data;
};

export const updateWorkerProfileById = async (id: string, workerProfile: WorkerProfileInterface) => {
  const response = await axios.put(`/api/worker-profiles/${id}`, workerProfile);
  return response.data;
};

export const getWorkerProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/worker-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWorkerProfileById = async (id: string) => {
  const response = await axios.delete(`/api/worker-profiles/${id}`);
  return response.data;
};
