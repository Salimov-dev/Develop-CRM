import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getObjectById,
  getObjectsLoadingStatus,
} from "../../../store/objects-store";
import { getDistrictById } from "../../../store/districts-store";
import Loader from "../../common/loader/loader";
import { Box, Button, Typography, Paper, styled, Divider } from "@mui/material";
import { makeSeparatorDigit } from "../../../utils/makeSeparatorDigit";
import { getMetroName } from "../../../store/metro-store";
import { FormatDate } from "../../../utils/format-date";
import { getUserNameById } from "../../../store/users-store";
import { getObjectStatusNameById } from "../../../store/object-status.store";

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

const Info = styled(Box)`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  paddingright: 20px;
`;

const PageButtonsPanel = styled(Box)`
  display: flex;
  gap: 4px;
`;

const Map = styled(Box)`
  display: flex;
  width: 100%;
  background: gray;
`;

const ObjectPage = () => {
  const objectId = useParams().objectId;
  const currentObject = useSelector(getObjectById(objectId));
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const city = currentObject?.location.city;
  const address = currentObject?.location.address;
  const navigate = useNavigate();
  const district = useSelector(
    getDistrictById(currentObject?.location.district)
  );

  const getRentForMetrPrice = () => {
    const costForMetr = Math.round(
      currentObject?.estateOptions.rentPrice /
        currentObject?.estateOptions.rentSquare
    );
    const costForMetrString = String(costForMetr);
    const withSeparator = makeSeparatorDigit(costForMetrString);
    return withSeparator;
  };

  const handleBackPage = () => {
    navigate("/objects");
  };

  console.log("currentObject", currentObject);
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
            Метро: {useSelector(getMetroName(currentObject?.location.metro))}
          </Typography>
          <h3>Информация:</h3>
          <Typography>
            Создан: {FormatDate(currentObject?.created_at)}
          </Typography>
          <Typography>
            Менеджер: {useSelector(getUserNameById(currentObject?.userId))}
          </Typography>
          <Typography>
            Статус:{" "}
            {useSelector(getObjectStatusNameById(currentObject?.status))}
          </Typography>
          <h3>Контакты:</h3>
          <Typography>Контакт: {currentObject?.contact.name}</Typography>
          {/* <Typography>Должность: {useSelector(getWor currentObject?.contact.position}</Typography> */}
          <Typography>Телефон: {currentObject?.contact.phone}</Typography>
          <Typography>E-mail: {currentObject?.contact.email}</Typography>
          <h3>Объект:</h3>
          <Typography>
            Площадь (общая):{" "}
            {makeSeparatorDigit(currentObject?.estateOptions.totalSquare)}м²
          </Typography>
          <Typography>
            Площадь (аренда):{" "}
            {makeSeparatorDigit(currentObject?.estateOptions.rentSquare)}м²
          </Typography>
          <Typography>
            Стоимость (аренда общая):{" "}
            {makeSeparatorDigit(currentObject?.estateOptions.rentPrice)}
            руб
          </Typography>
          <Typography>
            Стоимость (аренда м2): {getRentForMetrPrice()}
            руб/м²
          </Typography>
          <Typography>
            Высота потолков: {currentObject?.estateOptions.premisesHeight}
          </Typography>
          <Typography>
            Состояние полов: {currentObject?.estateOptions.premisesFloor}
          </Typography>
        </Info>
        <Map>карта тут быть ей</Map>
      </AboutObject>
      <h3>Описание объекта:</h3>
      <Typography>{currentObject?.description.comment}</Typography>
    </Box>
  );
};

export default ObjectPage;
