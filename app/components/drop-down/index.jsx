import PropTypes from "prop-types"
import { useCallback, useState } from "react"

import { Checked, DownArrow } from "~/shared/assets"

export default function DropDown({ options, selected, toggleOption }) {
  const [isListShowedUp, setIsListShowedUp] = useState(false)

  const listToggleHandler = useCallback(() => {
    setIsListShowedUp((isListShowedUp) => !isListShowedUp)
  }, [])

  return (
    <div className="dropdown">
      <div className="dropdown-select" onClick={listToggleHandler}>
        <span className="dropdown-select-title">
          {selected.length !== 0
            ? selected.reduce(
                (pv, cv) => `${pv}${pv ? ", " : ""}${options[cv].title}`,
                ""
              )
            : "select something"}
        </span>
        <DownArrow height={32} width={32} />
      </div>
      <ul
        className={`dropdown-list ${
          isListShowedUp ? "dropdown-list-showed" : ""
        } `}
      >
        {Object.keys(options).map((key) => {
          const isSelected = selected.includes(key)
          const isDisabled = options[key].disabled

          return (
            <li
              className="dropdown-option"
              onClick={isDisabled ? null : () => toggleOption(key)}
              data-disabled={isDisabled}
              key={key}
            >
              <div className="option-check-box">
                {isSelected ? <Checked /> : <></>}
              </div>
              <div className="option-title">{options[key].title}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

DropDown.propTypes = {
  options: PropTypes.object.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleOption: PropTypes.func.isRequired,
}
