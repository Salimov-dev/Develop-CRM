/* eslint-disable no-undef */
import { orderBy } from "lodash";
import { useSelector } from "react-redux";
import { getObjectsList } from "../../store/objects.store";
import { useEffect, useMemo } from "react";
import { Box, styled } from "@mui/material";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
// Icons
import target_cluster from "./assets/target_cluster.png";
import target from "./assets/target.png";
import {
  getObjectStatusLoading,
  getObjectsStatusList,
} from "../../store/object-status.store";
import { getUsersList } from "../../store/users.store";
import { getWorkingPositionsList } from "../../store/working-position.store";
import { enterPhoneFormat } from "../../utils/enter-phone-format";
import { makeDigitSeparator } from "../../utils/make-digit-separator";
import MultiSelectField from "../../components/common/inputs/multi-select-field";

const Map = styled(Box)`
  width: 99.6%;
  height: 100%;
`;

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

const initialState = {
  user: "",
  managers: [],
};

const ObjectsOnMap = () => {
  const objects = useSelector(getObjectsList());
  const isLoading = useSelector(getObjectStatusLoading());
  const statuses = useSelector(getObjectsStatusList());
  const users = useSelector(getUsersList());
  const positions = useSelector(getWorkingPositionsList());

  const { watch, setValue, reset } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
  });

  const selectedManagerss = [watch().managers];
  const selectedManagersArray = Object.assign([], ...selectedManagerss);

  const searchedObjects = useMemo(() => {
    let array = objects;
    if (selectedManagersArray.length > 0) {
      array = array.filter((obj) => selectedManagersArray.includes(obj.userId));
    }
    return array;
  }, [selectedManagersArray]);

  const getActualUsersList = () => {
    const filteredUsers = objects?.map((obj) => obj.userId);
    const uniqueUsers = [...new Set(filteredUsers)];

    const actualUsersArray = uniqueUsers?.map((id) => {
      const foundObject = users?.find((user) => user._id === id);
      return foundObject
        ? { _id: foundObject._id, name: foundObject.name }
        : null;
    });

    const sortedUsers = orderBy(actualUsersArray, ["name"], ["asc"]);

    return sortedUsers;
  };

  const getStatus = (id) => {
    return statuses?.find((s) => s._id === id)?.name;
  };

  const getUserName = (id) => {
    return users?.find((s) => s._id === id)?.name;
  };

  const getPosition = (id) => {
    if (!id) {
      return "";
    }
    return positions?.find((s) => s._id === id)?.name;
  };

  const handleChangeManagers = ({ target }) => {
    const { value } = target;
    setValue("managers", typeof value === "string" ? value.split(",") : value);
  };

  // Yandex map
  let mapObjects = null;
  let geoObjects = [];

  function showObjects() {
    mapObjects = new ymaps.Map("map__objects", {
      center: [59.930320630519155, 30.32906024941998],
      zoom: 11,
    });

    for (let i = 0; i < searchedObjects?.length; i++) {
      geoObjects[i] = new ymaps.Placemark(
        [objects[i].location.latitude, objects[i].location.longitude],
        {
          hintContent: [objects[i].location.city, objects[i].location.address],
          clusterCaption: `${dayjs(objects[i].date).format("DD.MM.YYYY")}`,
          balloonContent: `
              <div>
              <div style={{marginBottom:'10px'}}><a class="btn btn-warning btn-sm" href=/objects/${
                objects[i]._id
              }>Перейти в объект</a></div>
              <div><strong>Статус:</strong> ${getStatus(
                objects[i].status
              )}</div>
                  <div><strong>Город:</strong> ${objects[i].location.city}</div>
                  <div><strong>Адрес:</strong> ${
                    objects[i].location.address
                  }</div>
                  <div><strong>Менеджер:</strong> ${getUserName(
                    objects[i].userId
                  )}</div>
                  <hr/>
                  <div><strong>Общая площадь:</strong> ${makeDigitSeparator(
                    objects[i].estateOptions.totalSquare
                  )}м²</div>
                  <div><strong>Площадь аренды:</strong> ${makeDigitSeparator(
                    objects[i].estateOptions.rentSquare
                  )}м²</div>
                  <div><strong>Сумма аренды:</strong> ${makeDigitSeparator(
                    objects[i].estateOptions.rentPrice
                  )}руб.</div>
                  <hr/>
                  <div><strong>Контакт:</strong> ${
                    objects[i].contact.name
                  }</div>
                  <div><strong>Позиция:</strong> ${getPosition(
                    objects[i].contact.position
                  )}</div>
                  <div><strong>Телефон:</strong> ${enterPhoneFormat(
                    objects[i].contact.phone
                  )}</div> 
                  <hr/>
                  <div><strong>Описание:</strong> ${
                    objects[i].description.fullDescription
                  }</div> 
              </div>
          `,
        },
        {
          iconLayout: "default#image",
          iconImageHref: target,
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -40],
        }
      );
    }
    const clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: target_cluster,
          size: [50, 50],
          offset: [-25, -25],
        },
      ],
    });
    mapObjects.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }

  useEffect(() => {
    if (!isLoading) {
      showObjects();
    }
    return () => {
      if (mapObjects) {
        mapObjects.destroy();
        mapObjects = null;
      }
    };
  }, [geoObjects, objects]);

  return (
    <>
      <h1>Объекты на карте</h1>
      <Form noValidate>
        <MultiSelectField
          itemsList={getActualUsersList()}
          selectedItems={selectedManagersArray}
          onChange={handleChangeManagers}
          name="managers"
          labelId="managers-label"
          label="Выбор по менеджеру"
        />
      </Form>
      <Map>
        <Box
          id="map__objects"
          style={{
            width: "100%",
            height: "100%",
            autoFitToViewport: "always",
          }}
        ></Box>
      </Map>
    </>
  );
};

export default ObjectsOnMap;
