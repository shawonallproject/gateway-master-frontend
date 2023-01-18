import { BaseResponse } from '../index';

export type Gateway = {
  Name: string;
  _id: string;
  SerialNumber: string;
  IPV4Address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetAllGatewayResponse = BaseResponse<Gateway[]>;
export type GetGatewayByIdResponse = BaseResponse<Gateway>;

export type CreateGatewayInput = {
  SerialNumber: string;
  IPV4Address: string;
  Name: string;
};

export type CreateGatewayResponse = BaseResponse<Gateway>;
