// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import ObjectForm from "../../common/forms/object-form";
import FindObjectOnMap from "./components/find-object-on-map";
// store
import { getDistrictsList } from "../../../store/districts.store";
import { getMetroList } from "../../../store/metro.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { createObject } from "../../../store/objects.store";
// other
import useFindObject from "../../../hooks/use-find-object";
import { objectSchema } from "../../../schemas/schemas";
import { capitalizeFirstLetterOrReturn } from "../../../utils/capitalize-first-letter";
import { getEstateConditionsList } from "../../../store/estate-conditions.store";
import { getRentTypesList } from "../../../store/rent-types.store";
import { getObjectTypesList } from "../../../store/object-types.store";
import { getEstateTypesList } from "../../../store/estate-types.store";
import { getCurrentRentersList } from "../../../store/current-renter.store";

const initialState = {
  status: "",
  contact: {
    phone: "",
    name: "",
    position: "",
    email: "",
  },
  location: {
    city: "",
    address: "",
    district: "",
    metro: "",
  },
  estateOptions: {
    rentPrice: "",
    securityDeposit: "",
    totalSquare: "",
    rentSquare: "",
    rentalHolidays: "",
    agentComission: "",
    indexingAnnual: "",

    currentRenters: "",
    estateConditions: "",
    rentTypes: "",
    estateTypes: "",
    objectTypes: "",
    premisesHeight: "",
    premisesFloor: "",
    parkingQuantity: "",
    electricityKw: "",
    waterSuply: "",
    cadastalNumber: "",
    waterSuply: "",
    loadingArea: "",
  },
  accordTerms: {
    readyToRent: false,
    readyToContract: false,
    readyToRenovation: false,
  },
  description: {
    fullDescription: "",
  },
};

const CreateObject = () => {
  const districts = useSelector(getDistrictsList());
  const metros = useSelector(getMetroList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const currentRenters = useSelector(getCurrentRentersList());
  const estateConditions = useSelector(getEstateConditionsList());
  const rentTypes = useSelector(getRentTypesList());
  const objectTypes = useSelector(getObjectTypesList());
  const estateTypes = useSelector(getEstateTypesList());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });
  console.log("errors", errors);
  

  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const isEmptyFindedObject = Boolean(Object.keys(findedObject).length);
  const watchName = watch("contact.name");
  const watchStatus = watch("status");
  const watchDistrict = watch("location.district");
  const watchCurrentRenters  = watch("estateOptions.currentRenters");
  const watchEstateConditions  = watch("estateOptions.estateConditions");
  const watchRentTypes  = watch("estateOptions.rentTypes");
  const watchObjectTypes  = watch("estateOptions.objectTypes");
  const watchEstateTypes  = watch("estateOptions.estateTypes");

  const onSubmit = (data) => {

    const newData = {
      ...data,
      contact: {
        ...data.contact,
        name: capitalizeFirstLetterOrReturn(data.contact.name),
      },
      estateOptions: {
        ...data.estateOptions,
        premisesFloor: capitalizeFirstLetterOrReturn(
          data.estateOptions.premisesFloor
        ),
      },
      location: {
        ...data.location,
        zoom: 16,
      },
      description: {
        ...data.description,
        fullDescription: capitalizeFirstLetterOrReturn(
          data.description.fullDescription
        ),
      },
    };
    console.log("newData", newData);

    // dispatch(createObject(newData)).then(navigate("/objects"));
  };

  const handleClearForm = () => {
    reset();
  };

  useEffect(() => {
    setValue("location.city", getCity());
    setValue("location.address", getAddress());
    setValue("location.latitude", getLatitudeCoordinates());
    setValue("location.longitude", getLongitudeCoordinates());
  }, [findedObject]);

  return (
    <Box>
      <Header
        isEmptyFindedObject={isEmptyFindedObject}
        getCity={getCity}
        getAddress={getAddress}
      />

      <FindObjectOnMap />

      <ObjectForm
        initialState={initialState}
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
        handleClearForm={handleClearForm}
        isValid={isValid}
        isEmptyFindedObject={isEmptyFindedObject}
        currentRenters={currentRenters}
        estateConditions={estateConditions}
        rentTypes={rentTypes}
        objectTypes={objectTypes}
        estateTypes={estateTypes}
        watchCurrentRenters={watchCurrentRenters}
        watchEstateConditions={watchEstateConditions}
        watchRentTypes={watchRentTypes}
        watchObjectTypes={watchObjectTypes}
        watchEstateTypes={watchEstateTypes}
        watchStatus={watchStatus}
      />
    </Box>
  );
};

export default CreateObject;
