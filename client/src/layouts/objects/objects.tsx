// libraries
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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
// hooks
import useSearchObject from "../../hooks/use-search-object";

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
  onlyWithPhone: false,
};

const Objects = () => {
  const columns = groupedColumns;
  const isObjectsLoading = useSelector(getObjectsLoadingStatus());
  const objects = useSelector(getObjectsList());
  // console.log("objects", String(objects[1].contact.phone).length)
  

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
    onlyWithPhone: Boolean(localStorageState?.onlyWithPhone),
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
  // console.log("searchedObjects", searchedObjects);
  

  useEffect(() => {
    localStorage.setItem("search-objects-data", JSON.stringify(data));
  }, [data]);

  return (
    <Box>
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
    </Box>
  );
};

export default Objects;
