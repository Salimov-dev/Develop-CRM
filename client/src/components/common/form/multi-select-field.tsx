import {
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
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

const MultiSelectField = ({
  onChange,
  itemsList,
  selectedItems,
  id,
  labelId,
  label,
}) => {
  function checkArrayElements(arr) {
    for (const element of arr) {
      if (typeof element !== "string") {
        return true;
      }
    }
    return false;
  }

  const itemsWithId = checkArrayElements(itemsList);

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
        multiple
        value={selectedItems}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          const selectedItemsNames = selected?.map((elementID) => {
            const item = itemsList?.find((item) => item._id === elementID);
            return item ? item.name : "";
          });
          return itemsWithId
            ? selectedItemsNames.join(", ")
            : selected.join(", ");
        }}
        MenuProps={MenuProps}
      >
        {itemsList?.map((item) =>
          itemsWithId ? (
            <MenuItem key={item._id} value={item._id}>
              <Checkbox
                checked={selectedItems?.indexOf(item._id) > -1}
                sx={{ color: "white !important" }}
              />
              <ListItemText primary={item.name} />
            </MenuItem>
          ) : (
            <MenuItem key={item} value={item}>
              <Checkbox
                checked={selectedItems?.indexOf(item) > -1}
                sx={{ color: "white !important" }}
              />
              <ListItemText primary={item} />
            </MenuItem>
          )
        )}
      </StyledSelect>
    </FormControl>
  );
};

export default MultiSelectField;
