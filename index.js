// var cb = () => {
//   $(#details).text('/6dcb09b5b57875f334f61aebed695e2e4193db5e/') 
// }

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, cb)
}

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

var renderCommits = (data) => {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

var renderSearchResult = (result) => {
    return `
        <div>
          <h2><a href="${result.html_url}">${result.name}</a></h2>
          <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
          <p>${result.description}</p>
        </div>
        <hr>
      `
  }
  
  var renderSearchResults = (data) => data.items.map( item => renderSearchResult(item))
  
  var searchRepositories = () => {
    const searchTerms = $('#searchTerms').val()
    $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, 
      data => {
        $('#results').html(renderSearchResults(data))
      }).fail(error => {
        displayError()
      })
  }

  var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")
