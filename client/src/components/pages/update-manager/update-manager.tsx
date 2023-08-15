// libraries
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// MUI
import { Box } from "@mui/material";
// components
import Header from "./components/header";
import ObjectForm from "../../common/forms/object-form";
// store
// other
import { objectSchema } from "../../../schemas/schemas";
import ManagerForm from "../../common/forms/manager-form";
import { getUserDataById } from "../../../store/users.store";

const UpdateManager = () => {
  const { userId } = useParams();
  const user = useSelector(getUserDataById(userId));
  // const isEditMode = objectId ? true : false;

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const localStorageObject = JSON.parse(localStorage.getItem("editingObject"));
  // const isObjectHasAddress =
  //   localStorageObject?.location?.city && localStorageObject?.location?.address;

  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   formState: { errors, isValid },
  //   reset,
  // } = useForm({
  //   defaultValues: object,
  //   mode: "onBlur",
  //   resolver: yupResolver(objectSchema),
  // });

  // const watchName = watch("contact.name");
  // const watchDistrict = watch("location.district");

  // const onSubmit = (data) => {
  //   dispatch(UpdateManager(data, objectId))
  //     .then(navigate(-1))
  //     .then(toast.success("Объект успешно изменен!"));
  // };

  // useEffect(() => {
  //   if (object !== undefined) {
  //     localStorage.setItem("editingObject", JSON.stringify(object));
  //   } else {
  //     return;
  //   }
  // }, [localStorageObject]);

  return (
    <Box>
      <h1>Manager update</h1>
      {/* <Header object={object} /> */}
      {/* <ManagerForm
         register={register}
         handleSubmit={handleSubmit}
         onSubmit={onSubmit}
         errors={errors}
         setValue={setValue}
         isTrialStatusSelected={isTrialStatusSelected}
         userStatuses={userStatuses}
         isValid={isValid}
       />  */}
    </Box>
  );
};

export default UpdateManager;
