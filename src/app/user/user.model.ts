export class UserModel {
    userID: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;

    constructor( userID: number, firstName: string, lastName: string, birthDate: Date, email: string) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
    }
}