'use client';
import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import ModuleSelection from './ModuleSelection';
import FileUpload from './FileUpload';
import Results from './Results';
import FileUploadTestComponent from './Check';

const steps = ['Module & Vertical Selection', 'File Upload', 'Results'];

const MainContent: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div
      className='flex-grow p-5 bg-[#FCFBFF]'
      style={{ fontFamily: 'Satoshi !important' }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={2}
          className='align-middle jusity-center place-content-center items-center'
        >
          <h1 className='text-2xl font-bold mb-5 '>AI Scrutinizer</h1>
        </Grid>
        <Grid item xs={12} md={10}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className='w-full bg-white border-[#E4E4E4] border-[1px] p-2 rounded-lg'
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  {/* <StepLabel sx={{ fontFamily: 'Satoshi', color: '#7F56D9' }}> */}
                  <Typography
                    variant='caption'
                    sx={{
                      color: '#7F56D9',
                      fontFamily: 'Satoshi',
                      fontSize: '1rem',
                      fontWeight: '400',
                      m: 0,
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      {activeStep === 0 && (
        <ModuleSelection
          selectedModules={selectedModules}
          setSelectedModules={setSelectedModules}
        />
      )}

      {activeStep === 1 && (
        <div>
          {/* <FileUploadTestComponent /> */}
          <FileUpload />
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <Results />
        </div>
      )}

      <div className='bg-white border-2 w-full flex justify-between p-4 border-t-0 border-[#EDEDED]'>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ fontFamily: 'Satoshi !important' }}
          variant='outlined'
        >
          Back
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleNext}
          sx={{ width: '130px', height: '40px', fontFamily: 'Satoshi' }}
        >
          <span className='flex gap-2 align-middle justify-center items-center capitalize'>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}{' '}
            <ArrowForwardIcon sx={{ fontSize: '18px' }} />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MainContent;
