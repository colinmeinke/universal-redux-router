const UPDATE_IS_VEGETARIAN = 'UPDATE_IS_VEGETARIAN';

const updateIsVegetarian = ( isVegetarian = false ) => ({
  isVegetarian,
  type: UPDATE_IS_VEGETARIAN,
});

export { UPDATE_IS_VEGETARIAN, updateIsVegetarian };
