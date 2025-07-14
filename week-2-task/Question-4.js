console.log('Question 4');

function recommendRestaurants(restaurants, targetRating) {
  const sortedRestaurants = restaurants.sort((a, b) => b.rating - a.rating);

  // Given an optional targetRating
  if (targetRating != undefined) {
    return sortedRestaurants.filter(
      (restaurant) => restaurant.rating >= targetRating
    );
  }
  return sortedRestaurants;
}

console.log(
  recommendRestaurants(
    [
      { name: 'Pizza Palace', rating: 4.8 },
      { name: 'Curry Corner', rating: 4.2 },
      { name: 'Amazing Asian', rating: 4.5 },
      { name: 'Healthy Eats', rating: 3.9 },
    ],
    4.4
  )
);
