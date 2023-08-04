import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = () => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/objects");
  };

  return (
    <Component>
      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={handleBackPage}
      >
        Назад к объектам
      </Button>
      <Button color="secondary" variant="contained" sx={{ height: "50px" }}>
        Редактировать
      </Button>
    </Component>
  );
};

export default ButtonsPanel;
