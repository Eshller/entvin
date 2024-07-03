'use client';
// components/Sidebar.tsx
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBackwardIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/material';
const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (item: string) => {
    setOpen(open === item ? null : item);
  };

  const menuItems = [
    {
      text: 'Home',
      bg: 'white',
      icon: (
        <svg
          width='20'
          height='17'
          viewBox='0 0 20 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.7188 8.1875C19.0312 8.46875 19.0625 8.9375 18.8125 9.25C18.5312 9.5625 18.0625 9.59375 17.75 9.34375L17 8.6875V14.5C17 15.9062 15.875 17 14.5 17H5.5C4.09375 17 3 15.9062 3 14.5V8.6875L2.21875 9.34375C1.90625 9.59375 1.4375 9.5625 1.15625 9.25C0.90625 8.9375 0.9375 8.46875 1.25 8.1875L9.5 1.1875C9.78125 0.96875 10.1875 0.96875 10.4688 1.1875L18.7188 8.1875ZM5.5 15.5H7V10.75C7 10.0625 7.53125 9.5 8.25 9.5H11.75C12.4375 9.5 13 10.0625 13 10.75V15.5H14.5C15.0312 15.5 15.5 15.0625 15.5 14.5V7.40625L10 2.75L4.5 7.40625V14.5C4.5 15.0625 4.9375 15.5 5.5 15.5ZM8.5 15.5H11.5V11H8.5V15.5Z'
            fill='#1F1F1F'
          />
        </svg>
      ),
      nested: false,
    },
    {
      text: 'Literature Search',
      bg: 'white',
      icon: (
        <svg
          width='17'
          height='16'
          viewBox='0 0 17 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.75 14.7188C16.0625 15.0312 16.0625 15.5 15.75 15.7812C15.625 15.9375 15.4375 16 15.25 16C15.0312 16 14.8438 15.9375 14.6875 15.7812L10.5 11.5938C9.375 12.5 7.96875 13 6.46875 13C2.90625 13 0 10.0938 0 6.5C0 2.9375 2.875 0 6.46875 0C10.0312 0 12.9688 2.9375 12.9688 6.5C12.9688 8.03125 12.4688 9.4375 11.5625 10.5312L15.75 14.7188ZM1.5 6.5C1.5 9.28125 3.71875 11.5 6.5 11.5C9.25 11.5 11.5 9.28125 11.5 6.5C11.5 3.75 9.25 1.5 6.5 1.5C3.71875 1.5 1.5 3.75 1.5 6.5Z'
            fill='#1F1F1F'
          />
        </svg>
      ),
      nested: true,
      children: [
        { text: 'Development Strategy' },
        { text: 'Analytical Strategy' },
      ],
    },
    {
      text: 'Saved Reports',
      bg: 'white',
      icon: (
        <svg
          width='12'
          height='17'
          viewBox='0 0 12 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.5 0C11.3125 0 12 0.6875 12 1.5V15C12 15.7812 11.1562 16.25 10.4688 15.875L6 13.25L1.5 15.875C0.8125 16.25 0 15.7812 0 15V1.5C0 0.6875 0.65625 0 1.5 0H10.5ZM10.5 14.125V1.6875C10.5 1.59375 10.4062 1.5 10.2812 1.5H1.65625C1.5625 1.5 1.5 1.59375 1.5 1.6875V14.125L6 11.5L10.5 14.125Z'
            fill='#1F1F1F'
          />
        </svg>
      ),
      nested: true,
      children: [
        { text: 'Development Strategy' },
        { text: 'Analytical Strategy' },
      ],
    },
    {
      text: 'Document with AI Chat',
      bg: 'white',
      icon: (
        <svg
          width='17'
          height='17'
          viewBox='0 0 17 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.09375 2.6875C9.03125 2.65625 9 2.59375 9 2.53125C9 2.4375 9.03125 2.375 9.09375 2.34375L10.6562 1.6875L11.3125 0.125C11.3438 0.0625 11.4062 0 11.5 0C11.5625 0 11.625 0.0625 11.6562 0.125L12.3125 1.6875L13.875 2.3125C13.9375 2.375 13.9688 2.4375 13.9688 2.5C13.9688 2.59375 13.9375 2.65625 13.875 2.6875L12.3125 3.34375L11.6562 4.90625C11.625 4.96875 11.5625 5.03125 11.4688 5.03125C11.4062 5.03125 11.3438 4.96875 11.2812 4.90625L10.6562 3.34375L9.09375 2.6875ZM16.9062 6.875C16.9375 6.90625 17 6.9375 17 7C17 7.0625 16.9375 7.125 16.875 7.15625L15.6562 7.6875L15.125 8.9375C15.0938 8.96875 15.0312 9.03125 14.9688 9.03125C14.9062 9.03125 14.875 8.96875 14.8438 8.9375L14.3125 7.6875L13.0938 7.15625C13.0312 7.125 12.9688 7.09375 12.9688 7.03125C12.9688 6.96875 13.0312 6.90625 13.0938 6.875L14.3125 6.34375L14.8438 5.125C14.875 5.0625 14.9375 5.03125 15 5.03125C15.0625 5.03125 15.0938 5.0625 15.125 5.125L15.6562 6.34375L16.9062 6.875ZM12.375 8.375C12.9688 8.4375 13.1875 9.1875 12.7812 9.59375L10.4062 11.9062L10.9688 15.1875C11 15.4375 10.9062 15.7188 10.6562 15.875C10.4375 16.0312 10.1562 16.0625 9.90625 15.9375L7 14.375L4.0625 15.9375C3.9375 16 3.84375 16 3.71875 16C3.3125 16 2.9375 15.625 3.03125 15.1875L3.5625 11.9062L1.21875 9.59375C0.78125 9.1875 1 8.4375 1.59375 8.375L4.875 7.875L6.34375 4.90625C6.46875 4.65625 6.71875 4.5 6.96875 4.5C7.25 4.5 7.5 4.65625 7.625 4.90625L9.09375 7.875L12.375 8.375ZM8.78125 11.375L10.5938 9.625L8.09375 9.25L7 7L5.875 9.25L3.375 9.625L5.1875 11.375L4.75 13.875L7 12.6875L9.21875 13.875L8.78125 11.375Z'
            fill='#1F1F1F'
          />
        </svg>
      ),
      nested: true,
      children: [
        { text: 'Regulatory Document' },
        { text: 'Scientific Document' },
      ],
    },
    {
      text: 'Help and Support',
      bg: 'white',
      icon: (
        <svg
          width='14'
          height='16'
          viewBox='0 0 14 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.8125 11C12.125 11 14 12.875 14 15.1875C14 15.6562 13.625 16 13.1562 16H0.8125C0.34375 16 0 15.6562 0 15.1875C0 12.875 1.84375 11 4.15625 11H9.8125ZM1.5625 14.5H12.4062C12.0938 13.375 11.0625 12.5 9.8125 12.5H4.15625C2.90625 12.5 1.875 13.375 1.5625 14.5ZM7 3.5C5.59375 3.5 4.5 4.625 4.5 6C4.5 6.625 4.71875 7.15625 5.0625 7.59375C4.71875 7.96875 4.5 8.46875 4.5 9C4.5 9.0625 4.5 9.09375 4.5 9.125C3.59375 8.40625 3 7.28125 3 6C3 3.8125 4.78125 2 7 2C9.1875 2 11 3.8125 11 6C11 6.46875 10.9062 6.90625 10.75 7.3125C10.5 7.71875 10.0312 8 9.5 8H9.21875C9.125 7.875 9.03125 7.71875 8.90625 7.59375C9.25 7.15625 9.5 6.625 9.5 6C9.5 4.625 8.375 3.5 7 3.5ZM1.5 7C1.21875 7 1 6.78125 1 6.5V6C1 2.71875 3.6875 0 7 0C10.2812 0 13 2.71875 13 6V6.5C12.9688 8.4375 11.4062 10 9.5 10H6.5C5.9375 10 5.5 9.5625 5.5 9C5.5 8.46875 5.9375 8 6.5 8H7.5C8.03125 8 8.5 8.46875 8.5 9H9.5C10.875 9 12 7.90625 12 6.5V6C12 3.25 9.75 1 7 1C4.21875 1 2 3.25 2 6V6.5C2 6.78125 1.75 7 1.5 7Z'
            fill='#1F1F1F'
          />
        </svg>
      ),
      nested: false,
    },
    {
      text: 'AI Scrutinizer',
      bg: '#7F56D9',
      icon: (
        <svg
          width='14'
          height='16'
          viewBox='0 0 14 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14 11C14 11.6562 13.5625 12.2188 13 12.4375V14.5H13.25C13.6562 14.5 14 14.8438 14 15.25C14 15.6875 13.6562 16 13.25 16H2.5C1.09375 16 0 14.9062 0 13.5V2.5C0 1.125 1.09375 0 2.5 0H12.5C13.3125 0 14 0.6875 14 1.5V11ZM11.5 14.5V12.5H2.5C1.9375 12.5 1.5 12.9688 1.5 13.5C1.5 14.0625 1.9375 14.5 2.5 14.5H11.5ZM12.5 11V1.5H2.5C1.9375 1.5 1.5 1.96875 1.5 2.5V11.2188C1.78125 11.0938 2.125 11 2.5 11H12.5ZM4.75 5C4.3125 5 4 4.6875 4 4.25C4 3.84375 4.3125 3.5 4.75 3.5H10.25C10.6562 3.5 11 3.84375 11 4.25C11 4.6875 10.6562 5 10.25 5H4.75ZM4.75 7.5C4.3125 7.5 4 7.1875 4 6.75C4 6.34375 4.3125 6 4.75 6H10.25C10.6562 6 11 6.34375 11 6.75C11 7.1875 10.6562 7.5 10.25 7.5H4.75Z'
            fill='white'
          />
        </svg>
      ),
      nested: false,
    },
  ];

  return (
    <div
      className='w-64 bg-white h-screen p-5 box-border hidden flex-col md:flex'
      style={{ fontFamily: 'Satoshi !important' }}
    >
      <div className='text-2xl font-bold mb-5'>
        <img src='/logo.png' alt='' />
      </div>
      <List>
        {menuItems.map((item, index) => (
          <div key={index}>
            <ListItem
              button
              onClick={() => item.nested && handleClick(item.text)}
              className='rounded-md'
              style={{
                background: item.bg,
                color: item.bg === 'white' ? 'black' : 'white',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  marginRight: '8px',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                // primaryTypographyProps={{ noWrap: true }}
                sx={{ fontSize: '12px' }}
              />
              {item.nested ? (
                open === item.text ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item.nested && (
              <Collapse in={open === item.text} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.children?.map((child, idx) => (
                    <ListItem button key={idx} className='pl-10'>
                      <ListItemText primary={child.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
            {(index === 4 || index === 6) && <></>}
          </div>
        ))}
      </List>
      <Stack className='mt-auto'>
        <hr />
        <div className='flex align-middle place-content-center justify-around items-center'>
          <Avatar
            alt='Eshu Koli'
            src='/potrait.jpeg'
            className='rounded-full mt-4'
          />
          <span>Eshu Koli</span>
        </div>
        <Stack>
          <div className='flex '>
            <button className='mt-3 pl-6 flex items-center justify-center rounded-md py-1 px-4'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 16.25C8 16.6875 7.65625 17 7.25 17H5C3.3125 17 2 15.6875 2 14V6C2 4.34375 3.3125 3 5 3H7.25C7.65625 3 8 3.34375 8 3.75C8 4.1875 7.65625 4.5 7.25 4.5H5C4.15625 4.5 3.5 5.1875 3.5 6V14C3.5 14.8438 4.15625 15.5 5 15.5H7.25C7.65625 15.5 8 15.8438 8 16.25ZM17.7812 9.5L13.8125 5.25C13.5312 4.9375 13.0625 4.9375 12.75 5.21875C12.4375 5.5 12.4375 5.96875 12.7188 6.28125L15.5 9.25H7.71875C7.3125 9.25 7 9.59375 7 10C7 10.4375 7.3125 10.75 7.71875 10.75H15.4688L12.6562 13.75C12.375 14.0625 12.375 14.5312 12.6875 14.8125C12.875 14.9375 13.0625 15 13.2188 15C13.4062 15 13.5938 14.9375 13.75 14.7812L17.7188 10.5312C18.0625 10.25 18.0625 9.78125 17.7812 9.5Z'
                  fill='#1F1F1F'
                />
              </svg>
              Logout
            </button>
          </div>
        </Stack>
      </Stack>
      {/* <div className='mt-auto text-center'>
        <Stack direction='row' spacing={0}>
          <Avatar
            alt='Eshu Koli'
            src='/potrait.jpeg'
            className='rounded-full w-12 h-12 mx-auto'
          />
          <p>Eshu Koli</p>
        </Stack>
        <button className='mt-2 bg-gray-200 rounded-md py-1 px-4'>
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
