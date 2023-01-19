export function extractTitle(note) {
  return note.length <= 55 ? note : `${note.substring(0, 52)}...`
}

export function extractCategory(category) {
  if (!category) {
    return null
  }

  try {
    category = JSON.parse(category)
  } catch (e) {
    return null
  }

  if (
    !category ||
    !Array.isArray(category.selected) ||
    category.selected.length !== 0
  ) {
    return category.selected[0]
  }
}

export function extractDate(date) {
  if (!date) {
    return null
  }

  date = new Date(date)

  if (isNaN(date.getTime())) {
    return null
  }

  return date
}
