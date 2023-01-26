/* CALLBACK FUNCTIONS */
const submitLoginForm = (event) => {
    event.preventDefault();
    let login_form         = new FormData(event.target);
    let login_form_entries = login_form.entries();
    let login_details      = Object.fromEntries(login_form_entries);

    window.location.href = (login_details.user_type === "admin") ? "/web-frontend/views/admin/docs.html" : "/web-frontend/views/user/docs.html";
};

/* EVENTS */
document.getElementById("login_form").addEventListener("submit", submitLoginForm);