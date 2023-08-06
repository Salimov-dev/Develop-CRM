import { FormControlLabel, Switch } from "@mui/material";

const SwitchStyled = ({ register, label, name }) => {
  return (
    <FormControlLabel
      {...register(name)}
      control={<Switch />}
      label={label}
      sx={{
        width: "fit-content",
        "& .MuiButtonBase-root.Mui-checked": {
          color: "yellow",
        },
        "& .MuiSwitch-track": {
          backgroundColor: "lightgreen !important", // Change background color when switch is ON
        },
      }}
    />
  );
};

export default SwitchStyled;