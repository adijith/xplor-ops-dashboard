import axiosInstance from "./AxiosInstance";

// Create PO
export const createPurchaseOrder = async (poData: {
  po_no: string;
  district_id: number;
  purchased_count: number;
  received_date: string;
}) => {
  try {
    const response = await axiosInstance.post("/purchase_orders/create", poData);
    console.log("Response... in API", response.data);
    return response.data;
  } catch (error: any) {
    // Handle 400 errors (like duplicate PO number) as regular responses
    if (error.response && error.response.status === 400) {
      console.log("400 Error Response...", error.response.data);
      return error.response.data; // Return the error message from server
    }
    // Re-throw other errors
    throw error;
  }
};

// List POs
export const listPurchaseOrders = async (params: any = {}) => {
  const response = await axiosInstance.get("/purchase_orders/list", { params });
  return response.data;
};

// Get PO by ID
export const getPurchaseOrder = async (id: number) => {
  const response = await axiosInstance.get(`/purchase_orders/get/${id}`);
  return response.data;
};

// Update PO
export const updatePurchaseOrder = async (id: number, poData: any) => {
  const response = await axiosInstance.put(`/purchase_orders/update/${id}`, poData);
  return response.data;
};

// Delete PO
export const deletePurchaseOrder = async (id: number) => {
  const response = await axiosInstance.delete(`/purchase_orders/delete/${id}`);
  return response.data;
};

// Get districts
export const getDistricts = async () => {
  const response = await axiosInstance.get("/purchase_orders/districts");
  return response.data;
};

// Download PO Excel
export const downloadPurchaseOrdersExcel = async (params: any = {}) => {
  const response = await axiosInstance.get("/purchase_orders/po-excel", {
    params,
    responseType: "blob",
  });
  return response.data;
};

// Download Handover Details Excel
export const downloadHandoverDetailsExcel = async () => {
  const response = await axiosInstance.get("/purchase_orders/handover-details-excel", {
    responseType: "blob",
  });
  return response.data;
};
