import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useCompliance } from '../context/ComplianceContext';
import Markdown from 'react-markdown';

const Results = () => {
  const { selectedModules, selectedRules, geminiResponse } = useCompliance();
  console.log(geminiResponse);

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
    <div
      className='bg-[#FCFBFF] mt-10'
      style={{ fontFamily: 'Satoshi !important' }}
    >
      <div className='border-2 border-b-0 border-[#EDEDED] bg-white'>
        <Stack
          direction='row'
          justifyContent='space-between'
          className='p-4 pb-0'
        >
          <Typography variant='h6' className='font-bold'>
            Results
          </Typography>
          <Button
            variant='contained'
            className='capitalize'
            sx={{ fontFamily: 'Satoshi !important' }}
          >
            Download <KeyboardArrowDownIcon />
          </Button>
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
            <AccordionDetails sx={{ marginTop: '-30px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                      }}
                      className='font-bold text-[#4D4D4D]'
                    >
                      S.No.
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                      }}
                      className='font-bold text-[#4D4D4D]'
                    >
                      Checkpoints
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                      }}
                      className='font-bold text-[#4D4D4D]'
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '1.1rem',
                      }}
                      className='font-bold text-[#4D4D4D]'
                    >
                      Result
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {geminiResponse.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          border: 'none',
                          fontWeight: '100',
                          fontSize: '1.1rem',
                        }}
                      >
                        {index + 1}.
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
                        {rule.rule}
                      </TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              width='20'
                              height='20'
                              rx='10'
                              fill='#27BC94'
                            />
                            <path
                              d='M14.0547 7.32031C14.3086 7.55469 14.3086 7.96484 14.0547 8.19922L9.05469 13.1992C8.82031 13.4531 8.41016 13.4531 8.17578 13.1992L5.67578 10.6992C5.42188 10.4648 5.42188 10.0547 5.67578 9.82031C5.91016 9.56641 6.32031 9.56641 6.55469 9.82031L8.60547 11.8711L13.1758 7.32031C13.4102 7.06641 13.8203 7.06641 14.0547 7.32031Z'
                              fill='white'
                            />
                          </svg>{' '}
                          <span
                            className='text-[#27BC94] font-semibold'
                            style={{ fontWeight: '400', fontSize: '1rem' }}
                          >
                            Done
                          </span>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <Sheet>
                          <SheetTrigger asChild className='w-full'>
                            <Button
                              variant='outlined'
                              className='text-xs p-3 w-full font-bold capitalize'
                              sx={{
                                whiteSpace: 'nowrap',
                                fontFamily: 'Satoshi',
                                textTransform: 'capitalize',
                                fontSize: '1rem',
                                borderRadius: '10px',
                                border: '#7F56D9 1.5px solid',
                              }}
                            >
                              View Result
                            </Button>
                          </SheetTrigger>
                          <SheetContent className='w-[600px] h-100 overflow-y-scroll'>
                            <SheetHeader>
                              <SheetTitle>
                                <Stack
                                  direction='row'
                                  justifyContent='space-between'
                                >
                                  <div>Result</div>
                                  <Button
                                    variant='contained'
                                    className='capitalize'
                                    sx={{ fontFamily: 'Satoshi !important' }}
                                  >
                                    Download <KeyboardArrowDownIcon />
                                  </Button>
                                </Stack>
                              </SheetTitle>
                              <SheetDescription>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      {cleanString(
                                        rule.response
                                      ).tableHeaders.map((header, index) => (
                                        <TableCell
                                          sx={{ fontWeight: 'bold' }}
                                          key={index}
                                        >
                                          {header}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {cleanString(rule.response).tableRows.map(
                                      (row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                          {row?.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex}>
                                              <Markdown>{cell}</Markdown>
                                            </TableCell>
                                          ))}
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              </SheetDescription>
                            </SheetHeader>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
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

export default Results;
