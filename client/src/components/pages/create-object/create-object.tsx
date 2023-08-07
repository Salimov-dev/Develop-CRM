// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// MUI
import { Box, styled } from "@mui/material";
// components
import Header from "./components/header";
import ObjectForm from "../../common/forms/object-form";
// store
import { getDistrictsList } from "../../../store/districts.store";
import { getMetroList } from "../../../store/metro.store";
import { getWorkingPositionsList } from "../../../store/working-position.store";
import { getObjectsStatusList } from "../../../store/object-status.store";
import { createObject } from "../../../store/objects.store";
import { getCurrentUserId } from "../../../store/users.store";
// other
import useFindObject from "../../../hoc/useFindObject";
import { objectSchema } from "../../../schemas/schemas";
import FindObjectOnMap from "./components/find-object-on-map";

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
    rentPriceForMetr: "",
    securityDeposit: "",
    rentalHolidays: "",
    totalSquare: "",
    rentSquare: "",
    premisesHeight: "",
    premisesFloor: "",
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

const Map = styled(Box)`
  width: 100%;
  height: 250px;
  background-color: gray;
`;

const CreateObject = () => {
  const districts = useSelector(getDistrictsList());
  const metros = useSelector(getMetroList());
  const workingPositions = useSelector(getWorkingPositionsList());
  const objectStatuses = useSelector(getObjectsStatusList());
  const currentUser = useSelector(getCurrentUserId());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const company = "64c140eb8d214a0532377114";

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: initialState,
    mode: "onBlur",
    resolver: yupResolver(objectSchema),
  });
  
  const {
    getCity,
    getAddress,
    getLatitudeCoordinates,
    getLongitudeCoordinates,
    findedObject,
  } = useFindObject();

  const isEmptyFindedObject = Boolean(Object.keys(findedObject).length);
  const watchName = watch("contact.name");
  const watchDistrict = watch("location.district");

  const onSubmit = (data) => {
    const newData = {
      ...data,
      userId: currentUser,
      company: company,
      location: {
        ...data.location,
        zoom: 16,
      },
    };
    dispatch(createObject(newData)).then(navigate("/objects"));
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

      <Map>
        <FindObjectOnMap />
      </Map>

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
        handleClearForm={handleClearForm}
        isValid={isValid}
        isEmptyFindedObject={isEmptyFindedObject}
      />
    </Box>
  );
};

export default CreateObject;
