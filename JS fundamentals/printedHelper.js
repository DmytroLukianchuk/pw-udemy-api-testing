// exported function

export function printHelper(message) {
    // console.log("Helper says: " + message);
}

// Classes

// export class CustomerDetails {

//     printFirstName(firstName){
//         console.log("First Name: " + firstName);
//     }

//     printLastName(lastName){
//         console.log("Last Name: " + lastName);
//     }
// }


class CustomerDetails {


    /**
     * This method will print the first name
     * @param {string} firstName 
     */
    printFirstName(firstName){
        // console.log("First Name: " + firstName);
    }

    printLastName(lastName){
        // console.log("Last Name: " + lastName);
    }
}

export const customerDetails = new CustomerDetails();