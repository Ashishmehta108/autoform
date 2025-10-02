export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  refreshToken: string;
};

export type Address = {
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};
