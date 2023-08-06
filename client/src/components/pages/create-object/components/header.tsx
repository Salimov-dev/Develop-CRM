import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ isEmptyFindedObject, getCity, getAddress }) => {
  return (
    <Component>
      <h1>Редактировать объект:</h1>
      {isEmptyFindedObject ? (
        <Typography variant="h3" sx={{ background: "yellow", color: "black" }}>
          {getCity()}, {getAddress()}
        </Typography>
      ) : (
        <Typography variant="h3" sx={{ background: "yellow", color: "black" }}>
          Выберите объект на карте
        </Typography>
      )}
    </Component>
  );
};

export default Header;
