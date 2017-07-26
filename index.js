function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}


function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'http://api.github.com/users/octocat/repos')
  req.send()
}

// create new XMLHttpRequest instance
// assign to constant
// open with HTTP verb of choice and URI that you're requesting
// call send

// click link, check network --> response

function getCommits(el) {
  const name = el.dataset.repo // grab data-repo value
  const req = new XMLHttpRequest() // set XHR request
  req.addEventListener("load", showCommits) // listener and callback
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

//create spot in HTML for commits

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
