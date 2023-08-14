// MUI
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerStyled = ({register, name, label, value, onChange, isLoading}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        {...register(name)}
        label={label}
        value={value}
        onChange={onChange}
        disabled={isLoading ? true : false}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: value ? "green" : "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "green",
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiButtonBase-root": {
            color: value ? "white" : "gray",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerStyled;
