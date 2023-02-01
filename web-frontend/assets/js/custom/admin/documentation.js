var popover_content = document.getElementById("document_options");
var confirm_modal = document.getElementById("confirm_private_modal");
var confirm_private_modal = new bootstrap.Modal(confirm_modal, {});
var document_id = "";
var selected_document = "";

/* Get params from URL of current Page */
let url_obj = new URL((window.location.href).toLowerCase());
let doc_count = url_obj.searchParams.get("size") || 5;

let documents_array = [
    {
        id: 105,
        title: "Ruel's Document",
        viewers: 10,
        editors: 2,
        is_private: false,
        is_starred: true,
        is_archived: 0,
        description: "My Experience in Village88 they taught me how to design a web UI/UX in 3 months."
    },
    {
        id: 106,
        title: "Fitz's Document",
        viewers: 5,
        editors: 3,
        is_private: true,
        is_starred: true,
        is_archived: 0,
        description: "Village88 gave me an opportunity to start a new career as a Software Engineer."
    },
    {
        id: 107,
        title: "Stan's Document",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: true,
        is_archived: 0,
        description: "The way to Village88 was not easy. Every task during my training was always under time pressure."
    },
    {
        id: 108,
        title: "Jessie's Document",
        viewers: 7,
        editors: 1,
        is_private: false,
        is_starred: true,
        is_archived: 0,
        description: "I had previous jobs before Village88, but then I felt like I wasn't learning anything from it anymore."
    },
    {
        id: 109,
        title: "Bylaws",
        viewers: 17,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "Bylaws are the laws that the company has established to keep the organisation in control and in regulation. A company’s bylaws are the direct guidance given by the authority of a company."
    },
    {
        id: 110,
        title: "Non-Disclosure Agreement",
        viewers: 2,
        editors: 1,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "This information is very critical to the company and if leaked could cost a fortune. Companies, therefore, ask employees to handle confidential company information to sign a non-disclosure agreement."
    },
    {
        id: 111,
        title: "Operating Agreement",
        viewers: 107,
        editors: 25,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "An Operating Agreement LLC is a key legal document that is necessary for every LLC with more than 2 or 3 members. Though it is not a legal document, it helps define the process of decision making among key operating authorities."
    },
    {
        id: 112,
        title: "Minutes of Meeting",
        viewers: 17,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "Minutes of the meeting captures the happenings of a meeting in detail and used as a referring document for the consecutive meetings."
    },
    {
        id: 113,
        title: "Employment Agreement",
        viewers: 170,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "This agreement sets the ground rules of the relationship between the organisation and the employee. The culture and the vision of the company can be seen in action in the employee agreement."
    },
    {
        id: 114,
        title: "Business plans",
        viewers: 10,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "A business plan, as the name suggests, is the plan for your business on paper. Before creating a business plan do thorough research, analyze the market, your competitors, understand how you will target the customers in your market. It offers clarity on what your business is, its opportunities and the roadmap that will lead you there."
    },
    {
        id: 115,
        title: "Business Reports",
        viewers: 17,
        editors: 1,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Business reports are facts and figures about certain departments. It includes aspects of your business that exist as company data, which, after analysis can derive outcomes and projections."
    },
    {
        id: 116,
        title: "Financial Agreement",
        viewers: 20,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "As a business owner, you must have a strong grasp of your company’s finances. It is important to know whether you are within budget, making profits or spiralling losses."
    },
    {
        id: 117,
        title: "Transactional Documents",
        viewers: 17,
        editors: 12,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "One of the key factors in keeping your company’s financial statements organised is through the maintenance of transactional documents."
    },
    {
        id: 118,
        title: "Business Insurance",
        viewers: 107,
        editors: 3,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Businesses are prone to risks all the time and having business insurance gives you the safety net for the same."
    },
    {
        id: 119,
        title: "Partnership Agreement",
        viewers: 18,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "The agreement essentially keeps all the partners in tandem to the agreed terms of working without any deviation and disagreements."
    },
    {
        id: 120,
        title: "Co-founder Agreement",
        viewers: 5,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "The Co-founder agreement is prepared across more than one founder and highlights the rules and obligations and share of each of the partners."
    },
    {
        id: 121,
        title: "Business Pitch Deck",
        viewers: 50,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "New companies should create a powerful and insightful pitch deck that will essentially capture the essence of the company."
    },
    {
        id: 122,
        title: "Investor Agreement",
        viewers: 5,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Investments are critical to companies along with their different growth phases. An investor agreement is prepared for documenting subscription of shares against the investments done."
    },
    {
        id: 123,
        title: "Board Resolutions",
        viewers: 25,
        editors: 7,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Board Resolutions are decisions taken in a board meeting and form a part of the documentation for further reference."
    },
    {
        id: 124,
        title: "ESOPs Agreement",
        viewers: 5,
        editors: 2,
        is_private: false,
        is_starred: false,
        is_archived: 0,
        description: "Employee stock option plans, also known as ESOPsare the stocks offered by a company to its employees at a discounted price."
    },
    {
        id: 125,
        title: "Accounting Agreement",
        viewers: 3,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 0,
        description: "Accounting agreement is a document of mutual understanding between the bookkeeper and the company, discussing services and arrangements."
    }
];

let archived_document = [
    {
        id: 34,
        title: "Archived Document",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 1,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    },
    {
        id: 35,
        title: "Archived Document 2",
        viewers: 1,
        editors: 1,
        is_private: true,
        is_starred: false,
        is_archived: 1,
        description: "ASUS TUF Gaming F15 is a powerful Windows 10 gaming laptop that combines gaming performance with up to a narrow bezel IPS-type panel and an extended lifespan"
    }
]

const renderDocuments = (documents_list) => {
    document.getElementById("document_list_container").innerHTML = "";

    if(documents_list.length){
        document.getElementById("no_data_logo").setAttribute("hidden", "hidden");
        documents_index = [...new Map(documents_list.map(item => [item["id"], item])).values()];

        for(let index in documents_index){
            /* Only display specified size from the URL */
            if(index < parseInt(doc_count)){
                let document_item = documents_index[index];
                let cloned_document = document.getElementById("clone").cloneNode(true);

                cloned_document.id = document_item.id;
                cloned_document.querySelectorAll(".document_title")[ITEMS.first].textContent = document_item.title;
                cloned_document.querySelectorAll(".viewers_count")[ITEMS.first].textContent = document_item.viewers;
                cloned_document.querySelectorAll(".editors_count")[ITEMS.first].textContent = document_item.editors;
                cloned_document.querySelectorAll(".document_information p")[ITEMS.first].textContent = document_item.description;

                (document_item.is_private) ? cloned_document.classList.add("is_private") : cloned_document.classList.remove("is_private");
                (document_item.is_starred) ? cloned_document.querySelector("input[type=checkbox]").checked = true : cloned_document.querySelector("input[type=checkbox]").checked = false;

                (document_item.is_starred) ? cloned_document.setAttribute("data-starred", "all_starred") : cloned_document.removeAttribute("data-star");
                (document_item.is_private) ? cloned_document.setAttribute("data-private", "all_private") : cloned_document.removeAttribute("data-private");

                document.getElementById("document_list_container").appendChild(cloned_document);

                new bootstrap.Popover(cloned_document.querySelector(".documents_menu"), {
                    animation: true,
                    container: "body",
                    content: popover_content,
                    html: true,
                    trigger: "focus",
                    delay: {"hide": ANIMATION_TIME.hide}
                });
            }
        }
    }
    else{
        document.getElementById("no_data_logo").removeAttribute("hidden");
    }
}

renderDocuments(documents_array);

/* CALLBACK FUNCTIONS */

const getDocumentValue = (event) => {
    event.preventDefault();

    /* Remove red border */
    event.target.closest("label").classList.remove("input_error");
    
    if(event.keyCode === 13) {
        if(event.target.value.length){
            let timestamp = new Date().getUTCMilliseconds();

            documents_array.push({
                id: timestamp,
                title: event.target.value,
                viewers: 0,
                editors: 0,
                is_private: false,
                is_starred: false,
                description:"",
            });

            event.target.value = "";
            document.getElementById("documents_category_selection").innerHTML = "Show All";
            renderDocuments(documents_array);
        }
        else{
            event.target.closest("label").classList.add("input_error");
        }
    }
}

const DuplicateDocument = (event)=> {
    if(event.target.classList == "documents_menu"){
        let document_id = parseInt(event.target.closest("li").getAttribute("id"));

        selected_document = documents_array.find(obj_id => obj_id.id === document_id);
        document.getElementById(event.target.getAttribute("aria-describedby")).querySelector(".public_document input[type=checkbox]").checked = !selected_document.is_private;
    }
}

const applySettings = (event)=> {
    if(event.target.classList == "duplicate_document"){
        let duplicated_object = {
            id: new Date().getUTCMilliseconds(),
            title: selected_document.title,
            viewers: selected_document.viewers,
            editors: selected_document.editors,
            is_private: selected_document.is_private,
            is_starred: selected_document.is_starred,
            description: selected_document.description,
        };

        confirm_modal.querySelector(".public_private_content").textContent = "duplicate "+selected_document.title;
        confirm_private_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            documents_array.push(duplicated_object);

            confirm_private_modal.hide();
            renderDocuments(documents_array);
        });
    }else if(event.target.classList == "archive_document"){
        documents_array.splice(documents_array.map((obj_index) => obj_index.id).indexOf(selected_document.id), 1);
        renderDocuments(documents_array);
    }else if(event.target.classList == "remove_document"){
        documents_array.splice(documents_array.map((obj_index) => obj_index.id).indexOf(selected_document.id), 1);
        renderDocuments(documents_array);
    }else if(event.target.classList == "public_document"){
        let is_private = event.target.closest("li").querySelector(".public_checkbox_setting").checked;

        confirm_modal.querySelector(".public_private_content").textContent = (is_private) ? "private" : "public";
        confirm_private_modal.show();

        confirm_modal.querySelector("#confirm_button_yes").addEventListener("click", function(){
            let selected_document_index = documents_array.map((obj_index) => obj_index.id).indexOf(selected_document.id);

            (is_private) ? documents_array[selected_document_index].is_private = true : documents_array[selected_document_index].is_private = false;

            renderDocuments(documents_array);
            confirm_private_modal.hide();
        });
    }
}

const starredDocument = (event)=> {
    if(event.target.classList.contains("star_toggle_button")){
        let starred_id = parseInt(event.target.closest("li").getAttribute("id"));
        let selected_document_id = documents_array.find(obj_id => obj_id.id === starred_id);
        let selected_document_index = documents_array.map((obj_index) => obj_index.id).indexOf(starred_id);

        if(selected_document_index !== -1) {
            selected_document_id.is_starred = !event.target.closest("label").querySelector("input[type=checkbox]").checked;

            /* If Starred, put to starred group at the start of array */
            documents_array.splice(selected_document_index, 1);

            /* Get last index of starred */
            let last_starred_index = documents_array.findLastIndex((doc_obj) => doc_obj.is_starred);
            documents_array.splice(last_starred_index+1, 0, selected_document_id);

            renderDocuments(documents_array);
        }
    }
}

const FilterDocuments = (event)=> {
    let filtered_documents = [];
    let documents_list_by_size = documents_array.slice(0, doc_count);

    document.getElementById("documents_category_selection").innerHTML = "Show " + event.target.innerHTML;

    if(event.target.getAttribute("data-selection") === "data-documents"){
        renderDocuments(documents_list_by_size);
    }
    else if(event.target.getAttribute("data-selection") === "data-starred"){
        filtered_documents = documents_list_by_size.filter(document => document.is_starred);
        renderDocuments(filtered_documents);
    }
    else if(event.target.getAttribute("data-selection") === "data-private"){
        filtered_documents = documents_list_by_size.filter(document => document.is_private);
        renderDocuments(filtered_documents);
    }
    else if(event.target.getAttribute("data-selection") === "data-public"){
        filtered_documents = documents_list_by_size.filter(document => !document.is_private);
        renderDocuments(filtered_documents);
    }
    else if(event.target.getAttribute("data-selection") === "data-archive"){
        renderDocuments(archived_document);
    }
}

/* EVENTS */
document.addEventListener("click", applySettings);
document.addEventListener("click", starredDocument);
document.addEventListener("click", DuplicateDocument);
document.getElementById("filter_dropdown_menu").addEventListener("click", FilterDocuments);
document.getElementById("add_documentation_input").addEventListener("keyup", getDocumentValue);

$(function(){
    $("#document_list_container").sortable();

    /* Onload focus Add Documentation input box */
    document.getElementById("add_documentation_input").focus();
});