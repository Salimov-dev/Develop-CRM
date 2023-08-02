import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";
import { getUserById } from "../../store/users-store";
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
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDistrictById, getDistrictsList } from "../../store/districts-store";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "green",
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: theme.palette.background.default,
    padding: "0 5px",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
}));

const Form = styled(`form`)({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  gap: "10px",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Objects = () => {
  //  const user =  useSelector(getUserById("64c4d8922b4d5baa91ae583c"))
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const objects = useSelector(getObjectsList());
  const columns = groupedColumns;
  const districts = useSelector(getDistrictsList());
  const [data, setData] = useState({
    address: "",
    phone: "",
    name: "",
    districts: [],
  });
  const { register } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      name: "",
      districts: [],
    },
  });
  // console.log("districts", districts);
  console.log("selectedDistricts", selectedDistricts);
  // console.log("data", data);
  // console.log("objects", objects);
  // console.log("user", user);

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

    if (selectedDistricts.length > 0) {
      return array.filter((item) =>
        selectedDistricts.includes(item.location.district)
      );
    }

    return array;
  }, [data, objects, selectedDistricts]);
  console.log("searchedObjects", searchedObjects);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filteredDistricts = objects?.map((dist) => dist.location.district);
  const uniqueDistricts = [...new Set(filteredDistricts)];
  const actualDistrictsArray = uniqueDistricts?.map((id) => {
    const foundObject = districts?.find((obj) => obj._id === id);
    return foundObject
      ? { _id: foundObject._id, name: foundObject.name }
      : null;
  });

  const sortedDistricts = orderBy(actualDistrictsArray, ["name"], ["asc"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeMulti = (
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
      <Form onSubmit={handleSubmit}>
        <StyledTextField
          {...register("address")}
          label="Найти по адресу"
          type="search"
          variant="outlined"
          // size="small"
          id="address"
          name="address"
          onKeyDown={handleAddressKeyDown}
          value={data.address}
          onChange={handleChange}
          inputProps={{ maxLength: 30 }}
        />
        <StyledTextField
          {...register("phone")}
          label="Найти по телефону"
          type="search"
          variant="outlined"
          // size="small"
          id="phone"
          name="phone"
          onKeyDown={handlePhoneKeyDown}
          value={data.phone}
          onChange={handleChange}
          inputProps={{ maxLength: 12 }}
        />
        <StyledTextField
          {...register("name")}
          label="Найти по имени"
          type="search"
          variant="outlined"
          // size="small"
          id="name"
          name="name"
          onKeyDown={handleNameKeyDown}
          value={data.name}
          onChange={handleChange}
          inputProps={{ maxLength: 30 }}
        />
        <FormControl sx={{ width: 300 }}>
          <InputLabel
            id="districts-label"
            sx={{
              color: "gray !important",
              "&.Mui-focused": {
                color: "white !important",
              },
            }}
          >
            Выбрать по району
          </InputLabel>
          <StyledSelect
            labelId="districts-label"
            id="districts"
            multiple
            value={selectedDistricts}
            onChange={handleChangeMulti}
            input={<OutlinedInput label="Выбор по району" />}
            renderValue={(selected) => {
              const selectedDistrictNames = selected.map((districtId) => {
                const district = sortedDistricts.find(
                  (dist) => dist._id === districtId
                );
                return district ? district.name : "";
              });
              return selectedDistrictNames.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {sortedDistricts?.map((dist) => (
              <MenuItem key={dist._id} value={dist._id}>
                <Checkbox
                  checked={selectedDistricts.indexOf(dist._id) > -1}
                  sx={{ color: "white !important" }}
                />
                <ListItemText primary={dist.name} />
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Form>
      <BasicTable items={searchedObjects} itemsColumns={columns} />
    </>
  );
};

export default Objects;
