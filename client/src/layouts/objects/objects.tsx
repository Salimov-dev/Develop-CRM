// libraries
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import "dayjs/locale/ru";
import dayjs from "dayjs";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filters-panel/filters-panel";
import { groupedColumns } from "./table/columns";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";
import useSearchObject from "../../hooks/useSearchObject";

const initialState = {
  address: "",
  phone: "",
  name: "",
  startDate: null,
  endDate: null,
};

const Objects = () => {
  const [data, setData] = useState(initialState);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const objects = useSelector(getObjectsList());
  const columns = groupedColumns;
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const searchedObjects = useSearchObject({
    objects,
    data,
    selectedStatuses,
    selectedDistricts,
    selectedCities,
    selectedUsers,
  });

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
        setSelectedDistricts={setSelectedDistricts}
        setSelectedCities={setSelectedCities}
        setSelectedUsers={setSelectedUsers}
        setSelectedStatuses={setSelectedStatuses}
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
