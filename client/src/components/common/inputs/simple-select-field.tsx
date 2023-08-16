import { orderBy } from "lodash";
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

const StyledSelect = styled(Select)(() => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
  "& .MuiSelect-select": {
    marginTop: "-5px",
    height: "24px !important",
  },
}));

const SimpleSelectField = ({
  itemsList,
  name,
  errors,
  labelId,
  label,
  register,
  disabled = false,
  isHelperText = false,
  helperText,
  defaultValue = "",
  watch,
  selectedItems,
}) => {
  const sortedItems = orderBy(itemsList, ["name"], ["asc"]);

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
        value={selectedItems}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        disabled={disabled}
        defaultValue={defaultValue}
        error={!!errors}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: selectedItems?.length ? "green" : "gray",
          },
          "& .MuiInputLabel-root": {
            color: selectedItems?.length ? "white" : "gray",
          },
        }}
      >
        <MenuItem value="">
          <em>Отмена</em>
        </MenuItem>
        {sortedItems?.map((item) => (
          <MenuItem key={item?._id} value={item?._id}>
            <ListItemText primary={item?.name} />
          </MenuItem>
        ))}
      </StyledSelect>
      <FormHelperText sx={{ color: "red" }}>{errors?.message}</FormHelperText>
      {!watch || !isHelperText ? (
        <FormHelperText sx={{ color: "green" }}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default SimpleSelectField;
