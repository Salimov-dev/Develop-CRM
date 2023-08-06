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
  inputProps,
  type,
  rows = "1",
  onInputQuantities,
  valueAsNumber = false,
  disabled = false,
  multiline = false,
}) => {
  const handleInputCrop = (e, num) => {
    const maxLength = num;
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

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
      onKeyDown={onKeyDown}
      value={value}
      InputProps={InputProps}
      inputProps={inputProps}
      multiline={multiline}
      error={!!errors}
      helperText={errors?.message}
      disabled={disabled}
      onInput={(e) => handleInputCrop(e, onInputQuantities)}
      sx={{
        "& .MuiInputLabel-root": {
          color: value?.length ? "white" : "gray",
        },
      }}
    />
  );
};

export default TextFieldStyled;
