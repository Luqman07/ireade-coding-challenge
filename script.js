const baseUrl = "https://api.github.com/graphql"
const token = "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"



fetch( baseUrl, {
    method:"POST",
    headers: { "Content-Type":"application/json"},
    Authentication: "bearer " + token,
    body: JSON.stringify({
        query:`
        {
            user(login: "Luqman07") {
              avatarUrl
              bio
              name
              id
              repositories(first: 20) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
              
        `
    })
})
.then(res => res.json)
.then(data => {
    console.log(data.data);   
})
