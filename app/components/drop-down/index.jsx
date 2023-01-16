import PropTypes from "prop-types"
import { useCallback, useRef, useState } from "react"
import useOnClickAway from "~/hooks/useOnClickAway"
import { Checked, DownArrow } from "~/shared/assets/"

export default function DropDown({
  nameInForm,
  dropDownOptions,
  dropDownSelectedOptions,
  dropDownToggleOptions,
}) {
  const ref = useRef(null)
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

  useOnClickAway(ref, () => {
    setIsListShowedUp(false)
  })

  return (
    <div className="drop-down" ref={ref}>
      <input
        type={"hidden"}
        name={nameInForm}
        value={JSON.stringify({
          selected: dropDownSelectedOptions.map(
            (index) => dropDownOptions[index].name
          ),
        })}
      />
      <div className="drop-down__select" onClick={listToggleHandler}>
        <span className="drop-down__select__title">
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
        className={`drop-down__list ${
          isListShowedUp ? "drop-down__list--showed-yes" : ""
        } `}
        role={"listbox"}
      >
        {dropDownOptions.map((item, index) => {
          const isSelected = dropDownSelectedOptions.includes(index)
          const isDisabled = item.disabled
          return (
            <li
              className="drop-down__list__option"
              onClick={isDisabled ? null : () => dropDownToggleOptions(index)}
              data-disabled={isDisabled}
              key={index}
            >
              <div className="drop-down__list__option__check-box">
                {isSelected ? <Checked /> : <></>}
              </div>
              <div className="drop-down__list__option__title">{item.name}</div>
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
