import PropTypes from "prop-types"

export default function Navlink({ label, url, selected }) {
  return (
    <a href={url} className={"navlink"} data-selected={selected}>
      {label}
    </a>
  )
}

Navlink.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  selected: PropTypes.bool,
}

Navlink.defaultProps = {
  label: "navlink-label",
  url: "/",
  selected: false,
}
