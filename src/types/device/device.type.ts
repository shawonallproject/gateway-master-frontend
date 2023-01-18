import { BaseResponse } from '../index';

export type Device = {
  Vendor?: string[];
  OnlineStatus: boolean;
  _id: string;
  Gateway: string;
  UID: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetAllDeviceResponse = BaseResponse<Device[]>;
export type GetDeviceByGatewayIdResponse = BaseResponse<Device[]>;

export type CreateDeviceInput = {
  Gateway: string;
  UID: number;
  OnlineStatus: boolean;
  Vendor?: string;
};

export type CreateDeviceResponse = BaseResponse<Device>;
