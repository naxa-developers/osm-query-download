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
                            <label htmlFor="point-settings">Point Color</label>
                            <input name='point-settings' type="color" />
                            <label htmlFor="point-settings">Point Size</label>
                            <input name='point-settings' type="number" />
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
                        <label htmlFor="line-settings">Line String Color</label>
                        <input name='line-settings' type="color" onChange={e => handleLineColor(e)} defaultValue={localStorage.getItem('lineColor') || '#00ff00'}/>
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
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Modal>
    );
}

export default SettingModal;