(function (core){

    class Contact
    {
        //public properties
        get FullName()
        {
            return this.m_fullName;
        }
    
        set FullName(fullName)
        {
            this.m_fullName = fullName;
        }
    
        get ContactNumber()
        {
            return this.m_contactNumber;
        }
    
        set ContactNumber(contactNumber)
        {
            this.m_contactNumber = contactNumber;
        }
    
        get EmailAddress()
        {
            return this.m_emailAddress;
        }
    
        set EmailAddress(emailAddress)
        {
            this.m_emailAddress = emailAddress;
        }
        //constructor 
        constructor(fullName ="", contactNumber ="", emailAddress ="")
        {
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;
        }
    
        //public utility methods
        serialize()
        {
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
            {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties of the contact object are missing or invalid");
            return null;
        }
    
        deserialize(data)
        {
            let propertyArray =data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    
        //public overrides
        toString()
        {
            return `Full Name: ${this.FullName}\n Contact Number: ${this.ContactNumber}\n Email Address: ${this.EmailAddress}`;
        }
    }

    core.Contact = Contact;

})(core || (core = {}));