// libraries
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
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
import useSearchObject from "../../hooks/useSearchObject";

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

  const { register, watch, setValue, reset } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
  });

  const data = watch();

  const searchedObjects = useSearchObject({
    objects,
    data,
  });

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
