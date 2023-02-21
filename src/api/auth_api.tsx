import api from "./api";

export const authAPI = {

  // getUser 
  async getUser(id: number) {
    const res = await api.get<GetUserType>(
      `user/id/?id=${id}`
    );
    return res.data;
  },
  //sort-name
  async loginDB(email: string, password: string) {
    const res = await api.post<LoginType >("auth/login", { email, password });
    return res.data;
  },
  //registrationDB
  async registrationDB(name: string, email: string, password: string) {
    const res = await api.post<LoginType>("auth/registration", {
      name,
      email,
      password,
    });
    return res.data;
  },
};

export type LoginType = {
    token: string;
};

export type GetUserType ={
  "id": number,
  "name": string,
  "email": string,
  "password": string,
}