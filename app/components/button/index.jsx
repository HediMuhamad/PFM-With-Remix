import PropTypes from "prop-types"
import { variants, types, sizes } from "~/utils/common-properties"

export default function Button({
  buttonType,
  buttonSize,
  buttonVariant,
  buttonIsRounded,
  children,
  className,
  ...props
}) {
  const sizeClassName = `button--size-${buttonSize}`
  const typeClassName = `button--type-${buttonType}`
  const variantClassName = `button--variant-${buttonVariant}`
  const roundedClassName = buttonIsRounded ? "" : "button--border-noround"

  let classes = `button ${sizeClassName} ${roundedClassName} ${variantClassName} ${typeClassName} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  buttonType: PropTypes.oneOf(types),
  buttonSize: PropTypes.oneOf(sizes),
  buttonVariant: PropTypes.oneOf(variants),
  buttonIsRounded: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
}

Button.defaultProps = {
  buttonType: types[0],
  buttonSize: sizes[0],
  buttonVariant: variants[0],
  buttonIsRounded: true,
  children: "",
  className: "",
}
