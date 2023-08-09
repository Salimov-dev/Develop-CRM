// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import ObjectForm from "../../common/forms/object-form";
// store
import { getDistrictsList } from "../../../store/districts.store";
import { getMetroList } from "../../../store/metro.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { getObjectById, updateObject } from "../../../store/objects.store";
// other
import { objectSchema } from "../../../schemas/schemas";

const UpdateObject = () => {
  const { objectId } = useParams();
  const object = useSelector(getObjectById(objectId));
  const isEditMode = objectId ? true : false;
  const districts = useSelector(getDistrictsList());
  const metros = useSelector(getMetroList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const objectStatuses = useSelector(getObjectsStatusList());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localStorageObject = JSON.parse(localStorage.getItem("editingObject"));
  const isObjectHasAddress =
    localStorageObject?.location?.city && localStorageObject?.location?.address;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: object,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });

  const watchName = watch("contact.name");
  const watchDistrict = watch("location.district");

  const onSubmit = (data) => {
    dispatch(updateObject(data, objectId));
    navigate(-1);
  };

  useEffect(() => {
    if (object !== undefined) {
      localStorage.setItem("editingObject", JSON.stringify(object));
    } else {
      return;
    }
  }, [localStorageObject]);

  return (
    <Box>
      <Header object={object} />
      <ObjectForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        districts={districts}
        metros={metros}
        watchDistrict={watchDistrict}
        watchName={watchName}
        workingPositions={workingPositions}
        objectStatuses={objectStatuses}
        reset={reset}
        isEditMode={isEditMode}
        object={localStorageObject}
        isValid={isValid}
        isObjectHasAddress={isObjectHasAddress}
        objectId={objectId}
      />
    </Box>
  );
};

export default UpdateObject;
