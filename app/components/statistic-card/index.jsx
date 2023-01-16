import PropTypes from "prop-types"
import Button from "~/components/button"
import { variants } from "~/utils/common-properties"

export default function StatisticCard({
  statisticCardTitle,
  statisticCardAmount,
  statisticCardVariant,
  statisticCardOnDetailButtonClicked,
}) {
  return (
    <div
      className={`statistic-card statistic-card--variant-${statisticCardVariant}`}
    >
      <span className="statistic-card__title">{statisticCardTitle}</span>
      <Button
        buttonType={"normal"}
        buttonVariant={statisticCardVariant}
        buttonSize={"small"}
        className={"statistic-card__detail-button"}
        onClick={statisticCardOnDetailButtonClicked}
      >
        details
      </Button>
      <span className="statistic-card__amount">{statisticCardAmount}</span>
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
