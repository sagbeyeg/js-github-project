const form = document.querySelector('#github-form')
console.log(form)

const ul = document.querySelector('#user-list')
console.log(ul)

function renderUser(user) {
  const li = document.createElement('li')
  // console.log(li)

  li.dataset.name = user.login

  li.innerHTML = `
    <h1>${user.login}</h1>
    <h4><a href=${user.html_url}>Check Me Out On Github!</a></h4>
    <img class=all-user-list src="${user.avatar_url}" alt="${user.login}">
    `
  ul.append(li)
}

function renderAllResults(users) {
  usersData = users.items
  // console.log(usersData)
  usersData.forEach(renderUser)
}

// const input = form.querySelector

form.addEventListener("submit", users => {
  users.preventDefault()
  console.log('Submit Clicked!')
  // renderAllResults(user)
  const user = users.target.search.value
  console.log(user)

  // console.log(users.target.)
  fetchUsersInfo(user)
})

function fetchUsersInfo(userInput) {
  const configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json"
    }
    // body: JSON.stringify()
  }


  fetch(`https://api.github.com/search/users?q=${userInput}`, configObj)
    .then(resp => resp.json())
    .then(userInfo => {
      // console.log(userInfo)
      renderAllResults(userInfo)

    })
    .catch(function (error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
      document.body.innerHTML = error.message
    })
}


ul.addEventListener('click', event => {
  if (event.target.matches('.all-user-list')) {
    // console.log("I'VE BEEN TOUCHED!!!!")
    const li = event.target.closest('li')
    console.log(li)
    const name = li.dataset.name
    console.log(name)
    fetchUserRepo(name)
  }
})

const reposList = document.querySelector('#repos-list')

function fetchUserRepo(user) {
  const configObj = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json"
    }
  }
  
  

  fetch(`https://api.github.com/users/${user}/repos`, configObj)
  .then(resp => resp.json())
  .then(repos => {
    console.log(repos)
    reposList.innerHTML = ""
    repos.forEach(repo => renderUserRepo(repo))
  })
}




function renderUserRepo(repo) {
  const li = document.createElement('li')

  const nameWithoutDashes = repo.name.replace("-", " ")

  li.innerHTML = `
    <h2><a href=${repo.html_url}>${nameWithoutDashes}</a></h2>
    <p>Language: ${repo.language}</p>
    <p>${repo.created_at}</p>
  `
  reposList.append(li)
}


