import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

const StyledSelect = styled(Select)(() => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  "& .MuiSelect-select": {
    marginTop: "-5px",
    height: "25px !important",
  },
}));

const SimpleSelectFieldMUI = ({
  itemsList,
  name,
  labelId,
  label,
  register,
  disabled = false,
  isHelperText = false,
  helperText,
  value,
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl sx={{ minWidth: "300px", width: "100%" }}>
      <InputLabel
        id={labelId}
        sx={{
          color: "gray !important",
          "&.Mui-focused": {
            color: "white !important",
          },
        }}
      >
        {label}
      </InputLabel>

      <StyledSelect
        {...register(name)}
        labelId={labelId}
        id={name}
        name={name}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        disabled={disabled}
        value={itemsList?.length ? value : ""}
        defaultValue=""
      >
        <MenuItem value="">
          <em>Отмена</em>
        </MenuItem>
        {itemsList &&
          itemsList?.map((item) => (
            <MenuItem key={item?._id} value={item?._id}>
              <ListItemText primary={item?.name} />
            </MenuItem>
          ))}
      </StyledSelect>
      {isHelperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default SimpleSelectFieldMUI;
