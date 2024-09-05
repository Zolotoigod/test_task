import React from 'react';

interface CheckboxProps {
    onCheck: () => void;
    onUncheck: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onCheck, onUncheck }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            onCheck();
        } else {
            onUncheck();
        }
    };

    return (
        <input type="checkbox" onChange={handleChange} />
    );
};

export default Checkbox;