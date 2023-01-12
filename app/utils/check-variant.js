export const variants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
]

export default function checkVariant(variant) {
  return variants.includes(variant.toLowerCase(), 0)
}
