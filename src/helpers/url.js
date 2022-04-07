const apiTmdb = '737c0e73a9d2d37c2841713983706588';
const tmdburl = (endpoint, page = 1) => {
  return `https://api.themoviedb.org/3/${endpoint}?api_key=${apiTmdb}&page=${page}`;
};
const gettmdburlbyid = endpoint => {
  return `https://api.themoviedb.org/3/${endpoint}?api_key=${apiTmdb}`;
};

module.exports = {
  tmdburl,
  gettmdburlbyid,
};
