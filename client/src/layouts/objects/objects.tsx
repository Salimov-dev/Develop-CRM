// libraries
import { useSelector } from "react-redux";
import { useState } from "react";
// components
import BasicTable from "../../components/common/table/basic-table";
import FiltersPanel from "./components/filters-panel";
import { groupedColumns } from "./table/columns";
// store
import {
  getObjectsList,
  getObjectsLoadingStatus,
} from "../../store/objects.store";
import useSearchObject from "../../hooks/useSearchObject";
import { styled } from "@mui/material";
import { useForm } from "react-hook-form";

const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "10px",
  gap: "4px",
});

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
  console.log("data", data);

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
        setValue={setValue}
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
