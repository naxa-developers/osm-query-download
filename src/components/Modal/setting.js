import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SettingModal = ({ open, handleClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        boxShadow: 24,
        p: 4,
    };

    const handlePointColor = e => {
        localStorage.setItem('pointColor', e.target.value);
    };

    const handleLineColor = e => {
        localStorage.setItem('lineColor', e.target.value);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Point</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <label htmlFor="pointColor">Point Color</label>
                            <input name='pointColor' type="color" onChange={e => handlePointColor(e)} defaultValue={localStorage.getItem('pointColor') || '#ff0000'} />
                            <br />
                            <label htmlFor="point-settings">Point Size</label>
                            <input name='point-settings' type="number"
                                onChange={e => localStorage.setItem('pointSize', e.target.value)}
                                defaultValue={localStorage.getItem('pointSize') || 5}
                            />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>LineString</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <label htmlFor="lineColor">Line String Color</label>
                        <input name='lineColor' type="color" onChange={e => handleLineColor(e)} defaultValue={localStorage.getItem('lineColor') || '#00ff00'} />
                        <br />
                        <label htmlFor="lineWidth">Line String Width</label>
                        <input name='lineWidth' type="number"
                            onChange={e => localStorage.setItem('lineWidth', e.target.value)}
                            defaultValue={localStorage.getItem('lineWidth') || 2}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Polygon</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <label htmlFor='polygonColor'>Polygon Color</label>
                        <input name='polygonColor' type="color"
                            onChange={e => localStorage.setItem('polygonColor', e.target.value)}
                            defaultValue={localStorage.getItem('polygonColor') || '#0000ff'}
                        />
                        <br />
                        <label htmlFor='polygonWidth'>Polygon Width</label>
                        <input name='polygonWidth' type="number"
                            onChange={e => localStorage.setItem('polygonWidth', e.target.value)}
                            defaultValue={localStorage.getItem('polygonWidth') || 2}
                        />
                        <br />
                        <label htmlFor='polygonDash'>Polygon Dash</label>
                        <input name='polygonDash' type="number"
                            onChange={e => localStorage.setItem('polygonDash', e.target.value)}
                            defaultValue={localStorage.getItem('polygonDash') || 2}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Modal>
    );
}

export default SettingModal;