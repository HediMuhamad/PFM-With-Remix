import PropTypes from "prop-types"
import { useMemo } from "react"
import {
  BillsIcon,
  ClothsIcon,
  FoodIcon,
  GiftIcon,
  SalaryIcon,
  LoanIcon,
  HealthIcon,
  TechIcon,
  SportsIcon,
  UndefinedCategoryIcon,
} from "~/shared/assets/"
import currencyFormatter from "~/utils/currency-formatter"

const getDayName = (date) => {
  switch (date.getDate()) {
    case new Date().getDate(): {
      return "today"
    }
    case new Date().getDate() - 1: {
      return "yesterday"
    }
    default: {
      return date.toLocaleDateString()
    }
  }
}

export default function Transaction({
  transactionCategory,
  transactionTitle,
  transactionDate,
  transactionAmount,
  transactionType,
}) {
  const getIcon = useMemo(() => {
    switch (transactionCategory.toUpperCase()) {
      case "SALARY":
        return SalaryIcon
      case "LOAN":
        return LoanIcon
      case "GIFT":
        return GiftIcon
      case "TECH":
        return TechIcon
      case "FOOD":
        return FoodIcon
      case "BILLS":
        return BillsIcon
      case "SPORTS":
        return SportsIcon
      case "HEALTH":
        return HealthIcon
      case "CLOTHS":
        return ClothsIcon
      default:
        return UndefinedCategoryIcon
    }
  }, [transactionCategory])

  const formatedTransactionAmount = useMemo(() => {
    return currencyFormatter(+transactionAmount, {
      useAbbreviation: true,
      symbol: "$",
    })
  }, [transactionAmount])

  const Icon = getIcon()
  const className = `transaction transaction--type-${transactionType.toLowerCase()}`

  return (
    <div className={className}>
      <div className="transaction__title-container">
        <div className="transaction__title-container__icon">{Icon}</div>
        <div className="transaction__title-container__title">
          {transactionTitle}
        </div>
      </div>
      <div className="transaction__detail-container">
        <div className="transaction__detail-container__date">
          {getDayName(transactionDate)}
        </div>
        <div className="transaction__detail-container__amount-box">
          <span className="transaction__detail-container__amount-box__amount">
            {formatedTransactionAmount}
          </span>
        </div>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  transactionCategory: PropTypes.string.isRequired,
  transactionTitle: PropTypes.string.isRequired,
  transactionDate: PropTypes.object.isRequired,
  transactionAmount: PropTypes.number.isRequired,
  transactionType: PropTypes.string.isRequired,
}
