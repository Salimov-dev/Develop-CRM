// libraries
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
// MUI
import { styled, Typography, Button } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// store
import { getObjectsStatusList } from "../../store/object-status.store";
import { getObjectsList } from "../../store/objects.store";
import { getUsersList } from "../../store/users.store";
// components
import MultiSelectField from "../../components/common/inputs/multi-select-field";
import Map from "./components/map";
// hooks
import useSearchObject from "../../hooks/use-search-object";

const Form = styled(`form`)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const initialState = {
  selectedUsers: [],
  selectedStatuses: [],
};

const ObjectsOnMap = () => {
  const objects = useSelector(getObjectsList());
  const users = useSelector(getUsersList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const localStorageState = JSON.parse(
    localStorage.getItem("search-objectsonmap-data")
  );

  const { watch, setValue, reset } = useForm({
    defaultValues: localStorageState || initialState,
    mode: "onBlur",
  });
  const data = watch();
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const selectedManagersArray = Object.assign([], data.selectedUsers);
  const selectedStatusesArray = Object.assign([], data.selectedStatuses);

  const newSearchedObj = useSearchObject({
    objects,
    data,
  });

  const getActualUsersList = () => {
    const filteredUsers = objects?.map((obj) => obj.userId);
    const uniqueUsers = [...new Set(filteredUsers)];

    const actualUsersArray = uniqueUsers?.map((id) => {
      const foundObject = users?.find((user) => user._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };
  const getActualStatusesList = () => {
    const filteredStatuses = objects?.map((obj) => obj.status);
    const uniqueStatuses = [...new Set(filteredStatuses)];

    const actualStatuesArray = uniqueStatuses?.map((id) => {
      const foundObject = objectStatuses?.find((status) => status._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedStatuses = orderBy(actualStatuesArray, ["name"], ["asc"]);

    return sortedStatuses;
  };

  useEffect(() => {
    localStorage.setItem("search-objectsonmap-data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <h1>Объекты на карте</h1>
      <Form noValidate>
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={selectedManagersArray}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          name="selectedUsers"
          labelId="managers-label"
          label="Выбор по менеджеру"
        />
        <MultiSelectField
          itemsList={getActualStatusesList()}
          selectedItems={selectedStatusesArray}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          name="selectedStatuses"
          labelId="statuses-label"
          label="Выбор по статусу"
        />
        <Button
          variant="outlined"
          color="success"
          onClick={() => reset()}
          disabled={!isInputEmpty && true}
          sx={{
            width: "450px",
            height: "53px",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            whiteSpace: "nowrap",
            marginRight: "14px",
          }}
        >
          <Typography> Очистить фильтры</Typography>
          <ClearOutlinedIcon />
        </Button>
      </Form>
      <Map searchedObjects={newSearchedObj} />
    </>
  );
};

export default ObjectsOnMap;
