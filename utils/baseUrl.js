let baseUrl = 'http://localhost:3000/'
if (process.env.NODE_ENV === 'production') {
  baseUrl = "https://claim-ouvre-boite-membership.herokuapp.com/"
}


module.exports = baseUrl