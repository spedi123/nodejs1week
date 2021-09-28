
const queryString = window.location.detail;
const urlParams = new URLSearchParams(queryString)
const postingId = urlParams.get("postingId")
$(document).ready(function () {
    get_detail()
})

function get_detail() {
    console.log("test")
    $.ajax({
        type: "GET",
        url: `/api/posting/${postingId}`,
        data: {},
        success: function (response) {
            let postingDetail = response["detail"];
            let temp_html = `<div class="field">
                                <label class="label">Username</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input id="name" class="input is-success" type="text" placeholder="Text input" value="${postingDetail['name']}">
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control">
                                    <input id="password" class="input" type="password" placeholder="Text input">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Title<label>
                                <div class="control">
                                    <input id="title" class="input" type="text" placeholder="Text input" value="${postingDetail['title']}">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">content</label>
                                <div class="control">
                                    <textarea id="content" class="textarea" placeholder="Textarea">${postingDetail["content"]}</textarea>
                                </div>
                            </div>`
            $('.container').append(temp_html)
        }
    })
}

function deletes() {
    let title = $('#title').val();
    let name = $('#name').val();
    let content = $('#content').val();
    let password = $('#password').val();
    $.ajax({
        type: "POST",
        url: `/api/posting/${postingId}/delete`,
        data: {
            'title': title,
            'name': name,
            'content': content,
            'password': password
        },
        success: function (response) {
            console.log(response['result'])
            alert(response['result'])
            if (response['result'] == 'success') {
                window.location.href = "/search"
            }
        }
    })
}