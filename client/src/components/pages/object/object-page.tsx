import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/objects.store";
import { getDistrictById } from "../../../store/districts.store";
import Loader from "../../common/loader/loader";
import { Box, Button, Typography, Paper, styled, Divider } from "@mui/material";
import { makeSeparatorDigit } from "../../../utils/makeSeparatorDigit";
import { getMetroName } from "../../../store/metro.store";
import { FormatDate } from "../../../utils/format-date";
import { getUserNameById } from "../../../store/users.store";
import { getObjectStatusNameById } from "../../../store/object-status.store";
import ObjectsOnMap from "../../common/elements-on-map/objects-on-map";
import { getWorkingPositionNameById } from "../../../store/working-position.store";
import dotenv from "dotenv";
// dotenv.config();

const TitleContainer = styled(Box)``;

const Title = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AboutObject = styled(Box)`
  display: flex;
`;

const PageButtonsPanel = styled(Box)`
  display: flex;
  gap: 4px;
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

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const object = useSelector(getObjectById(objectId));
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const city = object?.location.city;
  const address = object?.location.address;
  const navigate = useNavigate();
  const district = useSelector(getDistrictById(object?.location.district));
  console.log("object", object);

  const getRentForMetrPrice = () => {
    const costForMetr = Math.round(
      object?.estateOptions.rentPrice / object?.estateOptions.rentSquare
    );
    const costForMetrString = String(costForMetr);
    const withSeparator = makeSeparatorDigit(costForMetrString);
    return withSeparator;
  };

  const handleBackPage = () => {
    navigate("/objects");
  };

  return (
    <Box>
      <TitleContainer>
        {!isObjectsLoading ? (
          <Title>
            <h1>
              {city}, {district}
              р-н, {address}
            </h1>
            <PageButtonsPanel>
              <Button
                color="success"
                variant="outlined"
                sx={{ height: "50px", color: "white" }}
                onClick={handleBackPage}
              >
                Назад к объектам
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ height: "50px" }}
              >
                Редактировать{" "}
              </Button>
            </PageButtonsPanel>
          </Title>
        ) : (
          <Loader />
        )}
      </TitleContainer>
      <AboutObject>
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
            Высота потолков: {object?.estateOptions.premisesHeight}
          </Typography>
          <Typography>
            Состояние полов: {object?.estateOptions.premisesFloor}
          </Typography>
        </Info>
        <Map>
          <ObjectsOnMap object={object} />
        </Map>
      </AboutObject>
      <h3>Описание объекта:</h3>
      <Typography>{object?.description.comment}</Typography>
    </Box>
  );
};

export default ObjectPage;
