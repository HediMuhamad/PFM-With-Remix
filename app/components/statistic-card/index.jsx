import PropTypes from "prop-types"
import Button from "~/components/button"
import { variants } from "~/utils/common-properties"

export default function StatisticCard({
  statisticCardTitle,
  statisticCardAmount,
  statisticCardVariant,
  statisticCardOnDetailButtonClicked,
}) {
  const className = `card-${statisticCardVariant}`

  return (
    <div className={`card ${className}`}>
      <span className="card-title">{statisticCardTitle}</span>
      <Button
        buttonType={"normal"}
        buttonVariant={statisticCardVariant}
        buttonSize={"small"}
        className={"card-detail-button"}
        onClick={statisticCardOnDetailButtonClicked}
      >
        details
      </Button>
      <span className="card-value">{statisticCardAmount}</span>
    </div>
  )
}

StatisticCard.propTypes = {
  statisticCardTitle: PropTypes.string.isRequired,
  statisticCardAmount: PropTypes.number.isRequired,
  statisticCardVariant: PropTypes.oneOf(variants),
  statisticCardOnDetailButtonClicked: PropTypes.func,
}

StatisticCard.defaultProps = {
  statisticCardVariant: variants[0],
  statisticCardOnDetailButtonClicked: () => {},
}
