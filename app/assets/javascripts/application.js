//= require rails-ujs
//= require turbolinks
//= require_tree .

function fetch_post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  })
}
