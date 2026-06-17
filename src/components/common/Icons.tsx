import React from 'react';

const ICON_SYSTEM = {
  'visibility-off': (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  ),
  'visibility-on': (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M46 38C46 39.0609 45.5786 40.0783 44.8284 40.8284C44.0783 41.5786 43.0609 42 42 42H6C4.93913 42 3.92172 41.5786 3.17157 40.8284C2.42143 40.0783 2 39.0609 2 38V16C2 14.9391 2.42143 13.9217 3.17157 13.1716C3.92172 12.4214 4.93913 12 6 12H14L18 6H30L34 12H42C43.0609 12 44.0783 12.4214 44.8284 13.1716C45.5786 13.9217 46 14.9391 46 16V38Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 34C28.4183 34 32 30.4183 32 26C32 21.5817 28.4183 18 24 18C19.5817 18 16 21.5817 16 26C16 30.4183 19.5817 34 24 34Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.3327 39V35.6667C37.3327 33.8986 36.6303 32.2029 35.3801 30.9526C34.1298 29.7024 32.4341 29 30.666 29H17.3327C15.5646 29 13.8689 29.7024 12.6186 30.9526C11.3684 32.2029 10.666 33.8986 10.666 35.6667V39"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.0007 22.3333C27.6825 22.3333 30.6673 19.3486 30.6673 15.6667C30.6673 11.9848 27.6825 9 24.0007 9C20.3188 9 17.334 11.9848 17.334 15.6667C17.334 19.3486 20.3188 22.3333 24.0007 22.3333Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.3333 35.6667C29.6971 35.6667 35.6667 29.6971 35.6667 22.3333C35.6667 14.9695 29.6971 9 22.3333 9C14.9695 9 9 14.9695 9 22.3333C9 29.6971 14.9695 35.6667 22.3333 35.6667Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 39L31.75 31.75"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'more-vertical': (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 9C18.8284 9 19.5 8.32843 19.5 7.5C19.5 6.67157 18.8284 6 18 6C17.1716 6 16.5 6.67157 16.5 7.5C16.5 8.32843 17.1716 9 18 9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 30C18.8284 30 19.5 29.3284 19.5 28.5C19.5 27.6716 18.8284 27 18 27C17.1716 27 16.5 27.6716 16.5 28.5C16.5 29.3284 17.1716 30 18 30Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 10L10 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10L26 26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18V26C9 26.5304 9.23705 27.0391 9.65901 27.4142C10.081 27.7893 10.6533 28 11.25 28H24.75C25.3467 28 25.919 27.7893 26.341 27.4142C26.7629 27.0391 27 26.5304 27 26V18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 11L18 7L14 11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 7V21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'chevron-left': (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 28L13 18L23 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'chevron-right': (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 8L23 18L13 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'chevron-down': (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 13L18 23L8 13"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  like: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6664 9.8C17.6664 7.46667 18.1513 7 19.121 7C20.0907 7 22.2725 7.93333 22.2725 10.7333C22.2725 13.0667 21.5453 14.4667 21.5453 14.4667H26.1223C28.5271 14.4667 30.3502 16.548 29.9429 18.8347L28.8568 24.9013C28.5368 26.6933 26.9271 28 25.0362 28H23.4847C18.6604 28 15.5525 26.9752 14 26.2836V14.7215C15.4352 13.8021 17.6664 12.0176 17.6664 9.8ZM11.25 28H8.75C7.785 28 7 27.2673 7 26.3667V15.6333C7 14.7327 7.785 14 8.75 14H11.25C12.215 14 13 14.7327 13 15.6333V26.3667C13 27.2673 12.215 28 11.25 28Z"
        fill="currentColor"
      />
    </svg>
  ),
  'exterminal-link': (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 9C20 8.44772 20.4477 8 21 8H27C27.5523 8 28 8.44772 28 9V15C28 15.5523 27.5523 16 27 16C26.4477 16 26 15.5523 26 15V11.4142L14.7071 22.7071C14.3166 23.0976 13.6834 23.0976 13.2929 22.7071C12.9024 22.3166 12.9024 21.6834 13.2929 21.2929L24.5858 10H21C20.4477 10 20 9.55228 20 9ZM10.1333 13C9.83275 13 9.54449 13.1194 9.33195 13.3319C9.1194 13.5445 9 13.8328 9 14.1333V25.8667C9 26.1672 9.1194 26.4555 9.33195 26.6681C9.54449 26.8806 9.83276 27 10.1333 27H21.8667C22.1672 27 22.4555 26.8806 22.6681 26.6681C22.8806 26.4555 23 26.1672 23 25.8667V19.4667C23 18.9144 23.4477 18.4667 24 18.4667C24.5523 18.4667 25 18.9144 25 19.4667V25.8667C25 26.6977 24.6699 27.4947 24.0823 28.0823C23.4947 28.6699 22.6977 29 21.8667 29H10.1333C9.30232 29 8.50535 28.6699 7.91773 28.0823C7.33012 27.4947 7 26.6977 7 25.8667V14.1333C7 13.3023 7.33012 12.5053 7.91773 11.9177C8.50535 11.3301 9.30232 11 10.1333 11H16.5333C17.0856 11 17.5333 11.4477 17.5333 12C17.5333 12.5523 17.0856 13 16.5333 13H10.1333Z"
        fill="currentColor"
      />
    </svg>
  ),
  'chevron-up': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 12.75L12 16.5L18 12.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 7.75L12 11.5L18 7.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 6L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'gnd-menu': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
      <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="5" y="13" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="13" y="13" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="13" y="5" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  ),
  sort: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 17H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export type IconType = keyof typeof ICON_SYSTEM;

interface IconsProps {
  name: IconType;
  className?: string;
}

export function Icons({ name, className = 'w-6 h-6' }: IconsProps) {
  const iconElement = ICON_SYSTEM[name];

  return React.cloneElement(iconElement, {
    className: className,
    'aria-hidden': 'true',
  });
}
