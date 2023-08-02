import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";
import { useForm } from "react-hook-form";
import { orderBy } from "lodash";
import "dayjs/locale/ru";
// MUI
import {
  Box,
  TextField,
  styled,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  Checkbox,
  Button,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDistrictsList } from "../../store/districts-store";
import SearchField from "../../components/common/form/search-field";
import MultiSelectField from "../../components/common/form/multi-select-field";
import SimpleSelectField from "../../components/common/form/simple-select-field";
import { getObjectsStatusList } from "../../store/object-status.store";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { getUsersList } from "../../store/users-store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

const Objects = () => {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(false);
  const users = useSelector(getUsersList());
  const objects = useSelector(getObjectsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const columns = groupedColumns;
  const districts = useSelector(getDistrictsList());
  const { register } = useForm();
  const [data, setData] = useState({
    address: "",
    phone: "",
    name: "",
    startDate: null,
    endDate: null,
  });
  console.log("data", data);

  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data?.address.length) {
      array = array?.filter((obj) =>
        obj.location.address.toLowerCase().includes(data.address.toLowerCase())
      );
    }

    if (data?.phone.length) {
      array = array.filter((obj) => obj.contact.phone.includes(data.phone));
    }

    if (data?.name.length) {
      array = array.filter((obj) =>
        obj.contact.name.toLowerCase().includes(data.name.toLowerCase())
      );
    }

    if (selectedStatuses?.length) {
      array = array?.filter((obj) => selectedStatuses.includes(obj.status));
    }

    if (selectedDistricts?.length) {
      return array.filter((item) =>
        selectedDistricts.includes(item.location.district)
      );
    }

    if (selectedCities?.length) {
      return array.filter((item) =>
        selectedCities.includes(item.location.city)
      );
    }

    if (selectedUsers?.length) {
      return array.filter((item) => selectedUsers.includes(item.userId));
    }

    if (startDateSelected && endDateSelected) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      return array?.filter((item) => {
        const itemDate = dayjs(item.created_at);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    }

    if (startDateSelected) {
      const selectedDate = dayjs(data.startDate);
      return array?.filter((item) => dayjs(item.created_at) >= selectedDate);
    }

    if (endDateSelected) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array.filter((item) => dayjs(item.created_at) <= endDate);
    }

    return array;
  }, [
    data,
    objects,
    selectedDistricts,
    selectedCities,
    selectedUsers,
    selectedStatuses,
    startDateSelected,
    endDateSelected,
  ]);

  const hasNonEmptyValue = (data) => {
    for (const key in data) {
      if (typeof data[key] === "string" && data[key].trim().length > 0) {
        return true;
      }
    }
    return false;
  };

  const isInputEmpty =
    selectedCities.length ||
    selectedDistricts.length ||
    selectedUsers.length ||
    selectedStatuses?.length ||
    hasNonEmptyValue(data) ||
    startDateSelected ||
    endDateSelected;

  const handleCLearForm = () => {
    setSelectedCities([]);
    setSelectedDistricts([]);
    setSelectedUsers([]);
    setSelectedStatuses([]);
    setStartDateSelected(null);
    setEndDateSelected(null);

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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStartDateChange = (newValue) => {
    setData((prevState) => ({ ...prevState, startDate: newValue }));
    setStartDateSelected(true);
  };

  const handleEndDateChange = (newValue) => {
    setData((prevState) => ({ ...prevState, endDate: newValue }));
    setEndDateSelected(true);
  };

  const handleChangeStatuses = ({ target }) => {
    const { value } = target;
    setSelectedStatuses(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeUsers = ({ target }) => {
    const { value } = target;
    setSelectedUsers(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeCities = ({ target }) => {
    const { value } = target;
    setSelectedCities(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDistricts = ({ target }) => {
    const { value } = target;
    setSelectedDistricts(typeof value === "string" ? value.split(",") : value);
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
    const keyCode = e.keyCode || e.which;
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

  return (
    <>
      <h1>Таблица объектов</h1>
      <ButtonsBlock>
        <Button variant="contained" color="success">
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
          onChange={handleChange}
          inputProps={{ maxLength: 30 }}
        />
        <SearchField
          register={register}
          label="Найти по телефону"
          name="phone"
          onKeyDown={handlePhoneKeyDown}
          value={data.phone}
          onChange={handleChange}
          inputProps={{ maxLength: 12 }}
        />
        <SearchField
          register={register}
          label="Найти по имени"
          name="name"
          onKeyDown={handleNameKeyDown}
          value={data.name}
          onChange={handleChange}
          inputProps={{ maxLength: 30 }}
        />
        <MultiSelectField
          itemsList={getActualStatusesList()}
          selectedItems={selectedStatuses}
          onChange={handleChangeStatuses}
          id="status"
          labelId="status-label"
          label="Выбор по статусу"
        />
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={selectedUsers}
          onChange={handleChangeUsers}
          id="users"
          labelId="users-label"
          label="Выбор по менеджеру"
        />
      </Form>

      <Form>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <DatePicker
            views={["year", "month", "day"]}
            value={data.startDate}
            onChange={handleStartDateChange}
            label="Начало периода"
            renderInput={(params) => (
              <>
                <InputLabel
                  htmlFor={params.inputProps.id}
                  style={{
                    color: params.inputProps.focused ? "white" : "gray",
                  }}
                >
                  {params.label}
                </InputLabel>
                {renderCustomInput(params)}
              </>
            )}
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
            }}
          />
          <DatePicker
            value={data.endDate}
            onChange={handleEndDateChange}
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
            }}
          />
        </LocalizationProvider>
        <MultiSelectField
          itemsList={getActualCitiesList()}
          selectedItems={selectedCities}
          onChange={handleChangeCities}
          id="cities"
          labelId="cities-label"
          label="Выбор по городу"
        />
        <MultiSelectField
          itemsList={getActualDistrictsList()}
          selectedItems={selectedDistricts}
          onChange={handleChangeDistricts}
          id="districts"
          labelId="districts-label"
          label="Выбор по району"
        />
      </Form>

      <BasicTable items={searchedObjects} itemsColumns={columns} />
    </>
  );
};

export default Objects;
