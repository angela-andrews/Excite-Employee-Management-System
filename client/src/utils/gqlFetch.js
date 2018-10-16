export default {
  fetchData: function(query) {
    return fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query }),
    })
  }
}