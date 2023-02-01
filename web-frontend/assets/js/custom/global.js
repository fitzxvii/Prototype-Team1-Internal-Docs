/* FUNCTION CALLBACLS */
const toggleActiveStateTheme = (event, is_dark) => {
    let theme_block = event.target.parentNode;

    theme_block.setAttribute("class", (is_dark) ? "set_dark_mode" : "set_light_mode");
}

const selectSectionItem = (event) => {
    event.preventDefault();
    let section_item = event.target;

    section_item.closest("ul").querySelector(".active").classList.remove("active");
    section_item.classList.add("active");
}

/* EVENTS */
setTimeout(() => {
    document.getElementById("light_mode").addEventListener("click", (event) => toggleActiveStateTheme(event, is_dark = false));
    document.getElementById("dark_mode").addEventListener("click", (event) => toggleActiveStateTheme(event, is_dark = true));
}, 500);

document.querySelectorAll("#section_list li").forEach((section_item) => {
    section_item.addEventListener("click", selectSectionItem);
});