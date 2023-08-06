import { Box, Typography, styled } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Header = ({ object }) => {
  return (
    <Component>
      <h1>Редактировать объект:</h1>
      <Typography variant="h3" sx={{ background: "yellow", color: "black" }}>
        {object?.location.city}, {object?.location.address}
      </Typography>
    </Component>
  );
};

export default Header;
