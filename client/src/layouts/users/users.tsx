// libraries
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { useForm } from "react-hook-form";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filter-panel";
import ButtonsBlock from "./components/buttons-block";
import { groupedColumns } from "./table/columns";
// store
import {
  getCurrentUserId,
  getUsersList,
  getUsersLoadingStatus,
} from "../../store/users.store";
// hooks
import useSearchUser from "../../hooks/use-search-user";

const initialState = {
  lastName: "",
  phone: "",
  email: "",
  status: "",
  contract: {
    startDate: "",
    endDate: "",
  },
  gender: "",
  selectedUsers: [],
};

const Users = () => {
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const columns = groupedColumns;
  const isLoading = useSelector(getUsersLoadingStatus());
  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUserId
  );

  const localStorageState = JSON.parse(
    localStorage.getItem("search-users-data")
  );

  const { register, watch, setValue, reset } = useForm({
    defaultValues: localStorageState || initialState,
    mode: "onBlur",
  });

  const data = watch();
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);

  const searchedUsers = useSearchUser({
    users: usersWithoutCurrentUser,
    data,
  });

  const handleKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isDigit && !isBackspace) {
      e.preventDefault();
    }
  };

  const getActualUsersList = () => {
    const actualUsersArray = usersWithoutCurrentUser?.map((u) => {
      const foundObject = users?.find((user) => user._id === u._id);
      return foundObject
        ? {
            _id: foundObject._id,
            name: `${foundObject.name.lastName} ${foundObject.name.firstName}`,
          }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("search-users-data", JSON.stringify(initialState));
  }, []);

  return (
    <Box>
      <h1>Менеджеры</h1>
      <ButtonsBlock
        isInputEmpty={isInputEmpty}
        reset={reset}
        initialState={initialState}
      />
      <FiltersPanel
        data={data}
        itemsList={getActualUsersList()}
        register={register}
        setValue={setValue}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
      />
      <BasicTable
        items={searchedUsers}
        itemsColumns={columns}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Users;
