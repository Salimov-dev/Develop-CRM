// MUI
import { Box, Button, styled, InputAdornment, FormGroup } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
// components
import TextFieldStyled from "../../../common/form/text-field-styled";
import SimpleSelectFieldMUI from "../../../common/form/simple-select-field-mui";
import SwitchStyled from "../../../common/form/switch-styled";
import FindObjectOnMap from "./find-object-on-map";

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

const CreateObjectForm = ({
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
  isValid,
  isDirty,
  handleClearForm,
}) => {
  return (
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
          disabled={!watchName.length && true}
          helperText={!watchName.length && "Сначала введите имя"}
          isHelperText={true}
        />
        <TextFieldStyled
          register={register}
          label="Телефон"
          type="number"
          name="contact.phone"
          onInputQuantities={12}
          errors={errors?.contact?.phone}
          valueAsNumber={true}
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
            endAdornment: <InputAdornment position="end">дней</InputAdornment>,
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
        rows="3"
        multiline={true}
        errors={errors?.description?.fullDescription}
        onInputQuantities={3500}
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
  );
};

export default CreateObjectForm;
