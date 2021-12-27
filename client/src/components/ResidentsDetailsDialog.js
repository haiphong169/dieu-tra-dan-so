import React from 'react';
import { Dialog, DialogTitle, Grid, Typography } from '@mui/material';

export default function ResidentsDetailsDialog(props) {
  const { open, cancel, details } = props;

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>{details.name}</DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Họ và tên:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Giới tính:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.sex}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Ngày sinh:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.birthday}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            Căn cước công dân/ Chứng minh nhân dân:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.cccd}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Quê quán:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.hometown}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Địa chỉ thường trú:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.dctht}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Địa chỉ tạm trú:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.dctt}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Nghề nghiệp:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.occupation}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Tôn giáo:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.religion}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Trình độ học vấn:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{details.education}</Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
}
