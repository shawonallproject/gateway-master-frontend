import axios from 'axios';

const getDevice = () => {
  return {
    queryFn() {
      return axios.get<any>(``).then(({ data }) => data);
    },
    queryKey: ['getDevice'],
  };
};
const getDeviceById = (id: number) => {
  return {
    queryFn() {
      return axios.get<any>(`${id}`).then(({ data }) => data);
    },
    queryKey: ['getDeviceById', id],
  };
};
const createDevice = () => {
  return {
    mutationFn(input: any) {
      return axios.post<any>(``, input).then(({ data }) => data);
    },
  };
};

export const deviceService = {
  getDevice,
  getDeviceById,
  createDevice,
};
