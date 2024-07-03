import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Typography,
  Input,
  IconButton,
  Stack,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useCallback } from 'react';
import { useModules } from '../context/ModuleContext';

const FileUpload = () => {
  const [fileRTR, setFileRTR] = useState(null);
  const [fileGeneral, setFileGeneral] = useState(null);
  const [fileModule1, setFileModule1] = useState(null);

  const { selectedModules } = useModules();

  const handleDrop = useCallback((event, setFile) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  }, []);

  const handleFileSelect = (event, setFile) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDelete = (setFile) => {
    setFile(null);
  };

  const [assessment, setAssessment] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAssessment(event.target.value as string);
  };
  const renderUploadBox = (file, setFile, label) =>
    file ? null : (
      <Box
        sx={{
          border: '2px dotted #EDEDED',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: '20px',
          background: '#FCFBFF',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        onDrop={(event) => handleDrop(event, setFile)}
        onDragOver={(event) => event.preventDefault()}
      >
        <Typography
          variant='body1'
          sx={{ marginRight: '10px', fontFamily: 'Satoshi !important' }}
        >
          {`Drag and drop your ${label} reference file here or `}
        </Typography>
        &nbsp;
        <Button
          variant='contained'
          component='label'
          sx={{
            borderRadius: '7px',
            textTransform: 'Capitalize',
            fontFamily: 'Satoshi !important',
          }}
        >
          Upload File
          <Input
            type='file'
            sx={{ display: 'none' }}
            onChange={(event) => handleFileSelect(event, setFile)}
          />
        </Button>
      </Box>
    );

  const renderFileDisplay = (file, setFile, label) =>
    file && (
      <Box
        key={label}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: '4px',
          backgroundColor: '#FCFBFF',
          height: '32px',
          color: '#7F56D9',
        }}
      >
        <Typography variant='body2' sx={{ marginRight: '8px' }}>
          {file.name}
        </Typography>
        <IconButton
          size='small'
          onClick={() => handleDelete(setFile)}
          sx={{
            padding: 0,
            marginLeft: 'auto',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );

  return (
    <div className='bg-[#FCFBFF] mt-2' style={{ fontFamily: 'Satoshi' }}>
      <div className='p-5 mt-5 border-2 bg-white border-[#EDEDED]'>
        <Typography
          variant='h6'
          className='font-bold'
          sx={{ fontFamily: 'Satoshi !important' }}
        >
          Upload Reference File
        </Typography>
        {selectedModules.map((module, index) => (
          <div key={index} className='mt-4'>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Grid container>
                <Grid item xs={1.5}>
                  <Typography
                    variant='h6'
                    className='font-bold'
                    sx={{ fontFamily: 'Satoshi !important' }}
                  >
                    {module}
                  </Typography>
                </Grid>
                {renderFileDisplay(fileRTR, setFileRTR, 'RTR')}
              </Grid>
            </Stack>
            {renderUploadBox(fileRTR, setFileRTR, 'RTR')}
          </div>
        ))}
      </div>
      <div className='mt-5 bg-white border-2 border-b-0 border-[#EDEDED]'>
        <Stack
          direction='row'
          justifyContent='space-between'
          className='p-4 pb-0'
        >
          <Typography variant='h6' className='font-bold'>
            User Input
          </Typography>
        </Stack>
        {selectedModules.map((module, index) => (
          <Accordion
            key={index}
            sx={{
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              position: 'inherit',
            }}
          >
            <AccordionSummary aria-controls='panel1-content' id='panel1-header'>
              <Typography className='text-[#7F56D9] font-bold'>
                {module} <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table sx={{ border: 'none' }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                      }}
                      className=' text-[#4D4D4D]'
                    >
                      S.No.
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                      }}
                      className=' text-[#4D4D4D]'
                    >
                      Checkpoints
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                      }}
                      className=' text-[#4D4D4D]'
                    >
                      User Input
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                      }}
                    >
                      1.
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                        width: '45rem',
                      }}
                    >
                      Check and ensure to submit Environmental Assessment or
                      Claim of Categorical Exclusion
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                        width: '45rem',
                      }}
                      rowSpan={5}
                    >
                      Check and ensure to submit Environmental Assessment <br />
                      {/* <Stack direction='row' spacing={1}> */}
                      <FormControlLabel control={<Checkbox />} label='Yes' />
                      <FormControlLabel control={<Checkbox />} label='No' />
                      <Stack
                        direction='column'
                        spacing={6}
                        justifyItems='space-between'
                        my={1}
                      >
                        <Stack direction='column'>
                          <Typography
                            sx={{
                              fontWeight: '100',
                              fontSize: '1.1rem',
                            }}
                          >
                            API Count
                          </Typography>
                          <TextField
                            className='my-1 w-1/2'
                            variant='outlined'
                          />
                        </Stack>
                        <Stack direction='column'>
                          <Typography
                            sx={{
                              fontWeight: '100',
                              fontSize: '1.1rem',
                              mb: '0.4rem',
                            }}
                          >
                            Check and ensure to submit Environmental Assessment
                          </Typography>
                          <Select
                            value={assessment}
                            label='assessment'
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </Stack>
                      </Stack>
                      {/* </Stack> */}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                      }}
                    >
                      2.
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                        width: '45rem',
                      }}
                    >
                      Check and ensure to submit Environmental Assessment or
                      Claim of Categorical Exclusion
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                      }}
                    >
                      3.
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                        width: '45rem',
                      }}
                    >
                      Check and ensure to submit Environmental Assessment or
                      Claim of Categorical Exclusion
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                      }}
                    >
                      4.
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '100',
                        fontSize: '1.1rem',
                        wordBreak: 'wrap',
                        width: '45rem',
                      }}
                    >
                      Check and ensure to submit Environmental Assessment or
                      Claim of Categorical Exclusion
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
