import React, { useState } from 'react';
import { Dropdown } from '@nextui-org/react';

interface DropdownProps {
  options: string[];
}

const sendDropdown: React.FC<DropdownProps> = ({ options }) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOptionClick = (option: string) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

  return (
    <div className="dropdown">
        <Dropdown>
        <Dropdown.Button flat>Trigger</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">New file</Dropdown.Item>
                <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                <Dropdown.Item key="delete" color="error">
                Delete file
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  );
};

export default Dropdown;
