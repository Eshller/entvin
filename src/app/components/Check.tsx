import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Input,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCompliance } from '../context/ComplianceContext';
import Markdown from 'react-markdown';

const FileUploadTestComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [references, setReferences] = useState<string[]>([]);
  const [ruleResponses, setRuleResponses] = useState<
    { rule: string; response: string }[]
  >([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { selectedModules, selectedRules } = useCompliance();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setDownloadUrl(null);
      setRuleResponses([]);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setReferences([]);
    setRuleResponses([]);
    setDownloadUrl(null);
  };

  const handleUpload = async () => {
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

        const additionalPrompt = 'Your additional prompt text here'; // replace with actual value if needed
        ruleFormData.append('additional_prompt', additionalPrompt);

        const response = await fetch('http://localhost:8000/api/upload-pdf/', {
          method: 'POST',
          body: ruleFormData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('References:', data);
          console.log('Insights:', data.insights);
          if (i === 0) {
            setReferences(data.text);
            setDownloadUrl(data.download_url);
          }
          allRuleResponses.push({ rule: rule.rule, response: data.insights });
        } else {
          console.error('Failed to upload file');
        }
      }

      setRuleResponses(allRuleResponses);
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

  return (
    <Box className='bg-[#FCFBFF] mt-2' style={{ fontFamily: 'Satoshi' }}>
      <Box className='p-5 mt-5 border-2 bg-white border-[#EDEDED]'>
        <Typography
          variant='h6'
          className='font-bold'
          sx={{ fontFamily: 'Satoshi !important' }}
        >
          Upload Reference File
        </Typography>
        {file ? (
          <Box
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
              marginTop: '20px',
            }}
          >
            <Typography variant='body2' sx={{ marginRight: '8px' }}>
              {file.name}
            </Typography>
            <IconButton
              size='small'
              onClick={handleDelete}
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
        ) : (
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
          >
            <Typography
              variant='body1'
              sx={{ marginRight: '10px', fontFamily: 'Satoshi !important' }}
            >
              Drag and drop your reference file here or
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
                onChange={handleFileSelect}
              />
            </Button>
          </Box>
        )}
        {references?.length > 0 && (
          <Box mt={2}>
            <Typography variant='subtitle1'>References:</Typography>
            <ul>
              {references.map((reference, index) => (
                <li key={index}>{reference}</li>
              ))}
            </ul>
          </Box>
        )}
        {ruleResponses.length > 0 && (
          <Box mt={2}>
            <Typography variant='subtitle1'>Insights:</Typography>
            {ruleResponses.map((ruleResponse, index) => (
              <Box key={index} mb={2}>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Rule:
                </Typography>
                <Typography variant='body2'>{ruleResponse.rule}</Typography>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  Responses:
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {cleanString(ruleResponse.response).tableHeaders.map(
                        (header, index) => (
                          <TableCell key={index}>{header}</TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cleanString(ruleResponse.response).tableRows.map(
                      (row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row?.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>{cell}</TableCell>
                          ))}
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            ))}
          </Box>
        )}
        {file && !loading && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleUpload}
            sx={{ marginTop: '20px' }}
          >
            Upload
          </Button>
        )}
        {loading && (
          <Box display='flex' justifyContent='center' mt={2}>
            <CircularProgress />
          </Box>
        )}
        {downloadUrl && (
          <Button
            variant='contained'
            color='secondary'
            href={`http://localhost:8000${downloadUrl}`}
            sx={{ marginTop: '20px', marginLeft: '10px' }}
          >
            Download Highlighted PDF
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FileUploadTestComponent;
