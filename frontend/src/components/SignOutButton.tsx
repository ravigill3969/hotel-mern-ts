import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

function SignOutButton() {
    const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signout, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed out successfully", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 bg-white font-bold px-4 py-2 hover:bg-gray-100 rounded"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
