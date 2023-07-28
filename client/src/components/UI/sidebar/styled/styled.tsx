import { Box, styled } from "@mui/material";

export const Component = styled(Box)({
  "& .ps-sidebar-root": {
    // position: 'fixed',
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
});
