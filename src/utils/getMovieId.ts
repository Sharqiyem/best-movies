export const getMovieId = (link: string) => {
  const spl = link.split('/');
  return spl?.[spl.length - 1];
};
