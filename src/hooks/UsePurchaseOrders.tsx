import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listPurchaseOrders,
  createPurchaseOrder,
  deletePurchaseOrder,
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
      // Invalidate and refetch purchase orders queries
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
  });
}

// Delete PO
export function useDeletePurchaseOrder() {
  return useMutation({
    mutationFn: deletePurchaseOrder,
  });
}
