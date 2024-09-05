export type Sex = 'None' | 'M' | 'F';

interface SelectProps {
    selectedSex: Sex;
    onChange: (sex: Sex) => void;
}

function SexSelector({ selectedSex, onChange }: SelectProps): JSX.Element {
    const options = ['None', 'M', 'F'];
    return (
        <select
            value={selectedSex}
            onChange={(e) => onChange(e.target.value as Sex)}>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default SexSelector;