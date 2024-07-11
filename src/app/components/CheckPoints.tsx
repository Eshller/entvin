import React, { useState, useEffect } from 'react';
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
import { useCompliance } from '../context/ComplianceContext';
import regulatoryComplianceRules from '../constants';

// Define the type for selectedRules
type SelectedRule = {
  rule: string;
  explainerText: string;
};

const CheckPoints: React.FC = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [checkedCheckpoints, setCheckedCheckpoints] = useState<string[]>([]);
  const {
    selectedModules,
    setSelectedModules,
    selectedRules,
    setSelectedRules,
  } = useCompliance();

  useEffect(() => {
    // Reset checked checkpoints and selectedRules when selectedModules change
    setCheckAll(false);
    setCheckedCheckpoints([]);
    setSelectedRules([]);
  }, [selectedModules]);

  const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setCheckAll(isChecked);
    if (isChecked) {
      const allSelectedRules = regulatoryComplianceRules.map((rule) => ({
        id: rule.id,
        rule: rule.rule,
        explainerText: rule.explainerText,
      }));
      setCheckedCheckpoints(allSelectedRules.map((rule) => rule.rule));
      setSelectedRules(allSelectedRules);
    } else {
      setCheckedCheckpoints([]);
      setSelectedRules([]);
    }
  };

  const handleCheckboxChange =
    (id: string, checkpoint: string, explainerText: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        setCheckedCheckpoints((prevChecked) => [...prevChecked, checkpoint]);
        setSelectedRules((prevRules) => [
          ...prevRules,
          { id: id, rule: checkpoint, explainerText: explainerText },
        ]);
      } else {
        setCheckedCheckpoints((prevChecked) =>
          prevChecked.filter((item) => item !== checkpoint)
        );
        setSelectedRules((prevRules) =>
          prevRules.filter((item) => item.rule !== checkpoint)
        );
      }
      if (!isChecked) {
        setCheckAll(false);
      } else if (
        checkedCheckpoints.length + 1 ===
        regulatoryComplianceRules.length
      ) {
        setCheckAll(true);
      }
    };

  useEffect(() => {
    console.log('checked points', checkedCheckpoints);
    console.log('selected modules', selectedModules);
    console.log('selected rules', selectedRules);
  }, [checkedCheckpoints, selectedModules, selectedRules]);

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
                    control={
                      <Checkbox
                        checked={checkAll}
                        onChange={handleCheckAllChange}
                      />
                    }
                    label='Check All'
                  />
                </TableCell>
                <TableCell>Checkpoints</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {regulatoryComplianceRules.map((rule, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}.</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={checkedCheckpoints.includes(rule.rule)}
                      onChange={handleCheckboxChange(
                        rule.id,
                        rule.rule,
                        rule.explainerText
                      )}
                    />
                  </TableCell>
                  <TableCell>{rule.rule}</TableCell>
                </TableRow>
              ))}
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
