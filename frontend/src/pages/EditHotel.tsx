import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotlForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

function EditHotel() {
  const { hotelId } = useParams();

    const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const {mutate, isLoading} = useMutation(apiClient.upadeMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel updated successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Failed to update hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>;
}

export default EditHotel;
