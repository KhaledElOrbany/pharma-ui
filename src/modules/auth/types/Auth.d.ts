type LoginData = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
  expiresIn: number;
};

type AuthState = {
  token: string | null;
};

export { LoginData, LoginResponse, AuthState };
