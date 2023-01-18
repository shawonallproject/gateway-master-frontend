import axios from 'axios';

import { API_URL } from '../../environment/environment';
import {
  CreateDeviceResponse,
  CreateDeviceInput,
  GetAllDeviceResponse,
  GetDeviceByGatewayIdResponse,
} from '../../types';

const getDevice = () => {
  return {
    queryFn() {
      return axios
        .get<GetAllDeviceResponse>(`${API_URL}/device/all`)
        .then(({ data }) => data);
    },
    queryKey: ['getDevice'],
  };
};
const getDeviceByGatewayId = (id: string) => {
  return {
    queryFn() {
      return axios
        .get<GetDeviceByGatewayIdResponse>(`${API_URL}/device/gateway/${id}`)
        .then(({ data }) => data);
    },
    queryKey: ['getDeviceByGatewayId', id],
  };
};
const createDevice = () => {
  return {
    mutationFn(input: CreateDeviceInput) {
      return axios
        .post<CreateDeviceResponse>(`${API_URL}/device`, input)
        .then(({ data }) => data);
    },
  };
};

export const deviceService = {
  getDevice,
  getDeviceByGatewayId,
  createDevice,
};
