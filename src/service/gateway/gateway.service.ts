import axios from 'axios';

const getGateway = () => {
  return {
    queryFn() {
      return axios.get<any>(``).then(({ data }) => data);
    },
    queryKey: ['getGateway'],
  };
};
const getGatewayById = (id: number) => {
  return {
    queryFn() {
      return axios.get<any>(`${id}`).then(({ data }) => data);
    },
    queryKey: ['getGatewayById', id],
  };
};
const createGateway = () => {
  return {
    mutationFn(input: any) {
      return axios.post<any>(``, input).then(({ data }) => data);
    },
  };
};

export const gatewayService = {
  getGateway,
  getGatewayById,
  createGateway,
};
