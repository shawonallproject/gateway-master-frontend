import axios from 'axios';

import { API_URL } from '../../environment/environment';
import {
  CreateGatewayInput,
  GetAllGatewayResponse,
  GetGatewayByIdResponse,
} from '../../types';

const getGateway = () => {
  return {
    queryFn() {
      return axios
        .get<GetAllGatewayResponse>(`${API_URL}/gateway/all`)
        .then(({ data }) => data);
    },
    queryKey: ['getGateway'],
  };
};
const getGatewayById = (id: string) => {
  return {
    queryFn() {
      return axios
        .get<GetGatewayByIdResponse>(`${API_URL}/gateway/${id}`)
        .then(({ data }) => data);
    },
    queryKey: ['getGatewayById', id],
  };
};
const createGateway = () => {
  return {
    mutationFn(input: CreateGatewayInput) {
      return axios
        .post<any>(`${API_URL}/gateway`, input)
        .then(({ data }) => data);
    },
  };
};

export const gatewayService = {
  getGateway,
  getGatewayById,
  createGateway,
};
