import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import StorageIcon from '@mui/icons-material/Storage';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Select from 'react-select';
import Logo from '../../assets/images/logo_n.png';
import { downloadFeature } from "../../utils/download";
import { handleUpload } from "../../utils/upload";
// import { DataGrid } from '@mui/x-data-grid';
import { OSM } from '../../osm_const';
import { OSMQuery } from '../../utils/osmquery';
import CustomizedSnackbars from '../../utils/snackbar';
import  { drawTool } from '../../utils/draw';


const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());


const TopBar = ({map, setOpen}) => {
    const [osmkey, setOsmkey] = useState(null);
    const [osmvalue, setOsmvalue] = useState(null);
    const [valueOptions, setValueOptions] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [extent, setExtent] = useState(null);
    const handleOpen = () => setOpen(true);

    var keyOptions = []

    Object.keys(OSM).forEach(key => {
        keyOptions.push({ value: key, label: toTitleCase(key).replace('_', " ") })
    });

    const onChange = e => {
        var a = []
        OSM[e].forEach(value => a.push({ value: value, label: toTitleCase(value).replace('_', " ") }))
        setValueOptions(a);
        setOsmkey(e);
    }

    const clearMap = () => {
        const layers = [...map.getLayers().getArray()];
        layers.forEach((layer, index) => { if (index !== 0) { map.removeLayer(layer) } });
    }

    return (
        <>
        <CustomizedSnackbars open={snackbarOpen} setOpen={setSnackbarOpen} />
        <Grid container spacing={2} className="top-bar">
            <Grid item xs={1}>
                <img src={Logo} className="App-logo" alt="logo" height={40} />
            </Grid>
            <Grid item xs={2}>
                <Select options={keyOptions} onChange={e => onChange(e.value)} />
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={1}>
                    <Grid item xs={11}>
                        <Select options={valueOptions} onChange={e => setOsmvalue(e.value)} />
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Advance Options">
                            <IconButton onClick={handleOpen}>
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Tooltip title="Draw">
                    <Button variant="fill" startIcon={<HighlightAltIcon />} onClick={() => drawTool(map, setExtent)}>
                        Draw
                    </Button>
                </Tooltip>
                <Tooltip title="Upload">
                    <Button variant="fill" startIcon={<CloudUploadIcon />} onClick={() => handleUpload(map, setExtent)}>
                        Upload
                    </Button>
                </Tooltip>
                <Button variant="outlined" startIcon={<SearchIcon />} onClick={() => OSMQuery(map, osmkey, osmvalue, setSnackbarOpen, extent)}>
                    Query
                </Button>
                <Button variant="fill" startIcon={<StorageIcon />} onClick={() => { }}>
                    Data
                </Button>
                <Tooltip title="Clear">
                    <Button variant="fill" startIcon={<DeleteIcon />} onClick={clearMap}>
                        Clear
                    </Button>
                </Tooltip>
                <Tooltip title="Download">
                    <Button variant="fill" startIcon={<CloudDownloadIcon />} onClick={() => downloadFeature(map)}>
                        Download
                    </Button>
                </Tooltip>
                <Tooltip title="Setting">
                    <Button variant="fill" startIcon={<SettingsIcon />} onClick={handleOpen}>
                        Settings
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
        </>
    )
}

export default TopBar;