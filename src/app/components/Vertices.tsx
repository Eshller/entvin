import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

const VertexSelection: React.FC = () => {
  return (
    <div className='p-5 mt-5 border-2 bg-white border-[#EDEDED]'>
      {/* <Typography variant='h6' component='div' className='mb-4 font-semibold'>
        Select Vertices
      </Typography> */}
      <h2 className='text-xl mb-3' style={{ fontWeight: '500' }}>
        Select Vertices
      </h2>
      <Stack spacing={2}>
        <div>
          <Grid container pt={1}>
            <Grid item lg={2} xs={6}>
              <Typography sx={{ fontWeight: '400', fontSize: '1.2rem' }}>
                OSD
              </Typography>
            </Grid>
            <Grid item lg={10} xs={6}>
              <span className='p-2 py-[10px] mx-2 pr-1 pl-4 border-[1.5px] rounded-md border-[#E4E4E4]'>
                <FormControlLabel control={<Checkbox />} label='Tablet' />
              </span>
              <span className='p-2 py-[10px] mx-2 pr-1 pl-4 border-[1.5px] rounded-md border-[#E4E4E4]'>
                <FormControlLabel control={<Checkbox />} label='Capsule' />
              </span>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container py={0}>
            <Grid item lg={2} xs={6}>
              <Typography sx={{ fontWeight: '400', fontSize: '1.2rem' }}>
                Injectables
              </Typography>
            </Grid>
            <Grid item lg={10} xs={6}>
              <span className='my-10 p-2 py-[10px] mx-2 pr-1 pl-4 border-[1.5px] rounded-md border-[#E4E4E4]'>
                <FormControlLabel control={<Checkbox />} label='Injectables' />
              </span>
              <span className='p-2 py-[10px] mx-2 pr-1 pl-4 border-[1.5px] rounded-md border-[#E4E4E4]'>
                <FormControlLabel control={<Checkbox />} label='Opthalmic' />
              </span>
              <span className='p-2 py-[10px] mx-2 pr-1 pl-4 border-[1.5px] rounded-md border-[#E4E4E4]'>
                <FormControlLabel control={<Checkbox />} label='Otic' />
              </span>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container py={0}>
            <Grid item lg={2} xs={6}>
              <Typography sx={{ fontWeight: '400', fontSize: '1.2rem' }}>
                STaR
              </Typography>
            </Grid>
            <Grid item lg={10} xs={6}>
              <span className='p-2 py-[10px] mx-2 pr-1 pl-4 border-[1.5px] rounded-md border-[#E4E4E4]'>
                <FormControlLabel control={<Checkbox />} label='STar' />
              </span>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </div>
  );
};

export default VertexSelection;
