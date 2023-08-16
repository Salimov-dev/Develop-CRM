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
// store
import { getUserDataById, updateUser } from "../../../store/users.store";
import { getUserStatusesList } from "../../../store/user-statuses.store";
// other
import { managerSchema } from "../../../schemas/schemas";
import ManagerForm from "../../common/forms/manager-form";
import dayjs from "dayjs";

const UpdateManager = () => {
  const { userId } = useParams();
  const user = useSelector(getUserDataById(userId));
  const userStatuses = useSelector(getUserStatusesList());
  const isEditMode = userId ? true : false;
  const localStorageUser = JSON.parse(localStorage.getItem("editingUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatedState = {
    ...localStorageUser,
    contract: {
      startDate: localStorageUser?.contract.startDate
        ? dayjs(localStorageUser?.contract.startDate)
        : null,
      endDate: localStorageUser?.contract.endDate
        ? dayjs(localStorageUser?.contract.endDate)
        : null,
      trialPeriod: localStorageUser?.contract.trialPeriod
        ? dayjs(localStorageUser?.contract.trialPeriod)
        : null,
    },
    birthday: localStorageUser?.birthday
      ? dayjs(localStorageUser?.birthday)
      : null,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: formatedState || user,
    mode: "onBlur",
    resolver: yupResolver(managerSchema),
  });

  const data = watch();

  const onSubmit = (data) => {
    dispatch(updateUser(data))
    .then(navigate(-1))
    .then(toast.success("Менеджер успешно изменен!"));
  };

  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem("editingUser", JSON.stringify(user));
    } else {
      return;
    }
  }, [localStorageUser]);

  return (
    <Box>
      <Header user={user} />
      <ManagerForm
        data={data}
        user={localStorageUser}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        setValue={setValue}
        userStatuses={userStatuses}
        isValid={isValid}
        isEditMode={isEditMode}
      />
    </Box>
  );
};

export default UpdateManager;
