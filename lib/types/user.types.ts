export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  refreshToken: string;
};

export interface Address {
  type: "Permanent" | "Temporary";
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}
