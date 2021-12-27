import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';

export default function CreateNewAreaDialog(props) {
  const [locationName, setLocationName] = useState('');
  const [locationId, setLocationId] = useState('');
  const { confirm, open, cancel } = props;

  const handleConfirm = () => {
    confirm(locationName, locationId);
    setLocationName('');
    setLocationId('');
  };

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>{`Tạo ${props.locationType} mới`}</DialogTitle>
      <TextField
        type="text"
        value={locationName}
        label={`Tên ${props.locationType} mới`}
        onChange={(event) => setLocationName(event.target.value)}
        fullWidth
      />
      <TextField
        type="text"
        value={locationId}
        label={`Mã ${props.locationType} mới`}
        onChange={(event) => setLocationId(event.target.value)}
        fullWidth
      />
      <Button onClick={handleConfirm}>Thêm</Button>
    </Dialog>
  );
}
