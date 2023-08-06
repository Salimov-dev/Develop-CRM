// libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import CreateObjectForm from "../create-object/components/create-object-form";
// store
import { getDistrictsList } from "../../../store/districts.store";
import { getMetroList } from "../../../store/metro.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { createObject, getObjectById } from "../../../store/objects.store";
import { getCurrentUserId } from "../../../store/users.store";
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
  // console.log("object", object);

  const localStorageObject = JSON.parse(localStorage.getItem("editingObject"))
  // console.log("localStorageObject", localStorageObject);
  
  // const defaultValues = {
  //   status: object.status || "",
  //   contact: {
  //     phone: object.contact?.phone || "",
  //     name: object.contact?.name || "dsadas",
  //     position: object.contact?.position || "",
  //     email: object.contact?.email || "",
  //   },
  //   location: {
  //     city: object.location?.city || "",
  //     address: object.location?.address || "",
  //     district: object.location?.district || "",
  //     metro: object.location?.metro || "",
  //   },
  //   estateOptions: {
  //     rentPrice: object.estateOptions?.rentPrice || "",
  //     rentPriceForMetr: object.estateOptions?.rentPriceForMetr || "",
  //     securityDeposit: object.estateOptions?.securityDeposit || "",
  //     rentalHolidays: object.estateOptions?.rentalHolidays || "",
  //     totalSquare: object.estateOptions?.totalSquare || "",
  //     rentSquare: object.estateOptions?.rentSquare || "",
  //     premisesHeight: object.estateOptions?.premisesHeight || "",
  //     premisesFloor: object.estateOptions?.premisesFloor || "",
  //   },
  //   accordTerms: {
  //     readyToRent: object.accordTerms?.readyToRent || false,
  //     readyToContract: object.accordTerms?.readyToContract || false,
  //     readyToRenovation: object.accordTerms?.readyToRenovation || false,
  //   },
  //   description: {
  //     fullDescription: object.description?.fullDescription || "",
  //   },
  // };

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    defaultValues: localStorageObject,
    mode: "onBlur",
    // resolver: yupResolver(objectSchema),
  });

  const watchName = watch("contact.name");
  const watchDistrict = watch("location.district");

  const onSubmit = (data) => {
    console.log("data onSubmit", data);
  };

  useEffect(() => {
    if (object !== undefined) {
      localStorage.setItem("editingObject", JSON.stringify(object));
    } else {
      return ;
    }
  }, [localStorageObject]);

  const handleClearForm = () => {
    reset();
  };

  return (
    <Box>
      <Header object={object} />
      <CreateObjectForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isValid={isValid}
        isDirty={isDirty}
        districts={districts}
        metros={metros}
        watchDistrict={watchDistrict}
        watchName={watchName}
        workingPositions={workingPositions}
        objectStatuses={objectStatuses}
        handleClearForm={handleClearForm}
        isEditMode={isEditMode}
        object={localStorageObject}
      />
    </Box>
  );
};

export default UpdateObject;
