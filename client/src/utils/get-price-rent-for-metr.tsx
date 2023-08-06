export const getPriceForRentMetr = (object) => {
  const costForMetr = Math.round(
    object?.estateOptions.rentPrice / object?.estateOptions.rentSquare
  );
  return costForMetr;
};
