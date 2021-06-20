function sendFormData() {
    var form = document.getElementById("comment-form")
    var formData = new FormData(form)
    let request = new XMLHttpRequest()
    request.open("POST", "https://api.spreadpositivity.net/message")
    request.onload = function () {
        var success = request.response.success
        
    }
    request.responseType = "json"
    request.send(formData)
    form.reset()
    return false
}

var current = 0
var duration = 0
var amount = 0
var element = null
var interval = null

function count(num){
    current = 0
    duration = 1000 / num
    amount = num
    element = document.getElementById("post-count")
    interval = setInterval(function(){
        element.innerHTML = "Total Posts: " + current
        current += 1
        if (current > amount){
            clearInterval(interval)
        }
    }, duration)
}