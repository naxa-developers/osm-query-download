import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SidePanel() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 200,
          height: 600,
          marginLeft: 500,
        },
      }}
      className="sidepanel"
    >
      <Paper elevation={0} />
      <h1>SidePanel</h1>
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}
