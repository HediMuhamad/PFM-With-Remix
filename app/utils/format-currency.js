export default function formatCurrency(amount, precision, symbol) {
  if (isNaN(+amount)) {
    throw Error(`Amount should be a number, not in type ${typeof amount}`)
  } else if (isNaN(+precision)) {
    throw Error(`Precision should be a number, not in type ${typeof amount}`)
  } else if (!(typeof symbol == "string" || symbol instanceof String)) {
    throw Error(`Symbol should be a string, no ${typeof symbol}`)
  }

  let formattedAmount = ""
  if (amount >= 1000 && amount < 1000000) {
    formattedAmount = (amount / 1000).toFixed(precision) + "K"
  } else if (amount >= 1000000 && amount < 1000000000) {
    formattedAmount = (amount / 1000000).toFixed(precision) + "M"
  } else if (amount >= 1000000000) {
    formattedAmount = (amount / 1000000000).toFixed(precision) + "B"
  } else if (amount >= 1000000000000) {
    formattedAmount = (amount / 1000000000000).toFixed(precision) + "T"
  } else {
    formattedAmount = amount.toString()
  }

  return symbol + formattedAmount
}
