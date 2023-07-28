import { Typography } from "@mui/material";
import Item from "./item";
// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { ItemsListContainer } from "../styled/styled";

const ItemsList = ({ isCollapsed, selected, setSelected, colors }) => {
  return (
    <ItemsListContainer>
      <Item
        title="Главная"
        to="/"
        icon={<HomeOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 10px" }}
      >
        Объекты
      </Typography>
      <Item
        title="Таблица объектов"
        to="/objects"
        icon={<BusinessOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Объекты на карте"
        to="/map"
        icon={<MapOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 4px" }}
      >
        Активность
      </Typography>
      <Item
        title="Сделки"
        to="/deal"
        icon={<BusinessCenterOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Встречи"
        to="/meetings"
        icon={<GroupsOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Календарь"
        to="/calendar"
        icon={<CalendarTodayOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 10px" }}
      >
        Команда
      </Typography>
      <Item
        title="Менеджеры"
        to="/managers"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Результаты"
        to="/results"
        icon={<PeopleOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />

      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{ m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 18px" }}
      >
        Другое
      </Typography>
      <Item
        title="Материалы"
        to="/materials"
        icon={<HelpOutlineOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
    </ItemsListContainer>
  );
};

export default ItemsList;
