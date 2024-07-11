import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Input,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCompliance } from '../context/ComplianceContext';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const FileUploadTestComponent: React.FC = () => {
  const mark =
    '"| Reference | Comment | Rule Implementation | Reason |\\n|---|---|---|---|\\n| Percentage (%) w/w | Replace  \\"Percentage (%) w/w\\" with \\"Percent w/w\\" in the header of the Quantitative Composition table. Also, add a column for mg/dose for each ingredient. | No | The rule asks to convert the percentage composition of each ingredient to milligrams per dose and the column header is not clear. | \\n"\n';
  const [file, setFile] = useState<File | null>(null);
  const [references, setReferences] = useState<string[]>([]);
  const [ruleResponses, setRuleResponses] = useState<
    { rule: string; response: string }[]
  >([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { selectedRules } = useCompliance();
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

        const additionalPrompt = 'Your additional prompt text here';
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
          let processedInsights = data.insights.replace(/^text: /, '');
          console.log('processed Insights: ', processedInsights);
          allRuleResponses.push({
            rule: rule.rule,
            response: processedInsights,
          });
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

  function processString(input: string): string {
    let processedString = input.replace(/^text: /, '');

    if (processedString.startsWith('"') && processedString.endsWith('"')) {
      processedString = processedString.slice(1, -1);
    }

    processedString = processedString.replace(/\n/g, '').trim();

    console.log('processed', processedString);

    const parts = input.split('"');

    const extractedPart = parts[1].trim();

    console.log(extractedPart);

    return extractedPart;
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
                <Markdown remarkPlugins={[remarkGfm]}>
                  {mark}
                  {/* {ruleResponse.response} */}
                </Markdown>
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
