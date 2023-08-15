// libraries
import { useDispatch } from "react-redux";
// MUI
import { Box, Button, styled } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
// store
import { removeObject } from "../../../../store/objects.store";

const Component = styled(Box)`
  display: flex;
  gap: 4px;
`;

const ButtonsPanel = ({ city, district, address }) => {
  const objectId = useParams().objectId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleRemoveObject = () => {
    confirm({
      title: "Подтвердите удаление объекта",
      description: `Точно удаляем объект: ${city}, ${district}р-н, ${address}?\nВернуть его будет невозможно`,
    })
      .then(() => {
        dispatch(removeObject(objectId));
      })
      .then(() => handleClick())
      .then(() => navigate("/objects"))
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
        onClick={() => navigate("/map")}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        карта
      </Button>
      <Button
        color="success"
        variant="outlined"
        sx={{ height: "50px", color: "white" }}
        onClick={() => navigate("/objects")}
      >
        <ArrowBackIosNewOutlinedIcon
          sx={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        объекты
      </Button>
      <Button
        color="secondary"
        variant="contained"
        sx={{ height: "50px" }}
        onClick={() => navigate(`/objects/${objectId}/edit`)}
      >
        ПРАВИТЬ
      </Button>
    </Component>
  );
};

export default ButtonsPanel;
