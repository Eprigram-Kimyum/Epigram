'use client';

import { useState, ReactNode } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
}

export default function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const dropdownRef = useOutsideClick<HTMLDivElement>({ callback: handleClose });

  return (
    <div ref={dropdownRef}>
      <div onClick={handleToggle} role="button" aria-haspopup="true" aria-expanded={isOpen}>
        {trigger}
      </div>

      {isOpen && (
        <ul role="menu">
          {items.map((item, index) => (
            <li
              key={index}
              role="menuitem"
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
