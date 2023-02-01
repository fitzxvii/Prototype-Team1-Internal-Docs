const confirm_modal = document.getElementById("confirm_private_modal");
const confirm_private_modal = new bootstrap.Modal(confirm_modal, {});

let current_privacy_setting = IS_PRIVATE.yes;

const autoGrowTextArea = (document_textarea)=>{
    document_textarea.style.height = "5px";
    document_textarea.style.height = (document_textarea.scrollHeight)+"px";
}

const submitCreateSection = (event)=> {
    let cloned_section = document.getElementById("clone_section").cloneNode(true);
    let form_input = event.target.querySelector("#add_section_input");
    
    (form_input.value.length) ? form_input.closest("label").classList.remove("input_error") : form_input.closest("label").classList.add("input_error") ;
    if(form_input.value.length){
        cloned_section.id = new Date().getUTCMilliseconds();
        cloned_section.querySelector(".section_title").textContent = form_input.value;
        document.getElementById("section_list_container").append(cloned_section);

        form_input.value = "";
    }

}

const addNewSection = (event)=> {
    if(event.keyCode === 13) {
        document.getElementById("add_section_form").submit();
    }
}

const changePrivacySettings = () => {
    let private_setting_btn = document.getElementById("private_setting_block").children[ITEMS.first];
    if(current_privacy_setting){
        confirm_private_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            current_privacy_setting = IS_PRIVATE.no;
            private_setting_btn.innerHTML = "Set as Private";

            confirm_private_modal.hide();
        });
    }
    else{
        current_privacy_setting = IS_PRIVATE.yes;
        private_setting_btn.innerHTML = "Set as Public";
    }
}

autoGrowTextArea(document.getElementById("document_description_input"));

document.getElementById("document_description_input").addEventListener("keyup", function(){ autoGrowTextArea(this);});
document.getElementById("add_section_input").addEventListener("keyup", addNewSection);
document.getElementById("add_section_form").addEventListener("submit", submitCreateSection);
document.getElementById("private_setting_block").addEventListener("click", changePrivacySettings);

$(function() {$("#section_list_container").sortable();});