import { useSelector } from "react-redux";
import { Box, Typography, styled } from "@mui/material";
// utils
import { makeSeparatorDigit } from "../../../../utils/makeSeparatorDigit";
import { FormatDate } from "../../../../utils/format-date";
// store
import { getMetroName } from "../../../../store/metro.store";
import { getUserNameById } from "../../../../store/users.store";
import { getObjectStatusNameById } from "../../../../store/object-status.store";
import { getWorkingPositionNameById } from "../../../../store/working-position.store";
// components
import ObjectsOnMap from "../../../common/elements-on-map/objects-on-map";

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
    
  const getRentForMetrPrice = () => {
    const costForMetr = Math.round(
      object?.estateOptions.rentPrice / object?.estateOptions.rentSquare
    );
    const costForMetrString = String(costForMetr);
    const withSeparator = makeSeparatorDigit(costForMetrString);
    return withSeparator;
  };

  return (
    <Component>
      <Info>
        <Typography>
          Метро: {useSelector(getMetroName(object?.location.metro))}
        </Typography>
        <h3>Информация:</h3>
        <Typography>Создан: {FormatDate(object?.created_at)}</Typography>
        <Typography>
          Менеджер: {useSelector(getUserNameById(object?.userId))}
        </Typography>
        <Typography>
          Статус: {useSelector(getObjectStatusNameById(object?.status))}
        </Typography>
        <h3>Контакты:</h3>
        <Typography>Контакт: {object?.contact.name}</Typography>
        <Typography>
          Должность:{" "}
          {useSelector(getWorkingPositionNameById(object?.contact.position))}
        </Typography>
        <Typography>Телефон: {object?.contact.phone}</Typography>
        <Typography>E-mail: {object?.contact.email}</Typography>
        <h3>Объект:</h3>
        <Typography>
          Площадь (общая):{" "}
          {makeSeparatorDigit(object?.estateOptions.totalSquare)}м²
        </Typography>
        <Typography>
          Площадь (аренда):{" "}
          {makeSeparatorDigit(object?.estateOptions.rentSquare)}м²
        </Typography>
        <Typography>
          Стоимость (аренда общая):{" "}
          {makeSeparatorDigit(object?.estateOptions.rentPrice)}
          руб
        </Typography>
        <Typography>
          Стоимость (аренда м2): {getRentForMetrPrice()}
          руб/м²
        </Typography>
        <Typography>
          Высота потолков: {object?.estateOptions.premisesHeight}м
        </Typography>
        <Typography>
          Состояние полов: {object?.estateOptions.premisesFloor}
        </Typography>
      </Info>
      <Map>
        <ObjectsOnMap object={object} />
      </Map>
    </Component>
  );
};

export default ObjectInfo;
