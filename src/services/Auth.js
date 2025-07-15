import {Client, Account , ID } from 'appwrite';
import conf from '../conf/conf.js';

class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    //Create a new user//SignUp
    async createUser({ email, password, name }) {
        try{
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name 
            )
            return await this.login({ email, password });
        }
        catch (error) {
            console.error('Error creating user:', error);
        }
    }

    //login user
    async login ({ email, password }) {
        try{
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        }catch(error){
            console.error('Error loging user:', error);
        }
    }

    //Current logged-In user
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.error("Appwrite service:: getCurrentUser:: error",error);
        }
        return null;
    }

    //logout
    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch(error){
            console.log("Appwrite service:: logout:: error", error);
        }
    }
}

const authservice = new AuthService();

export default authservice;

