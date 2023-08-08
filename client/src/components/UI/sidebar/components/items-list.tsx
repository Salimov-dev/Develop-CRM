import { Typography, Tooltip, Box } from "@mui/material";
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
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
// styled
import { ItemsListContainer } from "../styled/styled";

const ItemsList = ({ isCollapsed, selected, setSelected, colors }) => {
  return (
    <ItemsListContainer>
      <Item
        title="Главная"
        to="/"
        icon={
          <Tooltip title="Главная" placement="top-start" arrow>
            <HomeOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />

      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 12px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
      >
        Объекты
      </Typography>
      <Item
        title="Таблица объектов"
        to="/objects"
        icon={
          <Tooltip title="Таблица объектов" placement="top-start" arrow>
            <BusinessOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Объекты на карте"
        to="/map"
        icon={
          <Tooltip title="Объекты на карте" placement="top-start" arrow>
            <MapOutlinedIcon />
          </Tooltip>
        }
        selected={selected}
        setSelected={setSelected}
      />
      {/* <Item
        title="Контакты"
        to="/contacts"
        icon={<ContactPhoneOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      /> */}
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 6px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
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
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 12px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
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
        title="Презентации"
        to="/presentations"
        icon={<AssignmentOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Item
        title="Результаты"
        to="/results"
        icon={<TableChartOutlinedIcon />}
        selected={selected}
        setSelected={setSelected}
      />
      <Typography
        variant="h6"
        color={colors.grey[300]}
        sx={{
          m: !isCollapsed ? "15px 0 5px 20px" : "15px 0 5px 18px",
          fontSize: !isCollapsed ? "inherit" : "12px",
        }}
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
