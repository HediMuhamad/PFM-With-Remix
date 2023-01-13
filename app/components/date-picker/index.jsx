import PropTypes from "prop-types"
import { useCallback, useState } from "react"
import { Calendar } from "react-date-range"
import { Calender as CalenderIcon } from "~/shared/assets"

export default function DatePicker({
  label,
  date,
  maxDate,
  minDate,
  onSelect,
}) {
  const [isSelectorShowedUp, setIsSelectorShowed] = useState(false)

  const pickerTogglerHandler = useCallback(() => {
    setIsSelectorShowed((isSelectorShowedUp) => !isSelectorShowedUp)
  }, [])

  return (
    <div className="date-picker">
      <div className="date-picker-toggler" onClick={pickerTogglerHandler}>
        <span className="date-picker-content">{`${label}${
          date ? ": " + date.toLocaleDateString() : ""
        }`}</span>
        <span className="date-picker-icon">
          <CalenderIcon />
        </span>
      </div>
      <div
        className={`date-picker-selector ${
          isSelectorShowedUp ? `date-picker-selector-showed` : ""
        }`}
      >
        <Calendar
          maxDate={maxDate}
          date={date ? date : new Date()}
          minDate={minDate}
          onChange={onSelect}
        />
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.objectOf(Date).isRequired,
  onSelect: PropTypes.func.isRequired,
  maxDate: PropTypes.objectOf(Date).isRequired,
  minDate: PropTypes.objectOf(Date).isRequired,
}
