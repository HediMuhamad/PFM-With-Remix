import PropTypes from "prop-types"
import { useCallback, useState } from "react"
import { Calendar } from "react-date-range"
import { Calender as CalenderIcon } from "~/shared/assets/"

export default function DatePicker({
  nameInForm,
  datePickerLabel,
  datePickerDate,
  datePickerMaxDate,
  datePickerMinDate,
  datePickerOnAnOptionSelected,
}) {
  const [isSelectorShowedUp, setIsSelectorShowed] = useState(false)

  const pickerTogglerHandler = useCallback(() => {
    setIsSelectorShowed((isSelectorShowedUp) => !isSelectorShowedUp)
  }, [])

  return (
    <div className="date-picker">
      <input
        type={"hidden"}
        name={nameInForm}
        value={datePickerDate ? datePickerDate.toString() : ""}
      />
      <div className="date-picker-toggler" onClick={pickerTogglerHandler}>
        <span className="date-picker-content">{`${datePickerLabel}${
          datePickerDate ? ": " + datePickerDate.toLocaleDateString() : ""
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
          maxDate={datePickerMaxDate}
          date={datePickerDate ? datePickerDate : new Date()}
          minDate={datePickerMinDate}
          onChange={datePickerOnAnOptionSelected}
        />
      </div>
    </div>
  )
}

DatePicker.propTypes = {
  nameInForm: PropTypes.string,
  datePickerLabel: PropTypes.string,
  datePickerDate: PropTypes.objectOf(Date),
  datePickerMaxDate: PropTypes.objectOf(Date),
  datePickerMinDate: PropTypes.objectOf(Date),
  datePickerOnAnOptionSelected: PropTypes.func,
}

DatePicker.defaultProps = {
  nameInForm: "",
  datePickerLabel: "date",
  datePickerDate: null,
  datePickerMaxDate: null,
  datePickerMinDate: null,
  datePickerOnAnOptionSelected: () => {},
}
