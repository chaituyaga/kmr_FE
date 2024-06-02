import { Autocomplete, Checkbox, TextField } from "@mui/material";

export default function AutoCompleteMultiple(props) {
  const { options, placeholder, inputLabel, onChange } = props;
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      onChange={onChange}
      getOptionLabel={(option) => `Show All ${option} Data`}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={selected} />
          {option}
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
