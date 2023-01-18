export * from './gateway';
export * from './device';

export type BaseResponse<TData> = {
  success: boolean;
  message?: string;
  data: TData;
};
