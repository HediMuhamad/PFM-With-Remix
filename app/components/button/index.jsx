import PropTypes from "prop-types"

export default function Button({
  type,
  size,
  rounded,
  children,
  onClick,
  className,
  ...props
}) {
  let classes = `button button-type-${type} button-size-${size} ${
    rounded ? "" : "button-border-no-rounded"
  } ${className}`
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["normal", "ghost"]).isRequired,
  size: PropTypes.oneOf(["small", "normal", "large"]).isRequired,
  rounded: PropTypes.bool,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

Button.defaultProps = {
  rounded: true,
  onClick: null,
  className: "",
}
