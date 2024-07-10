import React, { useState } from 'react';
import { Box, Button, Typography, Input, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import { useCompliance } from '../context/ComplianceContext';

const FileUploadTestComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [references, setReferences] = useState<string[]>([]);
  const [insights, setInsights] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { selectedModules, selectedRules } = useCompliance();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setDownloadUrl(null);
      setInsights(null);
    }
  };

  const handleDelete = () => {
    setFile(null);
    setReferences([]);
    setInsights(null);
    setDownloadUrl(null);
  };

  const handleUpload = async () => {
    console.log(
      '{ selectedModules, selectedRules }: ',
      selectedModules,
      selectedRules
    );
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Extract explainer_text and additional_prompt from selectedRules
      selectedRules.forEach((rule, index) => {
        formData.append(`explainer_text_${index}`, rule.explainerText);
        formData.append(`rule_text_${index}`, rule.rule);
      });

      // If you have additional prompt
      const additionalPrompt = 'Your additional prompt text here'; // replace with actual value if needed
      formData.append('additional_prompt', additionalPrompt);

      const response = await fetch('http://localhost:8000/api/upload-pdf/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('References:', data);
        console.log('Insights:', data.insights);
        setReferences(data.text);
        setInsights(data.insights);
        setDownloadUrl(data.download_url);
        setFile(null);
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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
        {insights && (
          <Box mt={2}>
            <Typography variant='subtitle1'>Insights:</Typography>
            <ReactMarkdown>{insights}</ReactMarkdown>
          </Box>
        )}
        {file && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleUpload}
            sx={{ marginTop: '20px' }}
          >
            Upload
          </Button>
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
