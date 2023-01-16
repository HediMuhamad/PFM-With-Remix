import PropTypes from "prop-types"
import { useCallback, useState } from "react"
import { Checked, DownArrow } from "~/shared/assets/"

export default function DropDown({
  nameInForm,
  dropDownOptions,
  dropDownSelectedOptions,
  dropDownToggleOptions,
}) {
  const [isListShowedUp, setIsListShowedUp] = useState(false)

  const listToggleHandler = useCallback(() => {
    setIsListShowedUp((isListShowedUp) => !isListShowedUp)
  }, [])

  /*
  # dropDownOptions should be like this model:
  [{
    name: string,
    disabled: boolean
  }, {...}]
  */

  /*
  # dropDownSelectedOptions just save the index of the selected item in an array
  */

  return (
    <div className="dropdown">
      <input
        type={"hidden"}
        name={nameInForm}
        value={JSON.stringify({
          selected: dropDownSelectedOptions.map(
            (index) => dropDownOptions[index].name
          ),
        })}
      />
      <div className="dropdown-select" onClick={listToggleHandler}>
        <span className="dropdown-select-title">
          {dropDownSelectedOptions.length !== 0
            ? dropDownSelectedOptions.reduce(
                (generatedText, currentIndex) =>
                  `${generatedText}${generatedText ? ", " : ""}${
                    dropDownOptions[currentIndex].name
                  }`,
                ""
              )
            : "select something"}
        </span>
        <DownArrow height={14} width={14} />
      </div>
      <ul
        className={`dropdown-list ${
          isListShowedUp ? "dropdown-list-showed" : ""
        } `}
        role={"listbox"}
      >
        {dropDownOptions.map((item, index) => {
          const isSelected = dropDownSelectedOptions.includes(index)
          const isDisabled = item.disabled
          return (
            <li
              className="dropdown-option"
              onClick={isDisabled ? null : () => dropDownToggleOptions(index)}
              data-disabled={isDisabled}
              key={index}
            >
              <div className="option-check-box">
                {isSelected ? <Checked /> : <></>}
              </div>
              <div className="option-title">{item.name}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

DropDown.propTypes = {
  nameInForm: PropTypes.string,
  dropDownOptions: PropTypes.array.isRequired,
  dropDownSelectedOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  dropDownToggleOptions: PropTypes.func.isRequired,
}

DropDown.defaultProps = {
  nameInForm: "",
}
