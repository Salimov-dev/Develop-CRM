// libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import {
  Box,
  Button,
  Typography,
  Paper,
  styled,
  Divider,
  InputAdornment,
  FormGroup,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
// components
import TextFieldStyled from "../../common/form/text-field-styled";
import SimpleSelectFieldMUI from "../../common/form/simple-select-field-mui";
import { getDistrictsList } from "../../../store/districts.store";
import { getMetroList } from "../../../store/metro.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import SwitchStyled from "../../common/form/switch-styled";
import useFindObject from "../../../hoc/useFindObject";
import FindObjectOnMap from "./components/FindObjectOnMap";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  background-color: gray;
`;

const objectSchema = yup.object().shape({
  // status: yup.string().required("Статус обязателен для заполнения"),
  contact: yup.object().shape({
    // phone: yup.string().required("Телефон обязателен для заполнения"),
    name: yup
      .string()
      .transform((value) => (value === undefined ? null : value.trim()))
      .matches(/^([^0-9]*$)/, "Имя не должно содержать цифры")
      .matches(/[^a-zA-Z]+/g, "Вводите только русские буквы"),
    email: yup.string().email("Некорректный адрес электронной почты"),
  }),
  location: yup.object().shape({
    // city: yup.string().required("Город обязателен для заполнения"),
    // address: yup.string().required("Адрес обязателен для заполнения"),
    district: yup.string().required("Район обязателен для заполнения"),
    metro: yup.string(),
  }),
  lastContact: yup.object().shape({
    // result: yup.string().required("Результат обязателен для заполнения"),
  }),
  description: yup.object().shape({
    fullDescription: yup
      .string()
      .required("Полное описание обязательно для заполнения"),
  }),
});

const initialState = {
  status: "",
  contact: {
    phone: "",
    name: "",
    position: "",
    email: "",
  },
  location: {
    city: "",
    address: "",
    district: "",
    metro: "",
  },
  estateOptions: {
    rentPrice: "",
    rentPriceForMetr: "",
    securityDeposit: "",
    rentalHolidays: "",
    totalSquare: "",
    rentSquare: "",
    premisesHeight: "",
    premisesFloor: "",
  },
  accordTerms: {
    readyToRent: false,
    readyToContract: false,
    readyToRenovation: false,
  },
  lastContact: {
    result: "",
  },
  description: {
    fullDescription: "",
  },
};

const CreateObject = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    // resolver: yupResolver(objectSchema),
  });

  const isFormValid = !Object.keys(errors).length;

  const onSubmit = (data) => {
    console.log("data", data);
  };

  const districts = useSelector(getDistrictsList());
  const metros = useSelector(getMetroList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const objectStatuses = useSelector(getObjectsStatusList());

  const {
    findLocality,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  // console.log("watch", watch("contact.name"));

  // console.log(Object.keys(findedObject).length > 0 && findLocality());
  // console.log(Object.keys(findedObject).length > 0 && getLatitudeCoordinates());
  // console.log(Object.keys(findedObject).length > 0 && getLongitudeCoordinates());
  const city = findedObject?.description;
  const address = findedObject?.name;

  console.log(watch("contact.name"));

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box>
      <h1>Создать новый объект</h1>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Map>
          <FindObjectOnMap />
        </Map>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Адрес</h3>
        </Box>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Населеленный пункт"
            name="location.city"
            errors={errors?.location?.city}
          />
          <TextFieldStyled
            register={register}
            label="Адрес"
            name="location.address"
            errors={errors?.location?.address}
          />
          <SimpleSelectFieldMUI
            itemsList={districts}
            name="location.district"
            labelId="district"
            label="Район"
            register={register}
          />
          <SimpleSelectFieldMUI
            itemsList={metros}
            name="location.metro"
            labelId="district"
            label="Метро"
            register={register}
          />
        </FieldsContainer>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Контактная информация</h3>
        </Box>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Контакт"
            name="contact.name"
            errors={errors?.contact?.name}
            InputProps={{
              maxLength: 70,
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <SimpleSelectFieldMUI
            itemsList={workingPositions}
            name="contact.position"
            labelId="position"
            label="Позиция"
            register={register}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contact.phone"
            errors={errors?.contact?.phone}
            valueAsNumber={true}
            InputProps={{
              maxLength: 70,
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Email"
            name="contact.email"
            errors={errors?.contact?.email}
            InputProps={{
              maxLength: 70,
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Коммерческая информация</h3>
        </Box>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Общая площадь"
            type="number"
            name="estateOptions.totalSquare"
            valueAsNumber={true}
            InputProps={{
              maxLength: 5,
              endAdornment: <InputAdornment position="end">м²</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Площадь аренды"
            type="number"
            name="estateOptions.rentSquare"
            valueAsNumber={true}
            InputProps={{
              maxLength: 4,
              endAdornment: <InputAdornment position="end">м²</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Стоимость аренды"
            type="number"
            name="estateOptions.rentPrice"
            valueAsNumber={true}
            InputProps={{
              maxLength: 7,
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Стоимость 1м²"
            type="number"
            name="estateOptions.rentPriceForMetr"
            valueAsNumber={true}
            InputProps={{
              maxLength: 5,
              endAdornment: (
                <InputAdornment position="end">₽/м²</InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Каникулы"
            type="number"
            name="estateOptions.rentalHolidays"
            valueAsNumber={true}
            InputProps={{
              maxLength: 3,
              endAdornment: (
                <InputAdornment position="end">дней</InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Обеспечительный платёж"
            type="number"
            name="estateOptions.securityDeposit"
            valueAsNumber={true}
            InputProps={{
              maxLength: 7,
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />
        </FieldsContainer>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Другие параметры</h3>
        </Box>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <SimpleSelectFieldMUI
              itemsList={objectStatuses}
              name="status"
              labelId="status"
              label="Статус объекта"
              register={register}
            />
            <TextFieldStyled
              register={register}
              label="Высота потолков"
              type="number"
              name="estateOptions.premisesHeight"
              valueAsNumber={true}
              InputProps={{
                maxLength: 3,
                endAdornment: <InputAdornment position="end">м</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Состояние полов"
              name="estateOptions.premisesFloor"
              inputProps={{ maxLength: 100 }}
            />
          </Box>
          <FormGroup sx={{ paddingTop: "10px" }}>
            <SwitchStyled
              register={register}
              name="accordTerms.readyToContract"
              label="Собственник согласен на нашу форму договора"
            />
            <SwitchStyled
              register={register}
              name="accordTerms.readyToRent"
              label="Готов сдавать под нашу деятельность"
            />
            <SwitchStyled
              register={register}
              name="accordTerms.readyToRenovation"
              label="Собственник готов сделать ремонт за свой счёт"
            />
          </FormGroup>
        </FieldsContainer>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Описание объекта</h3>
        </Box>
        <TextFieldStyled
          register={register}
          label="Опишите объект"
          name="description.fullDescription"
          rows="3"
          errors={errors?.description?.fullDescription}
          inputProps={{ maxLength: 3500 }}
        />
        <Button type="submit" color="success">
          Создать
        </Button>
      </Form>
    </Box>
  );
};

export default CreateObject;
