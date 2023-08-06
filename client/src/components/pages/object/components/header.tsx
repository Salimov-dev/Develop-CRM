import Loader from "../../../common/loader/loader";
import { Box, styled } from "@mui/material";
import ButtonsPanel from "./buttons-panel";
import ObjectName from "./object-name";
import { useSelector } from "react-redux";
import { getObjectsLoadingStatus } from "../../../../store/objects.store";
import { getDistrictById } from "../../../../store/districts.store";

const Component = styled(Box)``;

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Header = ({ object }) => {
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const city = object?.location.city;
  const address = object?.location.address;
  const district = useSelector(getDistrictById(object?.location.district));
  console.log("city", city);

  return (
    <Component>
      {!isObjectsLoading ? (
        <HeaderContainer>
          <ObjectName
            city={city}
            district={district}
            address={address}
          />
          <ButtonsPanel
            city={city}
            district={district}
            address={address}
          />
        </HeaderContainer>
      ) : (
        <Loader />
      )}
    </Component>
  );
};

export default Header;
