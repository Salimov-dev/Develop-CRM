import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
// components
import ObjectInfo from "./components/object-info";
import ObjectDescription from "./components/object-description";
import Header from "./components/header";
// store
import { getDistrictById } from "../../../store/districts.store";
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/objects.store";

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));

  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const city = object?.location.city;
  const address = object?.location.address;
  const district = useSelector(getDistrictById(object?.location.district));

  return (
    <Box>
      <Header
        isLoading={isObjectsLoading}
        city={city}
        district={district}
        address={address}
      />
      <ObjectInfo object={object} />
      <ObjectDescription object={object} />
    </Box>
  );
};

export default ObjectPage;
