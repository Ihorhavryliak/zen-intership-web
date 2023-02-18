import api from "./api";

export const sendMessageAPI = {
  //registrationDB
  async registrationDB(name: string, email: string, password: string) {
    const res = await api.post<any>("users", {
      name,
      email,
      password,
    });
    return res.data;
  },

  //  async updateCompanyDB(
  async sendMessageDB(
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
      formData.append('file', myFiles[key]);
    });
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("homePage", homePage);
    formData.append("userId", JSON.stringify(userId));
    const config = { headers: { "content-type": "multipart/form-data" } };
    const res = await api.post<GetAllMessageAPIType>("post", 
      formData,
      config
    );
    return res.data;
  },
  //getAllMessageAPI
  async getAllMessageAPI() {
    const res = await api.get<GetAllMessageAPIType[]>("post");
    return res.data;
  },
};


export type GetAllMessageAPIType = {
    id: number
    name: string
    email: string
    message: string
    homePage: string
    file: string
    userId: number
    childId: null,
    createdAt: string
    updatedAt: string
    author: {
        id: number
        name: string
        email: string
        password: string
        createdAt: string
        updatedAt: string
    },
    child: [
        {
            id: number
            name: string
            email: string
            message: string
            homePage: string
            file: string
            userId: number
            childId: number
            createdAt: string
            updatedAt: string
        },
    ]
};
