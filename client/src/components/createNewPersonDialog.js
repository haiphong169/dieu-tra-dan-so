import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@mui/material';

export default function CreateNewPersonDialog(props) {
  const [newPerson, setNewPerson] = useState({});
  const { confirm, open, cancel } = props;

  const handleConfirm = () => {
    confirm(newPerson);
    setNewPerson({});
  };

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>{`Nhập dữ liệu người mới`}</DialogTitle>
      <TextField
        type="text"
        value={newPerson.name}
        label="Họ và tên"
        onChange={(event) =>
          setNewPerson({ ...newPerson, name: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.birthday}
        label="Ngày sinh"
        onChange={(event) =>
          setNewPerson({ ...newPerson, birthday: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.sex}
        label="Giới tính"
        onChange={(event) =>
          setNewPerson({ ...newPerson, sex: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.cccd}
        label="Căn cước công dân/ Chứng minh nhân dân"
        onChange={(event) =>
          setNewPerson({ ...newPerson, cccd: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.hometown}
        label="Quê quán"
        onChange={(event) =>
          setNewPerson({ ...newPerson, hometown: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.dctht}
        label="Địa chỉ thường trú"
        onChange={(event) =>
          setNewPerson({ ...newPerson, dctht: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.dctt}
        label="Địa chỉ tạm trú"
        onChange={(event) =>
          setNewPerson({ ...newPerson, dctt: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.education}
        label="Trình độ học vấn"
        onChange={(event) =>
          setNewPerson({ ...newPerson, education: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.occupation}
        label="Nghề nghiệp"
        onChange={(event) =>
          setNewPerson({ ...newPerson, occupation: event.target.value })
        }
      />
      <TextField
        type="text"
        value={newPerson.religion}
        label="Tôn giáo"
        onChange={(event) =>
          setNewPerson({ ...newPerson, religion: event.target.value })
        }
      />
      <Button onClick={handleConfirm}>Thêm</Button>
    </Dialog>
  );
}
