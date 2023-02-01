/* CALLBACK FUNCTIONS */
const selectActiveTab = (event) => {
    let selected_tab = event.target.closest(".tab_item");

    event.target.closest(".tab_list").querySelector(".tab_item.active").classList.remove("active");
    selected_tab.classList.add("active");
}

/* EVENTS */
document.querySelectorAll(".tab_item .nav-link").forEach((item_link) => {
    item_link.addEventListener("click", selectActiveTab);
});

document.querySelector(".title_block button").addEventListener("click", () => {
    window.location.href = "/web-frontend/views/admin/components.html"
});