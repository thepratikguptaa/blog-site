// Import config and Appwrite SDK
import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

// AuthService handles all authentication logic
export class AuthService {
    client = new Client() // Appwrite client instance
    account; // Account instance

    constructor(){
        // Set Appwrite endpoint and project
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client); // Initialize account
    }

    // Create a new user account and log in
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // If account created, log in user
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.error(error); // Log error
        }
    }

    // Log in user with email and password
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(error); // Log error
        }
    }

    // Get currently logged in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    // Log out current user
    async logout() {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService(); // Create instance

export default authService // Export instance