import PropTypes from "prop-types"
import { default as Button, types, sizes } from "../button"
import { variants } from "~/utils/check-variant"

export default function CircleButton({
  children,
  variant,
  size,
  type,
  onClick,
  className,
  ...props
}) {
  return (
    <Button
      rounded={true}
      size={size}
      type={type}
      onClick={onClick}
      className={`circle-button circle-button-variant-${variant} ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

CircleButton.propTypes = {
  type: PropTypes.oneOf(types),
  size: PropTypes.oneOf(sizes),
  variant: PropTypes.oneOf(variants.push(...["dark", "light"])),
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

CircleButton.defaultProps = {
  type: "normal",
  size: "large",
  variant: variants[0],
  onClick: null,
  className: "",
}
