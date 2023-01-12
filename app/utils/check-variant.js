export default function checkVariant(variant) {
  return [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ].includes(variant, 0)
}
