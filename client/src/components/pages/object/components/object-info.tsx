import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// utils
import { makeDigitSeparator } from "../../../../utils/make-digit-separator";
import { FormatDate } from "../../../../utils/format-date";
// store
import { getMetroName } from "../../../../store/metro.store";
import { getUserNameById } from "../../../../store/users.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getWorkingPositionNameById } from "../../../../store/working-position.store";
// components
import ObjectsOnMap from "../../../common/elements-on-map/objects-on-map";
import { enterPhoneFormat } from "../../../../utils/enter-phone-format";
import { getPriceForRentMetr } from "../../../../utils/get-price-rent-for-metr";

const Component = styled(Box)`
  display: flex;
`;

const Info = styled(Box)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
  paddingright: 20px;
`;

const Map = styled(Box)`
  flex: 5;
  display: flex;
  background: gray;
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
  const rentSquare = makeDigitSeparator(object?.estateOptions.rentSquare);
  const rentPrice = makeDigitSeparator(object?.estateOptions.rentPrice);
  const priceForRentMetr = getPriceForRentMetr(object);
  const premisesHeight = object?.estateOptions.premisesHeight;
  const premisesFloor = object?.estateOptions.premisesFloor;

  const readyToRent = !object?.accordTerms.readyToRent ? "Да" : "Нет";
  const readyToContract = !object?.accordTerms.readyToContract ? "Да" : "Нет";
  const readyToRenovation = !object?.accordTerms.readyToRenovation ? "Да" : "Нет";
  
  return (
    <Component>
      <Info>
        <Typography>Метро: {metroName ? metroName : "без метро"}</Typography>
        <h3>Информация:</h3>
        <Typography>Создан: {createdTime}</Typography>
        <Typography>Менеджер: {manager}</Typography>
        <Typography>Статус: {status}</Typography>
        <h3>Контакты:</h3>
        <Typography>Контакт: {contactName}</Typography>
        <Typography>Позиция: {contactPosition}</Typography>
        <Typography>Телефон: {contactPhone}</Typography>
        <Typography>E-mail: {contactEmail}</Typography>
        <h3>Объект:</h3>
        <Typography>Площадь (общая): {totalSquare}м²</Typography>
        <Typography>Площадь (аренда): {rentSquare}м²</Typography>
        <Typography>Стоимость (аренда общая): {rentPrice}руб</Typography>
        <Typography>Стоимость (аренда м2): {priceForRentMetr}руб/м²</Typography>
        <Typography>Высота потолков: {premisesHeight}м</Typography>
        <Typography>Состояние полов: {premisesFloor}</Typography>

        <Typography>Готов сдавать под нашу деятельность: {readyToRent}</Typography>
        <Typography>Собственник согласен на нашу форму договора: {readyToContract}</Typography>
        <Typography>Собственник готов сделать ремонт за свой счёт: {readyToRenovation}</Typography>
      </Info>
      <Map>
        <ObjectsOnMap object={object} />
      </Map>
    </Component>
  );
};

export default ObjectInfo;
