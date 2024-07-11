import React, { useState } from 'react';
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
  TableRow,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCompliance } from '../context/ComplianceContext';

const FileUpload = () => {
  const [fileRTR, setFileRTR] = useState<File | null>(null);
  const [fileGeneral, setFileGeneral] = useState<File | null>(null);
  const [fileModule1, setFileModule1] = useState<File | null>(null);
  const [assessment, setAssessment] = useState<string>('');
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedModules, selectedRules, setGeminiResponse } = useCompliance();

  console.log('selected rules: ', selectedRules);
  const [ruleResponses, setRuleResponses] = useState<
    { rule: string; response: string }[]
  >([]);
  const [references, setReferences] = useState<string[]>([]);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setRuleResponses([]);
      setReferences([]);
      setUploaded(false);
    }
  };

  const handleDelete = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    setFile(null);
    setRuleResponses([]);
    setReferences([]);
  };

  const handleUpload = async (file: File | null, module: string) => {
    if (!file) return;
    setLoading(true);
    try {
      const allRuleResponses: { rule: string; response: string }[] = [];

      for (let i = 0; i < selectedRules.length; i++) {
        const rule = selectedRules[i];
        const ruleFormData = new FormData();
        ruleFormData.append('file', file);
        ruleFormData.append(`explainer_text_0`, rule.explainerText);
        ruleFormData.append(`rule_text_0`, rule.rule);

        const additionalPrompt = 'Your additional prompt text here';
        ruleFormData.append('additional_prompt', additionalPrompt);

        const response = await fetch('http://localhost:8000/api/upload-pdf/', {
          method: 'POST',
          body: ruleFormData,
        });

        if (response.ok) {
          setUploaded(true);
          const data = await response.json();

          console.log('References:', data);
          console.log('Insights:', data.insights);
          if (i === 0) {
            setReferences(data.text);
          }
          allRuleResponses.push({ rule: rule.rule, response: data.insights });
        } else {
          console.error('Failed to upload file');
        }
      }

      setRuleResponses(allRuleResponses);
      setGeminiResponse(allRuleResponses);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };
  function cleanString(inputString: string) {
    let cleanedString = inputString;

    if (cleanedString.startsWith('text: ')) {
      cleanedString = cleanedString.slice('text: '.length);
    }

    if (cleanedString.startsWith('"') && cleanedString.endsWith('"')) {
      cleanedString = cleanedString.slice(1, -1);
    }

    const separator = '\\n|---|---|---|---|\\n';

    const parts = cleanedString.split(separator);

    if (parts.length > 0) {
      const firstPart = parts[0];
      const secondPart = parts[1];
      const firstExtractedText = extractText(firstPart);
      console.log('First extracted: ', firstExtractedText);
      let tableHeaders: string[] = [];
      let tableRows: string[][] = [];

      tableHeaders = firstExtractedText?.filter(
        (header) =>
          header !== '' &&
          header !== '"' &&
          header !== '\n"' &&
          header !== '\n' &&
          header !== '\\n"'
      );

      const secondExtractedText = extractText(secondPart);
      console.log('second extracted: ', secondExtractedText);
      tableRows.push(
        secondExtractedText?.filter(
          (text) =>
            text !== '' &&
            text !== '"' &&
            text !== '\n"' &&
            text !== '\n' &&
            text !== '\\n"'
        )
      );

      console.log('tableHeaders, tableRows:', tableHeaders, tableRows);

      return { tableHeaders, tableRows };
    } else {
      return [];
    }
  }

  function extractText(segment: string): string[] {
    const parts = segment?.split('|').map((part) => part.trim());

    console.log('parts: ', parts);
    return parts;
  }

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
  };

  const renderUploadBox = (
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    label: string
  ) =>
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

  const renderFileDisplay = (
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    label: string
  ) =>
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
                {renderFileDisplay(
                  module === 'RTR'
                    ? fileRTR
                    : module === 'General'
                    ? fileGeneral
                    : fileModule1,
                  module === 'RTR'
                    ? setFileRTR
                    : module === 'General'
                    ? setFileGeneral
                    : setFileModule1,
                  module
                )}
              </Grid>
            </Stack>
            {renderUploadBox(
              module === 'RTR'
                ? fileRTR
                : module === 'General'
                ? fileGeneral
                : fileModule1,
              module === 'RTR'
                ? setFileRTR
                : module === 'General'
                ? setFileGeneral
                : setFileModule1,
              module
            )}
            {fileRTR && module === 'RTR' ? (
              <Button
                variant='contained'
                // color='primary'
                onClick={() => handleUpload(fileRTR, 'RTR')}
                sx={{
                  backgroundColor: uploaded ? 'green' : 'primary',
                  marginTop: '10px',
                }}
              >
                {uploaded ? 'Uploaded' : 'Upload'}
              </Button>
            ) : null}
            {loading && (
              <Box display='flex' justifyContent='center' mt={2}>
                <CircularProgress />
              </Box>
            )}
            {fileGeneral && module === 'General' ? (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleUpload(fileGeneral, 'General')}
                sx={{ marginTop: '10px' }}
              >
                Upload
              </Button>
            ) : null}
            {fileModule1 && module === '3.2.P.1' ? (
              <Button
                variant='contained'
                color='primary'
                disabled={loading}
                onClick={() => handleUpload(fileModule1, 'Module 1')}
                sx={{
                  marginTop: '10px',
                  backgroundColor: uploaded ? 'green' : 'primary',
                }}
              >
                Upload
              </Button>
            ) : null}
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
              <Table>
                <TableBody>
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
                  {selectedRules?.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          border: '1px solid',
                          fontWeight: '100',
                          fontSize: '1.1rem',
                        }}
                      >
                        {index + 1}.
                      </TableCell>
                      <TableCell
                        sx={{
                          border: '1px solid',
                          fontWeight: '100',
                          fontSize: '1.1rem',
                          wordBreak: 'wrap',
                          width: '45rem',
                        }}
                      >
                        {rule.rule}
                      </TableCell>
                      {rule.id == '13' && '15' && (
                        <TableCell
                          sx={{
                            fontWeight: '100',
                            fontSize: '1.1rem',
                            wordBreak: 'wrap',
                            width: '50%',
                          }}
                        >
                          Check and ensure to submit Environmental Assessment{' '}
                          <br />
                          <FormControlLabel
                            control={<Checkbox />}
                            label='Yes'
                          />
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
                                Check and ensure to submit Environmental
                                Assessment
                              </Typography>
                              <Select
                                value={assessment}
                                label='assessment'
                                onChange={(event) =>
                                  setAssessment(event.target.value as string)
                                }
                              >
                                <MenuItem value='Ten'>Ten</MenuItem>
                                <MenuItem value='Twenty'>Twenty</MenuItem>
                                <MenuItem value='Thirty'>Thirty</MenuItem>
                              </Select>
                            </Stack>
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
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
