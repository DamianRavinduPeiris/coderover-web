import React from 'react';

interface ModelDropdownProps {
  selectedModel: string;
  onChange: (model: string) => void;
  disabled?: boolean;
}

const models = [
  { id: 'gpt-5', name: 'GPT-5' },
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5', name: 'GPT-3.5' },
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
