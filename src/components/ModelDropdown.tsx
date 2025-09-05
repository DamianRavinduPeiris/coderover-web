import React from 'react';

interface ModelDropdownProps {
  selectedModel: string;
  onChange: (model: string) => void;
  disabled?: boolean;
}

const models = [
  { id: 'gpt-5', name: 'GPT-5' },

  { id: 'salesforce/CodeT5', name: 'Salesforce/CodeT5' },
];

const ModelDropdown: React.FC<ModelDropdownProps> = ({ selectedModel, onChange, disabled }) => (
  <select
    className="px-2 py-1 border rounded text-xs"
    value={selectedModel}
    onChange={e => onChange(e.target.value)}
    disabled={disabled}
  >
    {models.map(model => (
      <option key={model.id} value={model.id}>{model.name}</option>
    ))}
  </select>
);

export default ModelDropdown;
