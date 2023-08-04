import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: "30px",
  width: "100%",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "green",
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: theme.palette.background.default,
    padding: "0 5px",
  },
}));

const TextFieldStyled = ({
  errors,
  register,
  label,
  name,
  onKeyDown,
  value,
  InputProps,
  type = "text",
  rows = "1",
  valueAsNumber = false,
}) => {
  return (
    <StyledTextField
      type={type}
      {...register(name, {
        valueAsNumber: valueAsNumber,
      })}
      label={label}
      variant="outlined"
      id={name}
      rows={rows}
      multiline={true}
      onKeyDown={onKeyDown}
      value={value}
      InputProps={InputProps}
      error={!!errors}
      helperText={errors?.message}
      sx={{
        "& .MuiInputLabel-root": {
          color: value?.length ? "white" : "gray",
        },
      }}
    />
  );
};

export default TextFieldStyled;
