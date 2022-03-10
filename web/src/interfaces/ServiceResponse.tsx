type ServiceResponse<T> =
  | {
      isError: false;
      errorMessage?: string;
      data: T;
    }
  | {
      isError: true;
      errorMessage: string;
      data?: T;
    };

export default ServiceResponse;
