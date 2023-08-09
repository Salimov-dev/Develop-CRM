// libraries
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// MUI
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// components
import SearchField from "../../../components/common/inputs/search-field";
import MultiSelectField from "../../../components/common/inputs/multi-select-field";
import {
  Box,
  styled,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
// store
import { getUsersList } from "../../../store/users.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { getDistrictsList } from "../../../store/districts.store";

const Form = styled(`form`)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const ButtonsBlock = styled(Box)`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

const FiltersPanel = ({
  setValue,
  objects,
  data,
  initialState,
  register,
  reset,
}) => {
  const isInputEmpty = JSON.stringify(initialState) !== JSON.stringify(data);
  const objectStatuses = useSelector(getObjectsStatusList());
  const districts = useSelector(getDistrictsList());
  const users = useSelector(getUsersList());
  const navigate = useNavigate();

  const isOnlyPhoneChecked = data?.onlyWithPhone;

  const handleKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isDigit && !isBackspace) {
      e.preventDefault();
    }
  };
  const getActualCitiesList = () => {
    const filteredCities = objects?.map((dist) => dist.location.city);
    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    return sortedCities;
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
  const getActualDistrictsList = () => {
    const filteredDistricts = objects?.map((dist) => dist.location.district);
    const uniqueDistricts = [...new Set(filteredDistricts)];

    const actualDistrictsArray = uniqueDistricts?.map((id) => {
      const foundObject = districts?.find((obj) => obj._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedDistricts = orderBy(actualDistrictsArray, ["name"], ["asc"]);

    return sortedDistricts;
  };

  return (
    <>
      <ButtonsBlock>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("create")}
        >
          <Typography>Создать объект</Typography>
        </Button>
        {isInputEmpty && (
          <Button
            variant="outlined"
            color="success"
            onClick={() => reset(initialState)}
            sx={{ display: "flex", alignItems: "center", gap: "3px" }}
          >
            <Typography> Очистить фильтры</Typography>
            <ClearOutlinedIcon />
          </Button>
        )}
      </ButtonsBlock>
      <Form>
        <SearchField
          register={register}
          label="Найти по адресу"
          name="address"
          onKeyDown={handleKeyDown}
          value={data.address}
          inputProps={{ maxLength: 30 }}
        />
        <SearchField
          register={register}
          label="Найти по телефону"
          name="phone"
          onKeyDown={handleKeyDown}
          value={data.phone}
          inputProps={{ maxLength: 12 }}
        />
        <SearchField
          register={register}
          label="Найти по имени"
          name="name"
          onKeyDown={handleKeyDown}
          value={data.name}
          inputProps={{ maxLength: 30 }}
        />
        <MultiSelectField
          itemsList={getActualStatusesList()}
          selectedItems={data.selectedStatuses}
          onChange={(e) => setValue("selectedStatuses", e.target.value)}
          name="status"
          labelId="status-label"
          label="Выбор по статусу"
        />
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={data.selectedUsers}
          onChange={(e) => setValue("selectedUsers", e.target.value)}
          name="users"
          labelId="users-label"
          label="Выбор по менеджеру"
        />

        <Box>
          <FormControl
            component="fieldset"
            sx={{
              padding: "4px 15px 4px 0px",
              border: "1px solid",
              borderColor: isOnlyPhoneChecked ? "green" : "gray",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FormGroup aria-label="position" row sx={{ width: "100%" }}>
              <FormControlLabel
                {...register("onlyWithPhone")}
                control={
                  <Switch
                    color="success"
                    checked={data.onlyWithPhone}
                    onChange={(e) => {
                      setValue("onlyWithPhone", e.target.checked);
                    }}
                  />
                }
                label="Объекты с телефоном"
                labelPlacement="start"
                sx={{
                  width: "100%",
                  color: isOnlyPhoneChecked ? "white" : "gray",
                }}
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Form>
      <Form>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            {...register("startDate")}
            value={data.startDate}
            onChange={(e) => setValue("startDate", value)}
            label="Начало периода"
            sx={{
              width: "450px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: data.startDate ? "green" : "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& label.Mui-focused": {
                color: "white", // Изменение цвета label на белый при фокусе
              },
              "& .MuiButtonBase-root": {
                color: data.startDate ? "white" : "gray",
              },
            }}
          />
          <DatePicker
            {...register("endDate")}
            value={data.endDate}
            onChange={(value) => setValue("endDate", value)}
            label="Конец периода"
            sx={{
              width: "450px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: data.endDate ? "green" : "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray",
              },
              "& label.Mui-focused": {
                color: "white", // Изменение цвета label на белый при фокусе
              },
              "& .MuiButtonBase-root": {
                color: data.endDate ? "white" : "gray",
              },
            }}
          />
        </LocalizationProvider>
        <MultiSelectField
          itemsList={getActualCitiesList()}
          selectedItems={data.selectedCities}
          onChange={(e) => setValue("selectedCities", e.target.value)}
          name="cities"
          labelId="cities-label"
          label="Выбор по городу"
        />
        <MultiSelectField
          itemsList={getActualDistrictsList()}
          selectedItems={data.selectedDistricts}
          onChange={(e) => setValue("selectedDistricts", e.target.value)}
          name="districts"
          labelId="districts-label"
          label="Выбор по району"
        />
      </Form>
    </>
  );
};

export default FiltersPanel;
