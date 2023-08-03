import { useMemo } from "react";
import "dayjs/locale/ru";
import dayjs from "dayjs";

const useSearchObject = ({
  objects,
  data,
  selectedStatuses,
  selectedDistricts,
  selectedCities,
  selectedUsers,
}) => {
  const searchedObjects = useMemo(() => {
    let array = objects;

    if (data?.address.length) {
      array = array?.filter((obj) =>
        obj.location.address.toLowerCase().includes(data.address.toLowerCase())
      );
    }

    if (data?.phone.length) {
      array = array.filter((obj) => obj.contact.phone.includes(data.phone));
    }

    if (data?.name.length) {
      array = array.filter((obj) =>
        obj.contact.name.toLowerCase().includes(data.name.toLowerCase())
      );
    }

    if (selectedStatuses?.length) {
      array = array?.filter((obj) => selectedStatuses.includes(obj.status));
    }

    // Фильтр для выбранных районов и городов
    if (selectedDistricts?.length) {
      array = array.filter((item) =>
        selectedDistricts.includes(item.location.district)
      );

      // Обновляем список выбранных городов на основе отфильтрованных районов
      const filteredCities = selectedDistricts.reduce((cities, district) => {
        return cities.concat(
          array
            .filter((item) => item.location.district === district)
            .map((item) => item.location.city)
        );
      }, []);

      // Фильтруем города исходя из списка отфильтрованных городов
      if (selectedCities?.length) {
        array = array.filter((item) =>
          filteredCities.includes(item.location.city)
        );
      } else {
        array = array.filter((item) =>
          selectedDistricts.includes(item.location.district)
        );
      }
    } else if (selectedCities?.length) {
      array = array.filter((item) =>
        selectedCities.includes(item.location.city)
      );
    }

    if (selectedUsers?.length) {
      array = array.filter((item) => selectedUsers.includes(item.userId));
    }

    if (data.startDate && data.endDate) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((item) => {
        const itemDate = dayjs(item.created_at);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (data.startDate) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((item) => dayjs(item.created_at) >= selectedDate);
    } else if (data.endDate) {
      const endDate = dayjs(data.endDate).endOf("day");
      array = array.filter((item) => dayjs(item.created_at) <= endDate);
    }

    return array;
  }, [
    data,
    objects,
    selectedDistricts,
    selectedCities,
    selectedUsers,
    selectedStatuses,
  ]);

  return searchedObjects;
};

export default useSearchObject;
