(function()
{

    /**
     * Function uses AJAX to open a connection to the server and returns a payload
     * to callback function
     * 
     * @param {string} method 
     * @param {string} url 
     * @param {Function} callback 
     */
    function AjaxRequest(method, url, callback)
    {
                //AJAX STEPS
        //Step 1 - instantiate an XHR Object
        let XHR = new XMLHttpRequest();

        //Step 2 - add an event listener for readystatechange
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                if(typeof callback === "function")
                {
                callback(XHR.requestText);
                }
                else
                {
                    console.error("Error: callback not a function");
                }
            }
        });

        //Step 3 - open a connection to the server
        XHR.open(method, url);

        //Step 4 - Send the request to the server
        XHR.send();

    }
        /**
     * This function loads header.html into the page
     * 
     * @param {HTML} html_data 
     */
    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $('li>a:contains(${document.title})').addClass("active");

    }

    function DisplayHomePage()
    {
        console.log("Home Page");

        $("#Aboutusbutton").on("click", () =>
        {
            location.href = "about.html";
        });

        AjaxRequest("GET", "header.html", Loadheader);
 

    }
        

    function DisplayProductPage()
    {
        console.log("Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    function DisplayAboutPage()
    {
        console.log("About Page");
    }

    /**
     * Adds a contact Object to localStorage
     * 
     * @param {string} fullName 
     * @param {string} contactNumber 
     * @param {string} emailAddress 
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * Method validates input text field and 
     * displays error in message area
     * 
     * 
     * @param {string} input_field_ID 
     * @param {RegExp} regular_expression 
     * @param {string} error_message 
     */
    function ValidateField(input_field_ID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let inputFieldTextValue = $(this).val();
            if(!regular_expression.test(inputFieldTextValue))
            {
                //does not pass RegEx test
                $(this).trigger("focus").trigger("select"); 
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else
            {
                //does pass RegEx test
                messageArea.removeAttr("class").hide();
            }
        });

    }

    function ContactFormValidation()
    {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*/$, "Please enter Full Name.");

        ValidateField("contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]\d{3}[\s-.]\d{4}/$), "Please enter a valid contact number.";

        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/$, "Please enter a valid email address.");

    }


    function DisplayContactPage()
    {
        console.log("Contact Page");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function()
        {
            if(subscribeCheckbox.checked)
            {
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if(contact.serialize())
                {
                 let key = contact.FullName.substring(0, 1) + Date.now();

                localStorage.setItem(key, contact.serialize());
                }
            }
        })

    }

    function DisplayContactListPage()
    {
        console.log("Contact List Page");
        if(localStorage.length > 0)
        {
            let contactlist = document.getElementById("contactlist");

            let data = ""; // add deserialized data from the localStorage
            let keys = Object.keys(localStorage); // returns a string array
            let index = 1;// counts how many keys

            //for every key in the key array, loop
            for (const key of keys)
            {
                let contactData = localStorage.getItem(key); // get localStorage data

                let contact = new core.Contact(); //create a new empty contact object
                contact.deserialize(contactData);

                //inject a repeatable row into the contactlist
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm">Edit</i></button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm">Delete</i></button></td>
                </tr>
                `
                index++;
            }

            contactlist.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure"))
                {
                    localStorage.removeItems($(this).val());
                }
                //refresh after deleting
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function()
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("div>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();
                        //add contact
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        //refresh the contact-list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
            default:
                {
                    //get the contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    //display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    //when editButton is pressed - update the contact
                    $("#editButton").on("click", (event) =>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in localStorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact list
                        location.href = "contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href = "contact-list.html";
                    });
                }
                break;
        }

    }


    function DisplayLoginPage()
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage()
    {
        console.log("Register Page");
    }



    function Start()
    {
        console.log("App Started!");

        AjaxRequest("GET", "header.html", Loadheader);

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact Us":
                DisplayContactListPage();
                break;
            case "Edit":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }

        let Aboutusbutton = document.getElementById("Aboutusbutton");
        Aboutusbutton.addEventListener("click", function()
        {
            console.log("About Us Button Clicked!!");
        });
    }

    window.addEventListener("load", Start);
    
})();