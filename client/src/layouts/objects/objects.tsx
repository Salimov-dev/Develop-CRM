import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";
import { useForm } from "react-hook-form";
import { orderBy } from "lodash";
// MUI
import {
  Box,
  TextField,
  styled,
  FormControl,
  InputLabel,
  Select,
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

const Form = styled(`form`)({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  gap: "10px",
});

const ButtonsBlock = styled(Box)`
  display: flex;
  margin-bottom: 10px;
`;

const StyledTSimpleSelectField = styled(Select)(({ theme }) => ({
  minWidth: "30px",
  width: "100%",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "green", // Green border color when focused
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    "&.Mui-focused": {
      color: "white",
    },
    borderColor: "blue !important",
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: theme.palette.background.default,
    padding: "0 5px",
  },
  "& .MuiSelect-root:focus": {
    backgroundColor: "transparent", // Optional: To remove background color when focused
  },
}));

const Objects = () => {
  //  const user =  useSelector(getUserById("64c4d8922b4d5baa91ae583c"))
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const objects = useSelector(getObjectsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const columns = groupedColumns;
  const districts = useSelector(getDistrictsList());
  const [data, setData] = useState({
    address: "",
    phone: "",
    name: "",
    status: "",
  });
  const { register } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      name: "",
      status: "",
    },
  });

  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data.address.length > 0) {
      array = array.filter((obj) =>
        obj.location.address.toLowerCase().includes(data.address.toLowerCase())
      );
    }

    if (data.phone.length > 0) {
      array = array.filter((obj) => obj.contact.phone.includes(data.phone));
    }

    if (data.name.length > 0) {
      array = array.filter((obj) =>
        obj.contact.name.toLowerCase().includes(data.name.toLowerCase())
      );
    }

    if (data.status.length > 0) {
      array = array.filter((obj) =>
        obj.status.toLowerCase().includes(data.status.toLowerCase())
      );
    }

    if (selectedDistricts.length > 0) {
      return array.filter((item) =>
        selectedDistricts.includes(item.location.district)
      );
    }

    if (selectedCities.length > 0) {
      return array.filter((item) =>
        selectedCities.includes(item.location.city)
      );
    }

    return array;
  }, [data, objects, selectedDistricts, selectedCities]);

  // console.log("objectStatuses", objectStatuses);
  // console.log("selectedCities", selectedCities);
  // console.log("selectedDistricts", selectedDistricts);
  // console.log("searchedObjects", searchedObjects);
  // console.log("districts", districts);
  console.log("data", data);
  // console.log("objects", objects);
  // console.log("user", user);

  const getActualCitiesList = () => {
    const filteredCities = objects?.map((dist) => dist.location.city);
    const uniqueCities = [...new Set(filteredCities)];
    const sortedCities = orderBy(uniqueCities, ["name"], ["asc"]);

    return sortedCities;
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeCities = (
    event: SelectChangeEvent<typeof searchedObjects>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCities(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDistricts = (
    event: SelectChangeEvent<typeof selectedDistricts>
  ) => {
    const {
      target: { value },
    } = event;
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
          Создать объект
        </Button>
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

      <Form>
        <SimpleSelectField
          itemsList={objectStatuses}
          onChange={handleChange}
          value={data.status}
          id="status"
          labelId="status-label"
          label="Выбор по статусу"
        />
      </Form>

      <BasicTable items={searchedObjects} itemsColumns={columns} />
    </>
  );
};

export default Objects;
