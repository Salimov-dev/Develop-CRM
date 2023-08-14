import { useNavigate } from "react-router-dom";
// MUI
import { Box, Button, styled, InputAdornment, FormGroup } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WaterIcon from '@mui/icons-material/Water';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import VerticalAlignBottomOutlinedIcon from '@mui/icons-material/VerticalAlignBottomOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// components
import TextFieldStyled from "../inputs/text-field-styled";
import SimpleSelectField from "../inputs/simple-select-field";
import SwitchStyled from "../inputs/switch-styled";

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
  isEditMode = false,
  object = {},
  isValid,
  isObjectHasAddress,
  isEmptyFindedObject,
  objectId,
  currentRenters,
  estateConditions,
  rentTypes,
  objectTypes,
  estateTypes,
  watchCurrentRenters,
  watchEstateConditions,
  watchRentTypes,
  watchObjectTypes,
  watchEstateTypes,
  watchStatus,
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
          <h3>Объект</h3>
        </Box>
        <FieldsContainer>
          <SimpleSelectField
            itemsList={districts}
            name="location.district"
            labelId="district"
            label="Район"
            register={register}
            isHelperText={true}
            helperText="Обязательно"
            defaultValue={object?.location?.district}
            watch={watchDistrict}
          />
          <SimpleSelectField
            itemsList={metros}
            name="location.metro"
            labelId="district"
            label="Метро"
            register={register}
            disabled={!watchDistrict && true}
            defaultValue={object?.location?.metro}
            helperText="Если есть в радиусе 1км"
            isHelperText={true}
          />
          <SimpleSelectField
            itemsList={objectStatuses}
            name="status"
            labelId="status"
            label="Статус объекта"
            register={register}
            isHelperText={true}
            helperText="Обязательно"
            defaultValue={object?.status}
            watch={watchStatus}
          />
        </FieldsContainer>
        <FieldsContainer>
          <SimpleSelectField
            itemsList={objectTypes}
            name="estateOptions.objectTypes"
            labelId="objectTypes "
            label="Тип объекта"
            register={register}
            defaultValue={object?.estateOptions?.objectTypes}
            isHelperText={true}
            helperText="Обязательно"
            watch={watchObjectTypes}
          />
          <SimpleSelectField
            itemsList={estateTypes}
            name="estateOptions.estateTypes"
            labelId="estateTypes "
            label="Тип недвижимости"
            register={register}
            defaultValue={object?.estateOptions?.estateTypes}
            isHelperText={true}
            helperText="Обязательно"
            watch={watchEstateTypes}
          />
          <SimpleSelectField
            itemsList={currentRenters}
            name="estateOptions.currentRenters"
            labelId="currentRenters"
            label="Текущий арендатор"
            register={register}
            defaultValue={object?.estateOptions?.currentRenters}
            isHelperText={true}
            helperText="Обязательно"
            watch={watchCurrentRenters}
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
          <SimpleSelectField
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
              maxLength: 8,
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />
          <TextFieldStyled
            register={register}
            label="Индексация"
            type="number"
            name="estateOptions.indexingAnnual"
            valueAsNumber={true}
            onInputQuantities={3}
            InputProps={{
              maxLength: 3,
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </FieldsContainer>
        <FieldsContainer>
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
          <TextFieldStyled
            register={register}
            label="Комиссия агента"
            type="number"
            name="estateOptions.agentComission"
            valueAsNumber={true}
            onInputQuantities={8}
            InputProps={{
              maxLength: 7,
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />
          <SimpleSelectField
            itemsList={rentTypes}
            name="estateOptions.rentTypes"
            labelId="rentTypes"
            label="Тип договора"
            register={register}
            defaultValue={object?.estateOptions?.rentTypes}
            isHelperText={true}
            watch={watchRentTypes}
          />
        </FieldsContainer>

        <Box sx={{ marginRight: "auto" }}>
          <h3>Параметры помещения</h3>
        </Box>
        <FieldsContainer sx={{ flexDirection: "column" }}>
          <FieldsContainer>
            <SimpleSelectField
              itemsList={estateConditions}
              name="estateOptions.estateConditions"
              labelId="estateConditions "
              label="Состояние помещения"
              register={register}
              defaultValue={object?.estateOptions?.estateConditions}
              isHelperText={true}
              watch={watchEstateConditions}
            />
            <TextFieldStyled
              register={register}
              label="Кадастровый номер"
              type="number"
              name="estateOptions.cadastalNumber"
              valueAsNumber={true}
              onInputQuantities={24}
              InputProps={{
                maxLength: 7,
                endAdornment: <InputAdornment position="end">№</InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Электричество"
              type="number"
              name="estateOptions.electricityKw"
              valueAsNumber={true}
              onInputQuantities={4}
              InputProps={{
                maxLength: 7,
                endAdornment: <InputAdornment position="end"><ElectricBoltIcon/></InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Состояние полов"
              name="estateOptions.premisesFloor"
              onInputQuantities={100}
              InputProps={{
                endAdornment: <InputAdornment position="end"><VerticalAlignBottomOutlinedIcon/></InputAdornment>,
              }}
            />
          </FieldsContainer>
          <FieldsContainer>
          
            <TextFieldStyled
              register={register}
              label="Водоснабжение"
              type="number"
              name="estateOptions.waterSuply "
              valueAsNumber={true}
              onInputQuantities={20}
              InputProps={{
                endAdornment: <InputAdornment position="end"><WaterIcon/></InputAdornment>,
              }}
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
              label="Парковочных мест"
              type="number"
              name="estateOptions.parkingQuantity"
              valueAsNumber={true}
              onInputQuantities={4}
              InputProps={{
                maxLength: 7,
                endAdornment: <InputAdornment position="end"><DirectionsCarIcon/></InputAdornment>,
              }}
            />
            <TextFieldStyled
              register={register}
              label="Зона погрузки"
              type="text"
              name="estateOptions.loadingArea"
              valueAsNumber={true}
              onInputQuantities={30}
              InputProps={{
                maxLength: 7,
                endAdornment: <InputAdornment position="end"><LocalShippingIcon/></InputAdornment>,
              }}
            />
          </FieldsContainer>
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
              type="button"
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
