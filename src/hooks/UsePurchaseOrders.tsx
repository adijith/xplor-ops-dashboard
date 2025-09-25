import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listPurchaseOrders,
  createPurchaseOrder,
  deletePurchaseOrder,
  updatePurchaseOrder,
} from "../api/PurchaseOrder";

// Fetch list
export function usePurchaseOrders(filters: any) {
  return useQuery({
    queryKey: ["purchaseOrders", filters],
    queryFn: () => listPurchaseOrders(filters),
    staleTime: 1000 * 60 * 1, 
    refetchOnWindowFocus: true,
  });
}

// Create new PO
export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPurchaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
  });
}

// Delete PO
export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePurchaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
  });
}

// ✅ Update PO
export function useUpdatePurchaseOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updatePurchaseOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
  });
}
