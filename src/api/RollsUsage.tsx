import axiosInstance from "./AxiosInstance";

// Rolls Usage Summary
export const getRollsUsageSummary = async () => {
  const response = await axiosInstance.get("/rolls_usage/summary");
  return response.data;
};

// Vehicle-wise usage
export const getOwnerVehicleUsage = async (ownerId: number) => {
  const response = await axiosInstance.get(`/rolls_usage/${ownerId}/vehicles`);
  return response.data;
};

// Ticket count per owner
export const getOwnerTicketCount = async (ownerId: number, fromDate: string, toDate: string) => {
  const response = await axiosInstance.get(`/rolls_usage/${ownerId}/ticket-count`, {
    params: { from_date: fromDate, to_date: toDate },
  });
  return response.data;
};
