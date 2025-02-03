import clsx from 'clsx'
import styles from './PillMultiSelect.module.css'
import Button from '../Button/Button'

type OptionType = {
  label: string,
  value: string
}


const PillMultiSelect = ({value, onChange, options}: {
  value: string[],
  onChange: (value: any)=>void,
  options: OptionType[]}) => {


  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      // remove if already existed
      onChange(value.filter(v => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className={styles.pill_multi_select}>
      {options.map((option) => (
        <Button
          variant={`${value.includes(option.value) ? 'button':'outline'}`}
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={styles.pill_button}
        >
          {option.label}
        </Button>
      ))}
      </div>
  )
}

export default PillMultiSelect