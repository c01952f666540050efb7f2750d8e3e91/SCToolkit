import { useState, useEffect } from 'react';

import path from 'path';

import FakeUSD from './abis/FakeUSDT.json';

type Option = {
    label: string;
    value: string;
};

const options: Option[] = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
];



export default function ContractDropdown() {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);
    };


    return (
        <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown" value={selectedOption} onChange={handleChange}>
                <option value="">-- Please select an option --</option>
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
        </div>

    );
}