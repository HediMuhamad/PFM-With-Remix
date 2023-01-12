import PropTypes from "prop-types"
import { useMemo } from "react"
import Button from "~/components/button"
import checkVariant from "~/utils/check-variant"

export default function Card({ title, value, variant }) {
  const className = useMemo(
    () => (checkVariant(variant) ? `card-${variant}` : ""),
    [variant]
  )
  return (
    <div className={`card ${className}`}>
      <span className="card-title">{title}</span>
      <Button type={"normal"} size={"small"} className={"card-detail-button"}>
        details
      </Button>
      <span className="card-value">{value}</span>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ]).isRequired,
}
