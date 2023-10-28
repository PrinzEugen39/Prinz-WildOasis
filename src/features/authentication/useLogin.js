import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: userLogin, isLoading: isLoginIn } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Successfully logged in");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log("ERROR", err);
    },
  });

  return { userLogin, isLoginIn };
}
