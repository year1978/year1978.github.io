(function()
{
        function DisplayHomePage()
        {
            console.log("Home Page");
            let Aboutusbutton = document.getElementById("Aboutusbutton");
            Aboutusbutton.addEventListener("click", function()
            {
                location.href = "about.html";
            });
        }

    function DisplayProducts()
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

    function DisplayContactPage()
    {
        console.log("Contact Page");
    }


    function Start()
    {
        console.log("App Started!");

        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "Our Services":
                DisplayHomePage();
                break;
            case "About Us":
                DisplayHomePage();
                break;
            case "Contact Us":
                DisplayHomePage();
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