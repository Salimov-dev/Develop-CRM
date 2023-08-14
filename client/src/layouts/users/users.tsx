// libraries
import { Box, styled, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ButtonsBlock = styled(Box)`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

const Users = () => {
    const navigate = useNavigate()
  return (
    <Box>
      <h1>Менеджеры</h1>
      <ButtonsBlock>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("create")}
        >
          <Typography>Добавить менеджера</Typography>
        </Button>
        {/* {isInputEmpty && (
          <Button
            variant="outlined"
            color="success"
            onClick={() => reset(initialState)}
            sx={{ display: "flex", alignItems: "center", gap: "3px" }}
          >
            <Typography> Очистить фильтры</Typography>
            <ClearOutlinedIcon />
          </Button>
        )} */}
      </ButtonsBlock>
    </Box>
  );
};

export default Users;
