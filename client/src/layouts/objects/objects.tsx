import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { getObjectsList } from "../../store/objects.store";
import BasicTable from "../../components/common/table/basic-table";
import { groupedColumns } from "./table/columns";
import { getUserById } from "../../store/users-store";
import { useForm } from "react-hook-form";
// MUI
import { Box, TextField, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const Form = styled(`form`)({
  display: "flex",
  marginBottom: "10px",
  gap: "10px",
});

const Objects = () => {
  const objects = useSelector(getObjectsList());
  //   console.log("objects", objects);
  const columns = groupedColumns;
  //  const user =  useSelector(getUserById("64c4d8922b4d5baa91ae583c"))
  //  console.log("user", user);

  const { register } = useForm({
    defaultValues: {
      address: "",
      phone: "",
      name: "",
    },
  });

  const [data, setData] = useState({ address: "", phone: "", name: "" });
  console.log("data", data);

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

    return array;
  }, [data, objects]);

  console.log("searchedObjects", searchedObjects);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          size="small"
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          inputProps={{ maxLength: 30 }}
        />
        <StyledTextField
          {...register("phone")}
          label="Найти по телефону"
          type="search"
          variant="outlined"
          size="small"
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
          size="small"
          id="name"
          name="name"
          onKeyDown={handleNameKeyDown}
          value={data.name}
          onChange={handleChange}
          inputProps={{ maxLength: 30 }}
        />
      </Form>
      <BasicTable items={searchedObjects} itemsColumns={columns} />
    </>
  );
};

export default Objects;
