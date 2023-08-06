import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
// components
import ObjectInfo from "./components/object-info";
import ObjectDescription from "./components/object-description";
import Header from "./components/header";
import { getObjectById } from "../../../store/objects.store";

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));

  return (
    <Box>
      <Header object={object} />
      <ObjectInfo object={object} />
      <ObjectDescription object={object} />
    </Box>
  );
};

export default ObjectPage;
