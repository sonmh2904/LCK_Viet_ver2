import instance from "../customizeAPI";

export interface Information {
  _id: string;
  fullName: string;
  phoneNumber: string;
  province?: string;
  district?: string;
  description?: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateInformationRequest {
  fullName: string;
  phoneNumber: string;
  province?: string;
  district?: string;
  description?: string;
}

export interface UpdateInformationRequest {
  status: "pending" | "completed";
}

export const getAllInformation = async (): Promise<Response> => {
  return await instance.get("/information");
};

export const getInformationById = async (id: string): Promise<Response> => {
  return await instance.get(`/information/${id}`);
};

export const addInformation = async (data: CreateInformationRequest): Promise<Response> => {
  return await instance.post("/information", data);
};

export const updateInformation = async (id: string, data: UpdateInformationRequest): Promise<Response> => {
  return await instance.put(`/information/${id}`, data);
};