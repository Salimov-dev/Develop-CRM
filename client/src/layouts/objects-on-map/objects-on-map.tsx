/* eslint-disable no-undef */
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/objects.store";
import { useMemo } from "react";
import { styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { getUsersList } from "../../store/users.store";
import MultiSelectField from "../../components/common/inputs/multi-select-field";
import Map from "./components/map";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const initialState = {
  user: "",
  managers: [],
};

const ObjectsOnMap = () => {
  const objects = useSelector(getObjectsList());
  const users = useSelector(getUsersList());

  const { watch, setValue, reset } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
  });

  const selectedManagers = [watch().managers];
  const selectedManagersArray = Object.assign([], ...selectedManagers);

  const searchedObjects = useMemo(() => {
    let array = objects;
    if (selectedManagersArray.length > 0) {
      array = array.filter((obj) => selectedManagersArray.includes(obj.userId));
    }
    return array;
  }, [selectedManagersArray]);

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

  return (
    <>
      <h1>Объекты на карте</h1>
      <Form noValidate>
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={selectedManagersArray}
          onChange={(e) => setValue("managers", e.target.value)}
          name="managers"
          labelId="managers-label"
          label="Выбор по менеджеру"
        />
      </Form>
      <Map searchedObjects={searchedObjects} />
    </>
  );
};

export default ObjectsOnMap;
