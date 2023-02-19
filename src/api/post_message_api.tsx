import api from "./api";

export const postMessageAPI = {
  //sort-name
  async getPostOrderByNameDB(name: string = "", page: number = 0) {
    const res = await api.get<GetAllMessageAPIType>(
      `post/sort-name/?query=${name}&page=${page}`
    );
    return res.data;
  },
  //registrationDB
  async registrationDB(name: string, email: string, password: string) {
    const res = await api.post<any>("user", {
      name,
      email,
      password,
    });
    return res.data;
  },
  // sendAnswerDB
  async postAnswerDB(
    name: string,
    email: string,
    message: string,
    homePage: string,
    childId: number,
    selectedFile: any,
    userId: number = 1
  ) {
    const myFiles = selectedFile;
    const formData = new FormData();
    Object.keys(myFiles).forEach((key) => {
      formData.append("file", myFiles[key]);
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("homePage", homePage);
    formData.append("userId", JSON.stringify(userId));
    formData.append("childId", JSON.stringify(childId));
    const config = { headers: { "content-type": "multipart/form-data" } };
    const res = await api.post<SendAnswerType>("post", formData, config);
    return res.data;
  },
  // sendMessageDB
  async postMessageDB(
    name: string,
    email: string,
    message: string,
    homePage: string,
    selectedFile: any,
    userId: number = 1
  ) {
    const myFiles = selectedFile;
    const formData = new FormData();
    Object.keys(myFiles).forEach((key) => {
      formData.append("file", myFiles[key]);
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("homePage", homePage);
    formData.append("userId", JSON.stringify(userId));
    const config = { headers: { "content-type": "multipart/form-data" } };
    const res = await api.post<GetAllMessageAPIType>("post", formData, config);
    return res.data;
  },
  //getAllMessageAPI
  async getAllMessageAPI() {
    const res = await api.get<GetAllMessageAPIType>("post");
    return res.data;
  },
};

export type GetAllMessageAPIType = {
  count: number;
  rows: GetAllMessageNewAPIType[];
};

export type GetAllMessageNewAPIType = {
  id: number;
  name: string;
  email: string;
  message: string;
  homePage: string;
  file: string;
  userId: number;
  childId: null;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  child: SendAnswerType[];
};

export type SendAnswerType = {
  id: number;
  name: string;
  email: string;
  message: string;
  homePage: string;
  file: string;
  userId: number;
  childId: number | null;
  createdAt: string;
  updatedAt: string;
};
