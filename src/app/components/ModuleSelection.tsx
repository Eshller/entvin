import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import VertexSelection from './Vertices';
import CheckPoints from './CheckPoints';
import { useModules } from '../context/ModuleContext';

const ModuleSelection: React.FC = () => {
  const { selectedModules, setSelectedModules } = useModules();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const handleSelectChange = (value: string) => {
    if (!selectedModules.includes(value)) {
      setSelectedModules([...selectedModules, value]);
    }
  };

  const handleDelete = (module: string) => {
    setSelectedModules(selectedModules.filter((m) => m !== module));
  };

  const handleToggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const closeAllDropdowns = () => {
    setOpenDropdownIndex(null);
  };

  const options = [
    {
      label: 'RTR',
      value: 'RTR',
      subOptions: [
        { label: 'Sub RTR 1', value: 'Sub RTR 1' },
        { label: 'Sub RTR 2', value: 'Sub RTR 2' },
      ],
    },
    {
      label: 'Module 1',
      value: 'Module 1',
      subOptions: [
        { label: 'Sub Module 1-1', value: 'Sub Module 1-1' },
        { label: 'Sub Module 1-2', value: 'Sub Module 1-2' },
      ],
    },
    {
      label: 'Module 2',
      value: 'Module 2',
      subOptions: [
        { label: 'Sub Module 2-1', value: 'Sub Module 2-1' },
        { label: 'Sub Module 2-2', value: 'Sub Module 2-2' },
      ],
    },
    { label: 'Module 3', value: 'Module 3' },
    { label: 'Module 4', value: 'Module 4' },
  ];

  return (
    <div
      className='bg-[#FCFBFF] mt-2'
      style={{ fontFamily: 'Satoshi !important' }}
    >
      <div className='p-5 mt-5 border-2 bg-white border-[#EDEDED]'>
        <h2 className='text-xl mb-3' style={{ fontWeight: '500' }}>
          Select Modules
        </h2>
        <div className='flex flex-col space-y-2 mb-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
          {Array.from({ length: 6 }).map((_, index) => (
            <CustomDropdown
              key={index}
              label='Module'
              options={options}
              onSelect={handleSelectChange}
              isOpen={openDropdownIndex === index}
              onToggle={() => handleToggleDropdown(index)}
              closeDropdown={closeAllDropdowns}
            />
          ))}
        </div>
        <div className='flex space-x-2 mt-4'>
          {selectedModules.map((module: string) => (
            <span
              key={module}
              className='bg-[#FCFBFF] border-[#E4E4E4] border-[1px] px-4 py-2 rounded-full flex items-center'
            >
              Module: {module}
              <button
                onClick={() => handleDelete(module)}
                className='ml-2 text-[#7F56D9] text-xl'
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className='flex w-max items-center p-2 gap-2 bg-white border-[#E4E4E4] border-2 rounded-md mt-4'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 4C16.4062 4 20 7.59375 20 12C20 16.4375 16.4062 20 12 20C7.5625 20 4 16.4375 4 12C4 7.59375 7.5625 4 12 4ZM12 8C11.4688 8 11 8.46875 11 9C11 9.5625 11.4688 10 12 10C12.5312 10 13 9.5625 13 9C13 8.46875 12.5312 8 12 8ZM13.25 16C13.6562 16 14 15.6875 14 15.25C14 14.8438 13.6562 14.5 13.25 14.5H12.75V11.75C12.75 11.3438 12.4062 11 12 11H11C10.5625 11 10.25 11.3438 10.25 11.75C10.25 12.1875 10.5625 12.5 11 12.5H11.25V14.5H10.75C10.3125 14.5 10 14.8438 10 15.25C10 15.6875 10.3125 16 10.75 16H13.25Z'
              fill='#7F56D9'
            />
          </svg>
          <span className='text-[#7F56D9]'>
            You can select multiple modules
          </span>
        </div>
      </div>
      <VertexSelection />
      <CheckPoints selectedModules={selectedModules} />
    </div>
  );
};

export default ModuleSelection;
