import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: "30px",
  width: "100%",
  //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //     borderColor: hasText ? "green" : "initial",
  //     color: hasText ? "white" : "initial",
  //   },
  //   "& .MuiInputLabel-root": {
  //     color: hasText ? "white" : "gray",
  //     "&.Mui-focused": {
  //       color: "white",
  //     },
  //   },
  //   "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
  //     transform: hasText ? "translate(14px, -6px) scale(0.75)" : "initial",
  //     backgroundColor: theme.palette.background.default,
  //     padding: hasText ? "0 5px" : "initial",
  //   },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "green",
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    "&.Mui-focused": {
      color: "white",
    },
    borderColor: "blue !important",
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: theme.palette.background.default,
    padding: "0 5px",
  },
}));

const SearchField = ({
  register,
  label,
  name,
  onKeyDown,
  onChange,
  value,
  inputProps,
}) => {
  return (
    <StyledTextField
      {...register(name)}
      label={label}
      type="search"
      variant="outlined"
      id={name}
      name={name}
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
      inputProps={inputProps}
    />
  );
};

export default SearchField;
