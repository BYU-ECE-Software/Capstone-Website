import React, { useState, useRef, useEffect, memo } from 'react';
import './custom_select.css';

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: Option[];
    onSelect: (option: Option) => void;
    placeholder?: string;
}

function CustomSelect({ options, onSelect, placeholder = 'Select an option' }: CustomSelectProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    setFilteredOptions(
        options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
    );
    //setHighlightedIndex(0);
    }, [inputValue, options]);

    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
        (prev - 1 + filteredOptions.length) % filteredOptions.length
        );
    } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(filteredOptions[highlightedIndex]);
    } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
    }
    };

    const handleSelect = (option: Option) => {
    onSelect(option);
    setInputValue('');
    setIsOpen(false);
    };

    return (
    <div className="custom-select-container" ref={containerRef}>
        <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onClick={() => setIsOpen(true)}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="custom-select-input w-full border border-gray-300 rounded p-2"
        />
        {isOpen && filteredOptions.length > 0 && (
        <ul className="custom-select-menu">
            {filteredOptions.map((option, index) => (
            <li
                key={option.value}
                className={`custom-select-option ${
                index === highlightedIndex ? 'highlighted' : ''
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(e) => {
                // Use onMouseDown instead of onClick to prevent focus loss
                e.preventDefault();
                handleSelect(option);
                }}
            >
                {option.label}
            </li>
            ))}
        </ul>
        )}
    </div>
    );
}

export default memo(CustomSelect);