// libraries
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import "dayjs/locale/ru";
import dayjs from "dayjs";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filters-panel";
import { groupedColumns } from "./table/columns";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";

const initialState = {
  selectedDistricts: [],
  selectedCities: [],
  selectedUsers: [],
  selectedStatuses: [],
  startDateSelected: false,
  endDateSelected: false,
  data: {
    address: "",
    phone: "",
    name: "",
    startDate: null,
    endDate: null,
  },
};

const Objects = () => {
  const [state, setState] = useState(initialState);

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [endDateSelected, setEndDateSelected] = useState(false);
  const [data, setData] = useState({
    address: "",
    phone: "",
    name: "",
    startDate: null,
    endDate: null,
  });

  const objects = useSelector(getObjectsList());
  const columns = groupedColumns;
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
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

    if (startDateSelected && endDateSelected) {
      const startDate = dayjs(data.startDate);
      const endDate = dayjs(data.endDate).endOf("day");

      array = array?.filter((item) => {
        const itemDate = dayjs(item.created_at);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      });
    } else if (startDateSelected) {
      const selectedDate = dayjs(data.startDate);
      array = array?.filter((item) => dayjs(item.created_at) >= selectedDate);
    } else if (endDateSelected) {
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
    startDateSelected,
    endDateSelected,
  ]);

  return (
    <>
      <h1>Таблица объектов</h1>
      <FiltersPanel
        objects={objects}
        data={data}
        setData={setData}
        selectedCities={selectedCities}
        selectedDistricts={selectedDistricts}
        selectedUsers={selectedUsers}
        selectedStatuses={selectedStatuses}
        startDateSelected={startDateSelected}
        endDateSelected={endDateSelected}
        setSelectedDistricts={setSelectedDistricts}
        setSelectedCities={setSelectedCities}
        setSelectedUsers={setSelectedUsers}
        setSelectedStatuses={setSelectedStatuses}
        setStartDateSelected={setStartDateSelected}
        setEndDateSelected={setEndDateSelected}
      />

      <BasicTable
        items={searchedObjects}
        itemsColumns={columns}
        isLoading={isObjectsLoading}
      />
    </>
  );
};

export default Objects;
