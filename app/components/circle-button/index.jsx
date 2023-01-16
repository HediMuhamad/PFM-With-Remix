import PropTypes from "prop-types"
import Button from "~/components/button"
import { variants, sizes, types } from "~/utils/common-properties"

export default function CircleButton({
  children,
  circleButtonVariant,
  circleButtonSize,
  circleButtonType,
  className,
  ...props
}) {
  return (
    <Button
      buttonIsRounded={true}
      buttonSize={circleButtonSize}
      buttonType={circleButtonType}
      variants={circleButtonVariant}
      className={`circle-button ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}

CircleButton.propTypes = {
  circleButtonType: PropTypes.oneOf(types),
  circleButtonSize: PropTypes.oneOf(sizes),
  circleButtonVariant: PropTypes.oneOf(variants),
  children: PropTypes.any,
  className: PropTypes.string,
}

CircleButton.defaultProps = {
  circleButtonType: types[0],
  circleButtonSize: sizes[0],
  circleButtonVariant: variants[0],
  children: "",
  className: "",
}
