import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, styled } from "@mui/material";
// components
import ObjectsOnMap from "../../common/elements-on-map/objects-on-map";
import ObjectInfo from "./components/object-info";
import Header from "./components/header";
// store
import { getObjectById } from "../../../store/objects.store";

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  flex: 5;
  display: flex;
  background: gray;
  margin-bottom: 20px;
`;

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));

  return (
    <Box>
      <Header object={object} />
      <Map>
        <ObjectsOnMap object={object} />
      </Map>
      <ObjectInfo object={object} />
    </Box>
  );
};

export default ObjectPage;
