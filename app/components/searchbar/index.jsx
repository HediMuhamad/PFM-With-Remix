import PropTypes from "prop-types"
import { SearchIcon } from "~/shared/svgrc"
import Button from "../button"
import { useRef } from "react"

export default function Searchbar({
  nameInForm,
  value,
  changeHandler,
  iconOnClickHandler,
}) {
  const inputRef = useRef(null)

  return (
    <div className="searchbar">
      <div className="searchbar__input-container">
        <span
          className={`searchbar__input-container__icon-container ${
            iconOnClickHandler
              ? `searchbar__input-container__icon-container--clickable-yes`
              : ""
          }`}
          onClick={iconOnClickHandler}
        >
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          name={nameInForm}
          className="searchbar__input-container__input"
          type={"text"}
          placeholder="Search"
          value={value}
          onChange={(e) => {
            changeHandler(e.target.value)
          }}
        />
      </div>
      <Button
        className="searchbar__clear-button"
        buttonSize={"large"}
        buttonType={"normal"}
        buttonIsRounded={false}
        onClick={() => {
          inputRef.current.value = ""
        }}
      >
        clear
      </Button>
    </div>
  )
}

Searchbar.propTypes = {
  nameInForm: PropTypes.string,
  value: PropTypes.string,
  changeHandler: PropTypes.func,
  iconOnClickHandler: PropTypes.func,
}

Searchbar.defaultProps = {
  nameInForm: "",
  value: null,
  changeHandler: () => {},
  iconOnClickHandler: null,
}
