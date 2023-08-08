// MUI
import { Box, Button, styled, InputAdornment, FormGroup } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
// components
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSelectFieldMUI from "../inputs/simple-select-field-mui";
import SwitchStyled from "../inputs/switch-styled";
import { useNavigate } from "react-router-dom";

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

const FooterButtons = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const ObjectForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  districts,
  metros,
  watchDistrict,
  watchName,
  workingPositions,
  objectStatuses,
  handleClearForm,
  isEditMode = false,
  object = {},
  isValid,
  isEmptyFindedObject,
  isObjectHasAddress,
  objectId,
}) => {
  const isValidAndHasObject =
    (Boolean(isEmptyFindedObject) || isObjectHasAddress) && isValid;

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(isEditMode ? `/objects/${objectId}` : "/objects");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            defaultValue={object?.location?.district}
          />
          <SimpleSelectFieldMUI
            itemsList={metros}
            name="location.metro"
            labelId="district"
            label="Метро"
            register={register}
            disabled={!watchDistrict && true}
            defaultValue={object?.location?.metro}
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
            onInputQuantities={50}
            InputProps={{
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
            disabled={!watchName?.length && true}
            helperText={!watchName?.length && "Сначала введите имя"}
            isHelperText={true}
            defaultValue={object?.contact?.position}
          />
          <TextFieldStyled
            register={register}
            label="Телефон"
            type="number"
            name="contact.phone"
            onInputQuantities={12}
            errors={errors?.contact?.phone}
            valueAsNumber={true}
            helperText={"Только в формате 79098887766, 78129998877, 9302211"}
            isHelperText={true}
            InputProps={{
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
            onInputQuantities={100}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Коммерческие условия</h3>
        </Box>
        <FieldsContainer>
          <TextFieldStyled
            register={register}
            label="Общая площадь"
            type="number"
            name="estateOptions.totalSquare"
            valueAsNumber={true}
            errors={errors?.estateOptions?.totalSquare}
            onInputQuantities={5}
            InputProps={{
              endAdornment: <InputAdornment position="end">м²</InputAdornment>,
            }}
            inputProps={{ maxLength: 3 }}
          />
          <TextFieldStyled
            register={register}
            label="Площадь аренды"
            type="number"
            name="estateOptions.rentSquare"
            valueAsNumber={true}
            onInputQuantities={5}
            InputProps={{
              endAdornment: <InputAdornment position="end">м²</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Стоимость аренды"
            type="number"
            name="estateOptions.rentPrice"
            valueAsNumber={true}
            onInputQuantities={8}
            InputProps={{
              maxLength: 7,
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Каникулы"
            type="number"
            name="estateOptions.rentalHolidays"
            valueAsNumber={true}
            onInputQuantities={3}
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
            onInputQuantities={8}
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
              defaultValue={object?.status}
            />
            <TextFieldStyled
              register={register}
              label="Высота потолков"
              type="number"
              name="estateOptions.premisesHeight"
              valueAsNumber={true}
              onInputQuantities={3}
              InputProps={{
                endAdornment: <InputAdornment position="end">м</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Состояние полов"
              name="estateOptions.premisesFloor"
              onInputQuantities={100}
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
          rows="8"
          multiline={true}
          errors={errors?.description?.fullDescription}
          onInputQuantities={20000}
        />

        <FooterButtons>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            disabled={!isValidAndHasObject}
          >
            {isEditMode ? "Сохранить" : "Создать"}
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
            <Button
              type="submit"
              variant="outlined"
              color="success"
              onClick={handleBackPage}
            >
              Отмена
            </Button>
          </Box>
        </FooterButtons>
      </Form>
    </>
  );
};

export default ObjectForm;
