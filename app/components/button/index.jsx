import PropTypes from "prop-types"
import { default as checkVariant, variants } from "~/utils/check-variant"

export const types = ["normal", "ghost", "text"]
export const sizes = ["large", "normal", "small"]

export default function Button({
  type,
  size,
  variant,
  rounded,
  children,
  onClick,
  className,
  ...props
}) {
  size = size.toLowerCase()
  const sizeClassName = `button-size-${
    sizes.includes(size, 0) ? size : "large"
  }`

  type = type.toLowerCase()
  const typeClassName = `button-type-${
    types.includes(type, 0) ? type : types[0]
  }`

  variant = variant.toLowerCase()
  const variantClassName = `button-variant-${
    checkVariant(variant) || ["dark", "light"].includes(variant, 0)
      ? variant
      : variants[0]
  }`

  const roundedClassName = rounded ? "" : "button-border-no-rounded"
  let classes = `button ${sizeClassName} ${roundedClassName} ${variantClassName} ${typeClassName} ${className}`

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(types),
  size: PropTypes.oneOf(sizes),
  variant: PropTypes.oneOf(variants.push(...["dark", "light"])),
  rounded: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

Button.defaultProps = {
  type: "normal",
  size: "large",
  variant: variants[0],
  rounded: true,
  onClick: null,
  className: "",
}
