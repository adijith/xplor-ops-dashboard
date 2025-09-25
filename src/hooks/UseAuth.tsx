import { useMutation } from "@tanstack/react-query";
import { loginOperationsUser } from "../api/Auth";

export function useLogin() {
  return useMutation({
    mutationFn: ({ employeeId, password }: { employeeId: string; password: string }) =>
      loginOperationsUser(employeeId, password),
    // Remove onSuccess callback - let the component handle the success flow
  });
}
