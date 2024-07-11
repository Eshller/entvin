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
    <Sheet>
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
              <AccordionSummary
                aria-controls='panel1-content'
                id='panel1-header'
              >
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
                          <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                          >
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
                        </TableCell>
                        <SheetContent className='w-[600px]'>
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
                                            {cell}
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
                      </TableRow>
                    ))}
                    {/* <TableRow>
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
                              fill='#E43F54'
                            />
                            <path
                              d='M14.8828 13.3945C15.1953 13.9414 14.8047 14.625 14.1602 14.625H5.82031C5.17578 14.625 4.78516 13.9414 5.09766 13.3945L9.27734 6.28516C9.58984 5.73828 10.3906 5.73828 10.7227 6.28516L14.8828 13.3945ZM9.53125 8.53125V11.0312C9.53125 11.3047 9.76562 11.5 10 11.5C10.2539 11.5 10.4688 11.3047 10.4688 11.0312V8.53125C10.4688 8.27734 10.2539 8.0625 10 8.0625C9.72656 8.0625 9.53125 8.27734 9.53125 8.53125ZM10 13.375C10.332 13.375 10.6055 13.1016 10.6055 12.7695C10.6055 12.4375 10.332 12.1641 10 12.1641C9.64844 12.1641 9.375 12.4375 9.375 12.7695C9.375 13.1016 9.64844 13.375 10 13.375Z'
                              fill='white'
                            />
                          </svg>
                          <span
                            className='text-[#E43F54] font-semibold'
                            style={{
                              fontFamily: 'Satoshi !important',
                              fontWeight: '400',
                              fontSize: '1rem',
                            }}
                          >
                            Error
                          </span>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <SheetTrigger className='w-full'>
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
                              fill='#FFC20C'
                            />
                            <path
                              d='M12.875 5.25C13.207 5.25 13.5 5.54297 13.5 5.875C13.5 6.22656 13.207 6.5 12.875 6.5V6.71484C12.875 7.55469 12.543 8.35547 11.957 8.94141L10.6289 10.25L11.957 11.5781C12.543 12.1641 12.875 12.9648 12.875 13.7852V14C13.207 14 13.5 14.293 13.5 14.625C13.5 14.9766 13.207 15.25 12.875 15.25H6.625C6.27344 15.25 6 14.9766 6 14.625C6 14.293 6.27344 14 6.625 14V13.7852C6.625 12.9648 6.9375 12.1641 7.52344 11.5781L8.85156 10.25L7.52344 8.94141C6.9375 8.35547 6.625 7.55469 6.625 6.71484V6.5C6.27344 6.5 6 6.22656 6 5.875C6 5.54297 6.27344 5.25 6.625 5.25H12.875ZM8.16797 7.75H11.3125C11.5078 7.45703 11.625 7.08594 11.625 6.71484V6.5H7.875V6.71484C7.875 7.08594 7.97266 7.45703 8.16797 7.75ZM8.16797 12.75H11.3125C11.2344 12.6523 11.1562 12.5547 11.0586 12.4766L9.75 11.1484L8.42188 12.4766C8.32422 12.5547 8.24609 12.6523 8.16797 12.75Z'
                              fill='white'
                            />
                          </svg>
                          <span
                            className='text-[#FFC20C] font-semibold'
                            style={{
                              fontFamily: 'Satoshi !important',
                              fontWeight: '400',
                              fontSize: '1rem',
                            }}
                          >
                            Pending
                          </span>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <SheetTrigger className='w-full'>
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
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </AccordionDetails>
              {/* <SheetContent className='w-[600px]'>
                <SheetHeader>
                  <SheetTitle>
                    <Stack direction='row' justifyContent='space-between'>
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
                          {cleanString(rule.response).tableHeaders.map(
                            (header, index) => (
                              <TableCell
                                sx={{ fontWeight: 'bold' }}
                                key={index}
                              >
                                {header}
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cleanString(rule.response).tableRows.map(
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
                  </SheetDescription>
                </SheetHeader>
              </SheetContent> */}
            </Accordion>
          ))}
        </div>
      </div>
    </Sheet>
  );
};

export default Results;
