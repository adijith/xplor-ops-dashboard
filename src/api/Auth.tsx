import axiosInstance from "./AxiosInstance";

export const loginOperationsUser = async (employeeId: string, password: string) => {
  const response = await axiosInstance.post(
    `/auth/operations/login?employee_id=${employeeId}&password=${password}`
  );
  return response.data;
};
