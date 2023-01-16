import PropTypes from "prop-types"
import Button from "~/components/button"
import { variants, sizes, types } from "~/utils/common-properties"

export default function CircleButton({
  children,
  buttonVariant,
  buttonSize,
  buttonType,
  className,
  ...props
}) {
  return (
    <Button
      buttonIsRounded={true}
      buttonSize={buttonSize}
      buttonType={buttonType}
      className={`circle-button circle-button-variant-${buttonVariant} ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

CircleButton.propTypes = {
  buttonType: PropTypes.oneOf(types),
  buttonSize: PropTypes.oneOf(sizes),
  buttonVariant: PropTypes.oneOf(variants),
  children: PropTypes.any,
  className: PropTypes.string,
}

CircleButton.defaultProps = {
  buttonType: types[0],
  buttonSize: sizes[0],
  buttonVariant: variants[0],
  children: "",
  className: "",
}
