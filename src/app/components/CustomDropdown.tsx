import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  value: string;
  subOptions?: DropdownOption[];
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  closeDropdown: () => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  isOpen,
  onToggle,
  closeDropdown,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = React.useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    onToggle(); // This function is to close the dropdown after selection
  };

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <div className='relative inline-block w-full text-left' ref={dropdownRef}>
      <div>
        <button
          type='button'
          className='inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
          onClick={onToggle}
          style={{ zIndex: 10 }}
        >
          {selectedValue || label}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className='origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {options.map((option, index) => (
              <div key={option.value} className='relative group'>
                <button
                  onClick={() => handleSelect(option.value)}
                  className='text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 flex justify-between'
                  onMouseEnter={() => handleSubMenuToggle(index)}
                >
                  {option.label}
                  {option.subOptions && (
                    <ChevronRightIcon />
                    // <svg
                    //   className='h-5 w-5 ml-2'
                    //   xmlns='http://www.w3.org/2000/svg'
                    //   viewBox='0 0 20 20'
                    //   fill='currentColor'
                    //   aria-hidden='true'
                    // >
                    //   <path
                    //     fillRule='evenodd'
                    //     d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z'
                    //     clipRule='evenodd'
                    //   />
                    // </svg>
                  )}
                </button>
                {option.subOptions && openSubMenu === index && (
                  <div className='origin-top-left absolute left-full top-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20'>
                    <div className='py-1'>
                      {option.subOptions.map((subOption) => (
                        <button
                          key={subOption.value}
                          onClick={() => handleSelect(subOption.value)}
                          className='text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900'
                        >
                          {subOption.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {index < options.length - 1 && <hr className='my-1' />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
