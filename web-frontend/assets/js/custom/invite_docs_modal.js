document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sample_btn").addEventListener("click", showInviteDocumentModal);

    new bootstrap.Modal(document.getElementById('invite_docs_modal')).show();

    const inputContainerNode = document.querySelector('#emails-input');
    EmailsInput(inputContainerNode, {
        limitEmailsToDomain: 'village88',
        validEmailClass: 'valid-email',
    });
});

const showInviteDocumentModal = () => {
    let inviteDocumentModal = new bootstrap.Modal(document.getElementById('invite_docs_modal'));

    inviteDocumentModal.show();
}

const listOfValidEmails = [];

/**
*   DOCU: Function to check if email is valid using regex <br>
*   Triggered by addEmailToList, <br>
*   Last updated at: January 26, 2023
*   @param {string} email - an email to be checked
*   @param {string} limitEmailsToDomain - optional parameter to limit email domain
*   @returns {object} expression.test(email)
*   @author Fitz
*/
function isValidEmail(email, limitEmailsToDomain) {
    const expression = new RegExp(
        '^([a-zA-Z0-9_\\-\\.]+)@' +
        (limitEmailsToDomain || '([a-zA-Z0-9_\\-\\.]+)') +
        '\\.([a-zA-Z]{2,5})$'
    );

    return expression.test(email);
}

/**
*   DOCU: Function to generates an email block <br>
*   Triggered by createTextBox, EmailsInput <br>
*   Last updated at: January 26, 2023
*   @param {Element} emailsContainer - emails container element created by lib
*   @param {string} email - email to be added to list
*   @param {object} options - provided options from user
*   @author Fitz
*/
function addEmailToList(emailsContainer, email, options) {
    email = email.trim();
    if (!email || listOfValidEmails.indexOf(email) > -1 || !isValidEmail(email, options.limitEmailsToDomain)) return;

    const emailBlock = document.createElement('span');
    emailBlock.innerText = email;
    emailBlock.setAttribute('data-value', email);
    emailBlock.classList.add('email-block');

    listOfValidEmails.push(email);

    /* Stop propagation to enable selection email block */
    emailBlock.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    /* Add remove button */
    const removeBtn = document.createElement('span');
    removeBtn.innerHTML = '&times;';
    removeBtn.classList.add('remove-button');

    removeBtn.addEventListener('click', function () {
        if (this.parentElement.className.indexOf(' invalid-email') === -1) {
            listOfValidEmails.splice(parseInt(this.parentElement.getAttribute('data-value')), 1);
        }

        this.parentElement.parentNode.removeChild(this.parentElement);
    });
    emailBlock.appendChild(removeBtn);

    /* Add input type hidden to pass data in the server */
    const emailInputHidden = document.createElement('input');
    emailInputHidden.setAttribute('type', 'hidden');
    emailInputHidden.setAttribute('name', 'email_addresses[]');
    emailInputHidden.setAttribute('value', email);
    emailBlock.appendChild(emailInputHidden);

    emailsContainer.appendChild(emailBlock);
}

/**
*   DOCU: Function to create input box and add event listening <br>
*   Triggered by EmailsInput <br>
*   Last updated at: January 26, 2023
*   @param {Element} emailsContainer - emails container element created by lib
*   @param {Object} options - provided options from user
*   @return {Object} input
*   @author Fitz
*/
function createTextBox(emailsContainer, options) {
    const input = document.createElement('input');
    input.classList.add('email-input');
    input.setAttribute('type', 'email');

    /* Create email block in case user press 'Enter' or comma */
    input.addEventListener('keypress', function (e) {
        if (e.key === ',' || e.key === 'Enter') {
            if (e.target.value !== '') {
                addEmailToList(emailsContainer, e.target.value, options);
            }

            e.preventDefault();
            e.target.value = '';
        }
    });

    /* Create email block in case user lose focus */
    input.addEventListener('blur', function (e) {
        if (e.target.value !== '') {
            addEmailToList(emailsContainer, e.target.value, options);
            e.target.value = '';
        }
    });

    /* Listen to the paste event to split and show emails blocks */
    input.addEventListener('paste', function (e) {
        setTimeout(function () {
            const pastedContent = e.target.value.split(',');

            pastedContent.forEach(function (element) {
                addEmailToList(emailsContainer, element, options);
                e.target.value = '';
            });
        }, 50);
    });

    return input;
}

/**
*   DOCU: Function to return the valid array of emails <br>
*   Triggered by EmailsInput <br>
*   Last updated at: January 26, 2023
*   @return {Array} listOfValidEmails
*   @author Fitz
*/
function getEmailsList() {
    return listOfValidEmails;
}

/**
*   DOCU: Main function for the library to convert div selector to multi emails input <br>
*   Triggered by document.addEventListener("DOMContentLoaded") <br>
*   Last updated at: January 26, 2023
*   @param {Element} selector - main div selector that needs to be converted into multiple emails input
*   @param {Object} options - provided options from user
*   @return {Object}  getEmailsList, addEmail
*   @author Fitz
*/
function EmailsInput(selector, options) {
    if (!options) options = {};

    selector.classList.add('lib-emails-input-container');
    const emailsContainer = document.createElement('span');
    emailsContainer.classList.add('emails-container');

    const input = createTextBox(emailsContainer, options);

    selector.appendChild(emailsContainer);

    selector.addEventListener('click', function () {
        input.focus();
    });

    selector.appendChild(input);

    return {
        getEmailsList,
        addEmail: function (email) {
            addEmailToList(emailsContainer, email, options);
        },
    };
}
