import { Location, useLocation } from "react-router-dom";
import { LocationStateUserData } from "../types/LocationUserData";

export const useLocationUserData = () => {
  const location = useLocation() as Location<LocationStateUserData>;
  return location.state?.userData;
};
