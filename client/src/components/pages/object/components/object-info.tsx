import { useSelector } from "react-redux";
import { Box, Typography, styled, Divider } from "@mui/material";
// utils
import { makeDigitSeparator } from "../../../../utils/make-digit-separator";
import { FormatDate } from "../../../../utils/format-date";
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";
import { getPriceForRentMetr } from "../../../../utils/get-price-rent-for-metr";
// store
import { getMetroName } from "../../../../store/metro.store";
import { getUserNameById } from "../../../../store/users.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getWorkingPositionNameById } from "../../../../store/working-position.store";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between; /* Center items and create space between them */
  margin-bottom: 20px;
`;

const InfoBlock = styled(Box)`
  display: flex;
  flex-direction: column;
  justift-content: center;
  white-space: nowrap;
  padding: 0 20px;
`;

const ObjectInfo = ({ object }) => {
  const metroName = useSelector(getMetroName(object?.location.metro));

  const createdTime = FormatDate(object?.created_at);
  const manager = useSelector(getUserNameById(object?.userId));
  const status = useSelector(getObjectStatusNameById(object?.status));

  const contactName = object?.contact.name;
  const contactPhone = enterPhoneFormat(object?.contact.phone);
  const contactEmail = object?.contact.email;
  const contactPosition = useSelector(
    getWorkingPositionNameById(object?.contact.position)
  );

  const totalSquare = makeDigitSeparator(object?.estateOptions.totalSquare);
  const rentHolidays = makeDigitSeparator(object?.estateOptions.rentalHolidays);
  const rentSquare = makeDigitSeparator(object?.estateOptions.rentSquare);
  const rentPrice = makeDigitSeparator(object?.estateOptions.rentPrice);
  const priceForRentMetr = getPriceForRentMetr(object);
  const premisesHeight = object?.estateOptions.premisesHeight;
  const premisesFloor = object?.estateOptions.premisesFloor;

  const readyToRent = !object?.accordTerms.readyToRent ? "Да" : "Нет";
  const readyToContract = !object?.accordTerms.readyToContract ? "Да" : "Нет";
  const readyToRenovation = !object?.accordTerms.readyToRenovation
    ? "Да"
    : "Нет";

  const fullDescription = object?.description.fullDescription;

  return (
    <>
      <Component>
        <InfoBlock>
          <h3>Информация:</h3>
          <Typography>Создан: {createdTime}</Typography>
          <br />
          <Typography>Менеджер: {manager}</Typography>
          <Typography>Статус: {status}</Typography>
          <Typography>Метро: {metroName ? metroName : "без метро"}</Typography>
        </InfoBlock>
        <Divider orientation="vertical" variant="middle" flexItem />
        <InfoBlock>
          <h3>Объект:</h3>
          <Typography>Площадь (общая): {totalSquare}м²</Typography>
          <Typography>Площадь (аренда): {rentSquare}м²</Typography>
          <br />
          <Typography>Высота потолков: {premisesHeight}м</Typography>
          <Typography>Состояние полов: {premisesFloor}</Typography>
        </InfoBlock>
        <Divider orientation="vertical" variant="middle" flexItem />
        <InfoBlock>
          <h3>Условия:</h3>
          <Typography>Стоимость (аренда общая): {rentPrice}руб</Typography>
          <Typography>
            Стоимость (аренда м2): {priceForRentMetr}руб/м²
          </Typography>
          <Typography>Каникулы: {rentHolidays} дней</Typography>
          <br />
          <Typography>
            Готов сдавать под нашу деятельность: {readyToRent}
          </Typography>
          <Typography>
            Собственник согласен на нашу форму договора: {readyToContract}
          </Typography>
          <Typography>
            Собственник готов сделать ремонт за свой счёт: {readyToRenovation}
          </Typography>
        </InfoBlock>
        <Divider orientation="vertical" variant="middle" flexItem />
        <InfoBlock>
          <h3>Контакты:</h3>
          <Typography>Контакт: {contactName}</Typography>
          <Typography>Позиция: {contactPosition}</Typography>
          <br />
          <Typography>Телефон: {contactPhone}</Typography>
          <Typography>E-mail: {contactEmail}</Typography>
        </InfoBlock>
      </Component>
      <Box sx={{ width: "100%", flex: "2" }}>
        <Typography>Описание: {fullDescription}</Typography>
      </Box>
    </>
  );
};

export default ObjectInfo;
