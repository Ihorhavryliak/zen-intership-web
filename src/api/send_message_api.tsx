import api from "./api";

export const sendMessageAPI = {
  async sendMessageDB(name: string, email: string, message: string) {
    const res = await api.post<SendMessageDBType>("message", {
      name,
      email,
      message,
    });
    return res.data;
  },
};

type ResponseType = 200 | 500;
type SendMessageDBType = {
  status: ResponseType;
};
