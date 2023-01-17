import PropTypes from "prop-types"
import { useCallback, useRef, useState } from "react"
import { Calendar } from "react-date-range"
import useOnClickAway from "~/hooks/useOnClickAway"
import { Calender as CalenderIcon } from "~/shared/svgrc/"

export default function DatePicker({
  nameInForm,
  datePickerLabel,
  datePickerDate,
  datePickerMaxDate,
  datePickerMinDate,
  datePickerOnAnOptionSelected,
}) {
  const ref = useRef(null)
  const [isSelectorShowedUp, setIsSelectorShowed] = useState(false)

  const pickerTogglerHandler = useCallback(() => {
    setIsSelectorShowed((isSelectorShowedUp) => !isSelectorShowedUp)
  }, [])

  useOnClickAway(ref, () => {
    setIsSelectorShowed(false)
  })

  return (
    <div className="date-picker" ref={ref}>
      <input
        type={"hidden"}
        name={nameInForm}
        value={datePickerDate ? datePickerDate.toString() : ""}
      />
      <div className="date-picker__toggler" onClick={pickerTogglerHandler}>
        <span className="date-picker__toggler__content">{`${datePickerLabel}${
          datePickerDate ? ": " + datePickerDate.toLocaleDateString() : ""
        }`}</span>
        <span className="date-picker__toggler__icon">
          <CalenderIcon />
        </span>
      </div>
      <div
        className={`date-picker__picker ${
          isSelectorShowedUp ? `date-picker__picker--showed-yes` : ""
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
