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
  Autocomplete,
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
import { createObject } from "../../../store/objects.store";
import { getCurrentUserId } from "../../../store/users.store";

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

const FooterButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const objectSchema = yup.object().shape({
  status: yup.string().required("Статус обязателен для заполнения"),
  contact: yup.object().shape({
    // phone: yup.string().required("Телефон обязателен для заполнения"),
    name: yup.string().matches(/^([^0-9]*$)/, "Имя не должно содержать цифры"),
    email: yup.string().email("Некорректный адрес электронной почты"),
  }),
  location: yup.object().shape({
    district: yup.string().required("Район обязателен для заполнения"),
    metro: yup.string(),
  }),
  estateOptions: yup.object().shape({
    // totalSquare: yup
    // .number()
    // .min(2, "Минимум 2 символа")
    // .max(4, "Максимум 4 символа"),
    // .matches(/\d+/g, "Вводите только цифры"),
  }),
  description: yup.object().shape({
    fullDescription: yup.string(),
    // .required("Полное описание обязательно для заполнения"),
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
  description: {
    fullDescription: "",
  },
};

const CreateObject = () => {
  const districts = useSelector(getDistrictsList());
  const metros = useSelector(getMetroList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });
  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();
  const dispatch = useDispatch();
  const isEmptyFindedObject = Object.keys(findedObject).length;
  const watchName = watch("contact.name");
  const watchDistrict = watch("location.district");
  const currentUser = useSelector(getCurrentUserId());
  const company = "64c140eb8d214a0532377114"

  const onSubmit = (data) => {
    console.log("data", data);
    const newData = {
      ...data,
      userId: currentUser,
      company: company,
      location: {
        ...data.location,
        zoom: 16,
      },
    };
    console.log("newData", newData);

    dispatch(createObject(newData));
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  const handleClearForm = () => {
    reset();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <h1>Создать новый объект:</h1>
        {isEmptyFindedObject ? (
          <Typography
            variant="h3"
            sx={{ background: "yellow", color: "black" }}
          >
            {getCity()}, {getAddress()}
          </Typography>
        ) : (
          <Typography
            variant="h3"
            sx={{ background: "yellow", color: "black" }}
          >
            Выберите объект на карте
          </Typography>
        )}
      </Box>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Map>
          <FindObjectOnMap />
        </Map>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Адрес</h3>
        </Box>
        <FieldsContainer>
          <SimpleSelectFieldMUI
            itemsList={districts}
            name="location.district"
            labelId="district"
            label="Район"
            register={register}
            isHelperText={true}
            helperText="Обязательно"
          />
          <SimpleSelectFieldMUI
            itemsList={metros}
            name="location.metro"
            labelId="district"
            label="Метро"
            register={register}
            disabled={!watchDistrict && true}
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
            disabled={!watchName.length && true}
            helperText={!watchName.length && "Сначала введите имя"}
            isHelperText={true}
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
            errors={errors?.estateOptions?.totalSquare}
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
              isHelperText={true}
              helperText="Обязательно"
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
              name="accordTerms.readyToRent"
              label="Готов сдавать под нашу деятельность"
            />
            <SwitchStyled
              register={register}
              name="accordTerms.readyToContract"
              label="Собственник согласен на нашу форму договора"
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
          InputProps={{ maxLength: 3500 }}
        />
        <FooterButtons>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            disabled={!isValid || !isDirty}
          >
            Создать
          </Button>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Button
              type="submit"
              variant="outlined"
              color="success"
              onClick={handleClearForm}
            >
              Очистить форму
            </Button>
            <Button type="submit" variant="outlined" color="success">
              Отмена
            </Button>
          </Box>
        </FooterButtons>
      </Form>
    </Box>
  );
};

export default CreateObject;
