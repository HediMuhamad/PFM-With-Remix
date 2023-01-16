import PropTypes from "prop-types"

export default function CurrencyInput({
  currencyInputValue,
  currencyInputValueChangeHandler,
  ...props
}) {
  return (
    <div className="currency-input">
      <span className="currency-input__symbol">$</span>
      <input
        className="currency-input__input"
        type={"number"}
        value={currencyInputValue}
        onChange={currencyInputValueChangeHandler}
        {...props}
      />
    </div>
  )
}

CurrencyInput.propTypes = {
  currencyInputValue: PropTypes.string,
  currencyInputValueChangeHandler: PropTypes.func,
}

CurrencyInput.defaultProps = {
  currencyInputValue: "",
  currencyInputValueChangeHandler: () => {},
}
