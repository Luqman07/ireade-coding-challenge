
const inputField = document.getElementById('input-field')
const btn = document.querySelector('#btn')
const getData = async () => {
  let user = inputField.value
  console.log(user);
  
  location.href = 'index.html'
  console.log(user);
  const data = JSON.stringify({
    query: `{
          user(login: "${user}") {
            avatarUrl
            bio
            login
            name
            repositories(affiliations: OWNER, first: 20) {
              edges {
                node {
                  description
                  primaryLanguage {
                    name
                  }
                  name
                }
              }
            }
          }
        }
        `
    ,
  });

  fetch(
    ' https://api.github.com/graphql',
    {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        Authorization: 'Bearer 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',
      },
    }
  ).then(res => {
    res.json().then(data => {
      const array = data.data.user.repositories.edges
      document.getElementById('fullname').innerHTML = data.data.user.name
      document.getElementById('avatar').src = data.data.user.avatarUrl
      document.getElementById('bio').innerHTML = data.data.user.bio
      document.getElementById('username').innerHTML = data.data.user.login
      document.querySelector('.num').innerHTML = array.length
      document.querySelector('.num1').innerHTML = array.length

      console.log(array)
      repository.innerHTML = ''
      array.forEach(element => {
        // console.log(element.node.primaryLanguage.name);

        if (element.node.description === null) {
          repository.innerHTML += `
                <div class="repo-card">
                    <div class="sect1">
                        <h2>${element.node.name}</h2>
                        
                        <div>
                            <div class="shift language">
                                <span style="font-size: 0.7rem;"></span>
                                <small>HTML</small>
                            </div>
                            <div class="shift">
                                <span></span>
                                <small>1</small>
                            </div>
                            <small>Updated 13 days ago</small>
                        </div>
                    </div>
                    <div class="sect2">
                        <button> <span class="fa fa-star-o"></span> Star</button>
                    </div>

                </div>
          `
        } else {
          repository.innerHTML += `
                <div class="repo-card">
                    <div class="sect1">
                        <h2>${element.node.name}</h2>
                        <small>${element.node.description}</small>
                        <div>
                            <div class="shift language">
                                <span style="font-size: 0.7rem;"></span>
                                <small>HTML</small>
                            </div>
                            <div class="shift">
                                <span></span>
                                <small>1</small>
                            </div>
                            <small>Updated 13 days ago</small>
                        </div>
                    </div>
                    <div class="sect2">
                        <button> <span class="fa fa-star-o"></span> Star</button>
                    </div>

                </div>
          `
        }

      });
    })
  })

};

btn.addEventListener('click', getData)
