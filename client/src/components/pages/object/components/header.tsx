import Loader from "../../../common/loader/loader";
import { Box, styled } from "@mui/material";
import ButtonsPanel from "./buttons-panel";
import ObjectName from "./object-name";

const Component = styled(Box)``;

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Header = ({ isLoading, city, district, address }) => {
  return (
    <Component>
      {!isLoading ? (
        <HeaderContainer>
          <ObjectName city={city} district={district} address={address} />
          <ButtonsPanel />
        </HeaderContainer>
      ) : (
        <Loader />
      )}
    </Component>
  );
};

export default Header;
