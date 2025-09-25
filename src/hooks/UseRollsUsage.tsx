import { useQuery } from "@tanstack/react-query";
import { getRollsUsageSummary, getOwnerVehicleUsage } from "../api/RollsUsage";

// Rolls summary
export function useRollsUsageSummary() {
  return useQuery({
    queryKey: ["rollsUsageSummary"],
    queryFn: getRollsUsageSummary,
    staleTime: 1000 * 60 * 180, 
    refetchOnWindowFocus: true,
  });
}

// Owner vehicle-wise usage
export function useOwnerVehicleUsage(ownerId: number) {
  return useQuery({
    queryKey: ["rollsUsageVehicles", ownerId],
    queryFn: () => getOwnerVehicleUsage(ownerId),
    enabled: !!ownerId, // only run if ownerId is set
  });
}
