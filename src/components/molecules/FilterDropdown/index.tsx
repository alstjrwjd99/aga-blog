import Button from '@/components/atoms/Button'
import styles from './styles.module.scss'
import Icon from '@/components/atoms/Icon'
import { useState } from 'react'

interface FilterDropdownProps {
  options: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  placeholder = "필터 선택",
  className = ""
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={`filter-dropdown ${className}`}>
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        className="filter-dropdown-button"
      >
        <span className="filter-dropdown-button-text">{selectedOption?.label || placeholder}</span>
        <Icon
          name={isOpen ? "chevron-up" : "chevron-down"}
          size="sm"
          className="filter-dropdown-button-icon"
        />
      </Button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`filter-dropdown-option ${
                value === option.value ? 'filter-dropdown-option-selected' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
