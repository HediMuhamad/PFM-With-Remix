import PropTypes from "prop-types"
import { CrossIcon } from "~/shared/assets"

export default function Modal({ headline, onCloseClickHandler, children }) {
  return (
    <div className="modal-container">
      <div className="modal-container__modal">
        <div className="modal-container__modal__header">
          <span className="modal-container__modal__header__headline">
            {headline}
          </span>
          <div className="modal-container__modal__header__close-button">
            <CrossIcon
              width="100%"
              height="100%"
              onClick={onCloseClickHandler}
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  headline: PropTypes.string.isRequired,
  onCloseClickHandler: PropTypes.func.isRequired,
  children: PropTypes.any,
}

Modal.defaultProps = {
  children: <></>,
}
