import PropTypes from "prop-types"

export default function CurrencyInput({
  currencyInputValue,
  currencyInputValueChangeHandler,
  ...props
}) {
  return (
    <div className="currency-input-component">
      <span>$</span>
      <input
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
