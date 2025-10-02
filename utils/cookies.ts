import { cookies } from "next/headers";

export const getCookie = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
};

export const setCookie = async (
  name: string,
  value: string,
  options?: {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
  }
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
};
