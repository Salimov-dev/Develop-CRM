// libraries
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// MUI
import { Box, styled, InputAdornment, Button } from "@mui/material";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
// components
import TextFieldStyled from "../../common/inputs/text-field-styled";
import DatePickerStyled from "../../common/inputs/date-picker";
import SimpleSelectField from "../../common/inputs/simple-select-field";
// store
import { getUserStatusesList } from "../../../store/user-statuses.store";
// schema
import { managerSchema } from "../../../schemas/schemas";
import { addNewManager } from "../../../store/users.store";

const FieldsContainer = styled(Box)`
  width: 100%;
  display: flex;
  gap: 4px;
`;

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const FooterButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const initialState = {
  email: "",
  password: "",
  status: "",
  contacts: {
    firstName: "",
    surName: "",
    lastName: "",
    phone: "",
  },
  contract: {
    startDate: "",
    endDate: "",
    trialPeriod: "",
  },
};

const CreateManager = () => {
  const userStatuses = useSelector(getUserStatusesList());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(managerSchema),
  });

  const watchTrialStatus = watch("status");
  const isTrialStatusSelected = watchTrialStatus === "64da643f547d1cfcd04b1dc8";

  const onSubmit = (data) => {
    const newData = {
      ...data,
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    };
    // console.log("newData", newData);
    dispatch(addNewManager(newData))
      .then(navigate("/users"))
      .then(toast.success("Менеджер успешно добавлен!"));
  };

  const handleBackPage = () => {
    // navigate(isEditMode ? `/objects/${objectId}` : "/objects");
  };

  return (
    <Box>
      <h1>Добавить нового менеджера</h1>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ marginRight: "auto" }}>
          <h3>Контактные данные</h3>
        </Box>

        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Фамилия"
            type="text"
            name="contacts.lastName"
            errors={errors?.contacts?.lastName}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">Ф</InputAdornment>,
            }}
            inputProps={{ maxLength: 3 }}
          />
          <TextFieldStyled
            register={register}
            label="Имя"
            type="text"
            name="contacts.firstName"
            errors={errors?.contacts?.firstName}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">И</InputAdornment>,
            }}
            inputProps={{ maxLength: 3 }}
          />
          <TextFieldStyled
            register={register}
            label="Отчество"
            type="text"
            name="contacts.surName"
            errors={errors?.contacts?.surName}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">О</InputAdornment>,
            }}
            inputProps={{ maxLength: 3 }}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contacts.phone"
            errors={errors?.contacts?.phone}
            onInputQuantities={12}
            // errors={errors?.contact?.phone}
            valueAsNumber={true}
            helperText={"Только в формате 79098887766, 78129998877, 9302211"}
            isHelperText={true}
            // value={user?.contacts?.phone}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Трудовой договор</h3>
        </Box>
        <FieldsContainer>
          <DatePickerStyled
            register={register}
            name="contract.startDate"
            label="Начало договора"
            errors={errors?.contract?.startDate}
            onChange={(value) => setValue("contract.startDate", value)}
          />
          <DatePickerStyled
            register={register}
            name="contract.endDate"
            label="Окончание договора"
            errors={errors?.contract?.endDate}
            onChange={(value) => setValue("contract.endDate", value)}
          />
          <DatePickerStyled
            register={register}
            name="contract.trialPeriod"
            label="Окончание испыт.срока"
            disabled={!isTrialStatusSelected}
            helperText={
              !isTrialStatusSelected
                ? "Активно на статусе `Испытательный срок`"
                : ""
            }
            color="green"
            onChange={(value) => setValue("contract.trialPeriod", value)}
          />
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Аккаунт в CRM</h3>
        </Box>
        <FieldsContainer>
          <SimpleSelectField
            itemsList={userStatuses}
            name="status"
            labelId="status"
            label="Статус"
            errors={errors?.status}
            register={register}
          />
          <TextFieldStyled
            register={register}
            label="Email"
            type="text"
            name="email"
            errors={errors?.email}
            onInputQuantities={25}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextFieldStyled
            register={register}
            label="Пароль"
            type="text"
            name="password"
            errors={errors?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <FooterButtons>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            disabled={!isValid}
          >
            Создать
            {/* {isEditMode ? "Сохранить" : "Создать"} */}
          </Button>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleBackPage}
            >
              Отмена
            </Button>
          </Box>
        </FooterButtons>
      </Form>
    </Box>
  );
};

export default CreateManager;
