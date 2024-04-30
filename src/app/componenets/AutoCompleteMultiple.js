import { Autocomplete, Checkbox, TextField } from "@mui/material";

export default function AutoCompleteMultiple(props) {
  const { options, placeholder, inputLabel } = props;
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => `Show All ${option.title} Data`}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{
        width: 350,
        marginRight: "5px",
        marginLeft: "5px",
        marginBottom: "5px",
      }}
      renderInput={(params) => (
        <TextField {...params} label={inputLabel} placeholder={placeholder} />
      )}
    />
  );
}
