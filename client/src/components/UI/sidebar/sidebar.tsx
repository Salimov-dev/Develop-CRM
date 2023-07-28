import { useState } from "react";
import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "./components/header";
import CompanyLogo from "./components/company-logo";
import ItemsList from "./components/items-list";
import { Component } from "./styled/styled";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Component
      sx={{
        width: !isCollapsed ? "220px" : "inherit",
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`,
          width: !isCollapsed ? "220px" : "inherit",
        },
        "& .ps-sidebar-root": {
          border: "none",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          backgroundColor: "inherit !important",
        },
        "& .ps-menu-button.ps-active": {
          color: "#868dfb !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <Header
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            colors={colors}
          />

          {/* {!isCollapsed && <CompanyLogo colors={colors} />} */}

          <ItemsList
            isCollapsed={isCollapsed}
            selected={selected}
            setSelected={setSelected}
            colors={colors}
          />
        </Menu>
      </ProSidebar>
    </Component>
  );
};

export default Sidebar;
