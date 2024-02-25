export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }

  return ['all', ...new Set(unique)]
}

export const averageRating = (reviews) => {
  var total = 0
  for (let i = 0; i < reviews.length; i++) {
    var review = reviews[i]
    total += review[0]
  }
  return total / reviews.length
}
