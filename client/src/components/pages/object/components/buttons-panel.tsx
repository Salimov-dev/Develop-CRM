import { Box, Button, styled, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeObject } from "../../../../store/objects.store";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = ({ city, district, address }) => {
  const [open, setOpen] = useState(false);
  const objectId = useParams().objectId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  const handleUpdateObject = () => {
    navigate(`/objects/${objectId}/edit`);
  };

  const handleRemoveObject = () => {
    confirm({
      title: "Подтвердите удаление объекта",
      description: `Точно удаляем объект: ${city}, ${district}р-н, ${address}?`,
    })
      .then(() => {
        dispatch(removeObject(objectId));
        handleBackPage();
      })
      .catch(() => console.log("Ошибка"));
  };

  return (
    <Component>
      <Button
        color="error"
        variant="outlined"
        sx={{ height: "50px", color: "red" }}
        onClick={handleRemoveObject}
      >
        удалить
      </Button>
      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={handleBackPage}
      >
        Назад к объектам
      </Button>
      <Button
        color="secondary"
        variant="contained"
        sx={{ height: "50px" }}
        onClick={handleUpdateObject}
      >
        Редактировать
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Объект удален успешно!
        </Alert>
      </Snackbar>
    </Component>
  );
};

export default ButtonsPanel;
