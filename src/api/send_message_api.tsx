import api from "./api";

export const sendMessageAPI = {
  async sendMessageDB(name: string, email: string, message: string, homePage: string) {
    const res = await api.post<GetAllMessageAPIType>("message", {
      name,
      email,
      message,
      homePage, 
    });
    return res.data;
  },
  //getAllMessageAPI
  async getAllMessageAPI() {
    const res = await api.get<GetAllMessageAPIType[]>("message");
    return res.data;
  },
};

type ResponseType = 200 | 500;
type SendMessageDBType = {
  status: ResponseType;
};

export type GetAllMessageAPIType = {
  createdAt: string
  email: string
  home: string
  id: number
  message: string
  name: string
  updatedAt: string
}

