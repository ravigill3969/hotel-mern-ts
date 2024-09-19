import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotlForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

import * as apiClient from "../api-client";

function AddHotel() {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added successfully", type: "SUCCESS" });
    },

    onError: () => {
      showToast({ message: "Failed to add hotel", type: "ERROR" });
    },
  });

  const handleSave =(hotelFormData :FormData) => {
    mutate(hotelFormData);
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>;
}

export default AddHotel;
