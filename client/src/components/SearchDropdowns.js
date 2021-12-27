import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function SearchDropdowns(props) {
  const [selectedValue, setSelectedValue] = useState(props.searchedLocation);

  const handleChange = (value) => {
    setSelectedValue(value);
    props.onChange(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{props.locationType}</InputLabel>
      <Select
        label={props.locationType}
        value={selectedValue}
        onChange={(event) => handleChange(event.target.value)}
        disabled={props.disabled}
      >
        {props.list &&
          props.list.map((item) => (
            <MenuItem key={item._id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
