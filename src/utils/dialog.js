import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { downloadFeature } from './download';

export const SimpleDialog = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Data From OSM</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Point" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Line/Polygon" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export const ExportDialog = ({ open, setOpen, map, osmvalue }) => {
  const handleClose = () => setOpen(false);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Download Data From OSM</DialogTitle>
      <DialogContent>
        <Button variant="contained" onClick={() => downloadFeature(map, osmvalue, 'geojson')}>Download Geojson</Button><br /><br />
        <Button variant="contained" onClick={() => downloadFeature(map, osmvalue, 'shp')}>Download Shapefile</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
