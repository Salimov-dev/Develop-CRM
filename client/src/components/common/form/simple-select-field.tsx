import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
} from "@mui/material";

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

const StyledSelect = styled(Select)(() => ({
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
  },
}));

const SimpleSelectField = ({
  onChange,
  value,
  itemsList,
  id,
  labelId,
  label,
}) => {
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
        labelId={labelId}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {itemsList?.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default SimpleSelectField;
