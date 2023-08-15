// libraries
import { Box, styled, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus,
} from "../../store/users.store";

const ButtonsBlock = styled(Box)`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

const Users = () => {
  const navigate = useNavigate();
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );
  const columns = groupedColumns;
  const isLoading = useSelector(getUsersLoadingStatus());

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
      <BasicTable
        items={usersWithoutCurrentUser}
        itemsColumns={columns}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Users;
