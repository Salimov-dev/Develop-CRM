// libraries
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filters-panel";
import { groupedColumns } from "./table/columns";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";
// hooks
import useSearchObject from "../../hooks/use-search-object";
import dayjs from "dayjs";

const initialState = {
  address: "",
  phone: "",
  name: "",
  startDate: null,
  endDate: null,
  selectedDistricts: [],
  selectedCities: [],
  selectedUsers: [],
  selectedStatuses: [],
};

const Objects = () => {
  const columns = groupedColumns;
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const objects = useSelector(getObjectsList());

  const localStorageState = JSON.parse(
    localStorage.getItem("search-objects-data")
  );

  const formatedState = {
    ...localStorageState,
    startDate: localStorageState?.startDate
      ? dayjs(localStorageState?.startDate)
      : null,
    endDate: localStorageState?.startDate
      ? dayjs(localStorageState?.endDate)
      : null,
  };

  const { register, watch, setValue, reset } = useForm({
    defaultValues: formatedState || initialState,
    mode: "onBlur",
  });

  const data = watch();

  const searchedObjects = useSearchObject({
    objects,
    data,
  });

  useEffect(() => {
    localStorage.setItem("search-objects-data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <h1>Таблица объектов</h1>
      <FiltersPanel
        register={register}
        objects={objects}
        data={data}
        initialState={initialState}
        setValue={setValue}
        reset={reset}
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
