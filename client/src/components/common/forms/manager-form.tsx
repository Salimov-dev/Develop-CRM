import TextFieldStyled from "../inputs/text-field-styled";
// MUI
import { Box, styled, InputAdornment, Button } from "@mui/material";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import { useNavigate } from "react-router-dom";
import DatePickerStyled from "../inputs/date-picker";
import SimpleSelectField from "../inputs/simple-select-field";
import { gendersArray } from "../../../mock/genders";

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

const ManagerForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  setValue,
  isTrialStatusSelected,
  userStatuses,
  isValid
}) => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate("/users");
    // navigate(isEditMode ? `/objects/${objectId}` : "/objects");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ marginRight: "auto" }}>
        <h3>Менеджер</h3>
      </Box>
      <FieldsContainer sx={{ display: "flex", flexDirection: "column" }}>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Фамилия"
            type="text"
            name="name.lastName"
            errors={errors?.name?.lastName}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">Ф</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Имя"
            type="text"
            name="name.firstName"
            errors={errors?.name?.firstName}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">И</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Отчество"
            type="text"
            name="name.surName"
            errors={errors?.name?.surName}
            onInputQuantities={25}
            InputProps={{
              endAdornment: <InputAdornment position="end">О</InputAdornment>,
            }}
          />
        </FieldsContainer>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contacts.phone"
            errors={errors?.name?.phone}
            onInputQuantities={12}
            // errors={errors?.contact?.phone}
            valueAsNumber={true}
            helperText={"Только в формате 79098887766, 78129998877, 9302211"}
            isHelperText={true}
            // value={user?.name?.phone}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIphoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <DatePickerStyled
            register={register}
            name="birthday"
            label="Дата рождения"
            errors={errors?.birthday}
            onChange={(value) => setValue("birthday", value)}
          />
          <SimpleSelectField
            itemsList={gendersArray}
            name="gender"
            labelId="gender"
            label="Пол"
            errors={errors?.gender}
            register={register}
          />
        </FieldsContainer>
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
  );
};

export default ManagerForm;
