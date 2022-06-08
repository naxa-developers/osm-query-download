import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ open, setOpen }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Query is Empty
        </Alert>
      </Snackbar>
  );
}