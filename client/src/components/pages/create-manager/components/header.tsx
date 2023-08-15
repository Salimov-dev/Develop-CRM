import { Box, styled, Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <h1>Добавить нового менеджера</h1>
      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={() => navigate("/users")}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        Назад
      </Button>
    </HeaderContainer>
  );
};

export default Header;
