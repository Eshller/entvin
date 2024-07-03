import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface CheckPointsProps {
  selectedModules: string[];
}

const CheckPoints: React.FC<CheckPointsProps> = ({ selectedModules }) => {
  console.log('these are the selected modules: ', selectedModules);
  // Function to render Accordion for each selected module
  const renderAccordions = () => {
    return selectedModules?.map((module, index) => (
      <Accordion
        key={index}
        sx={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          position: 'inherit',
          padding: '0',
        }}
      >
        <AccordionSummary
          aria-controls={`panel${index + 1}-content`}
          id={`panel${index + 1}-header`}
        >
          <Typography className='text-[#7F56D9] font-bold'>
            {module} <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label='Check All'
                  />
                </TableCell>
                <TableCell>Checkpoints</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  Check and ensure to submit Environmental Assessment or Claim
                  of Categorical Exclusion
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2.</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Check and ensure to submit Environmental</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <div className='bg-[#FCFBFF] mt-2'>
      <div className=' mt-5 bg-white border-2 border-b-0 border-[#EDEDED]'>
        <Typography
          variant='h6'
          className='p-4 pb-0'
          sx={{ fontWeight: '500' }}
        >
          Checkpoints Selections
        </Typography>
        {/* Render dynamic accordions based on selected modules */}
        {renderAccordions()}
      </div>
    </div>
  );
};

export default CheckPoints;
