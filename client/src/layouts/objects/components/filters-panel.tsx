// libraries
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
// MUI
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// components
import SearchField from "../../../components/common/inputs/search-field";
import MultiSelectField from "../../../components/common/inputs/multi-select-field";
import { Box, styled, Typography, Button } from "@mui/material";
// store
import { getUsersList } from "../../../store/users.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { getDistrictsList } from "../../../store/districts.store";
import { useNavigate } from "react-router-dom";

const Form = styled(`form`)({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const ButtonsBlock = styled(Box)`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

const FiltersPanel = ({ setValue, objects, data, register }) => {
  const users = useSelector(getUsersList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const districts = useSelector(getDistrictsList());
  const navigate = useNavigate();

  const hasNonEmptyValue = (data) => {
    for (const key in data) {
      if (typeof data[key] === "string" && data[key].trim().length > 0) {
        return true;
      }
    }
    return false;
  };

  const isInputEmpty =
    data.selectedCities.length ||
    data.selectedDistricts.length ||
    data.selectedUsers.length ||
    data.selectedStatuses?.length ||
    hasNonEmptyValue(data) ||
    data.startDate ||
    data.endDate;

  const handleCLearForm = () => {
    setSelectedCities([]);
    setSelectedDistricts([]);
    setSelectedUsers([]);
    setSelectedStatuses([]);

    for (const key in data) {
      if (key === "startDate" || key === "endDate") {
        setData((prevState) => ({
          ...prevState,
          [key]: null,
        }));
      } else {
        setData((prevState) => ({
          ...prevState,
          [key]: "",
        }));
      }
    }
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

  const getActualCitiesList = () => {
    const filteredCities = objects?.map((dist) => dist.location.city);
    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    return sortedCities;
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

  const handleAddressKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isDigit && !isBackspace) {
      e.preventDefault();
    }
  };

  const handlePhoneKeyDown = (e) => {
    const keyCode = e.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    const isDigit = /^\d$/.test(keyValue);
    const isBackspace = keyCode === 8;

    if (!isDigit && !isBackspace) {
      e.preventDefault();
    }
  };

  const handleNameKeyDown = (e) => {
    const keyValue = e.key;
    const isRussianLetter = /^[А-ЯЁа-яё]$/.test(keyValue);
    const isBackspace = e.keyCode === 8;

    if (!isRussianLetter && !isBackspace) {
      e.preventDefault();
    }
  };

  const handleCreateObject = () => {
    navigate("create");
  };

  return (
    <>
      <ButtonsBlock>
        <Button
          variant="contained"
          color="success"
          onClick={handleCreateObject}
        >
          <Typography>Создать объект</Typography>
        </Button>
        {isInputEmpty && (
          <Button
            variant="outlined"
            color="success"
            onClick={handleCLearForm}
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
          onKeyDown={handleAddressKeyDown}
          value={data.address}
          inputProps={{ maxLength: 30 }}
        />
        <SearchField
          register={register}
          label="Найти по телефону"
          name="phone"
          onKeyDown={handlePhoneKeyDown}
          value={data.phone}
          inputProps={{ maxLength: 12 }}
        />
        <SearchField
          register={register}
          label="Найти по имени"
          name="name"
          onKeyDown={handleNameKeyDown}
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
      </Form>
      <Form>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            {...register("startDate")}
            value={data.startDate}
            onChange={(value) => setValue("startDate", value)}
            label="Начало периода"
            sx={{
              width: "400px",
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
              width: "400px",
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
