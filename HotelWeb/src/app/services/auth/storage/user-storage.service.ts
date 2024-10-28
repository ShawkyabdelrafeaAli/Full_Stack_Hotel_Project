import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { User } from '../user';

const TOKEN = 'token';
// const USER = User
const USER = "user" 
const ROLE = 'role';
 @Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  // private static readonly USER_KEY = 'user'; // Define a key for localStorage

  constructor() { }
    
  static saveUser(user:User) : void{
    window.localStorage.clear;
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
  static saveToken(token:string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  static save
  // static getToken(): string{
  //    return localStorage.getItem(TOKEN);
  // }
  static getToken(): string | null {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      console.error("localStorage is not available in this environment");
      return null;
    }
    return localStorage.getItem(USER);
   
  }


  // static getUser(): any{
  //   return JSON.parse(localStorage.getItem(USER));
  // }


  static getUser(): User | null {
    try {
    const userData = window.localStorage.getItem(USER);
    return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error('Error parsing JSON from localStorage:', e);
      return null;
    }
  }


  // static getUser(): any {
  //   // Check if 'window' is defined and 'localStorage' is available
  //   if (typeof window !== 'undefined' && localStorage.getItem(ROLE)) {
  //     try {
  //       return JSON.parse(localStorage.getItem(ROLE) as string);
  //     } catch (e) {
  //       console.error('Error parsing JSON from localStorage:', e);
  //       return null;
  //     }
  //   }
  //   return null;
  // }

  static getUserId(): string{
    const user = this.getUser();
    if(user==null){return '';}
    
    return user.userId;
  }

  static getUserRole(): string{
    const user:User = this.getUser();
    if(user==null){
      return '';
    }
    return user.userRole;
  }

  static getJWT(): string{
    const user:User = this.getUser();
    if(user==null){
      return '';
    }
    return user.token;
  }

  static isAdminLonggedIn(): boolean{
    if(this.getToken===null){
      return false;
    }
    const role: string = this.getUserRole();
    
    return role === 'ADMIN';
  }

//   static isCustomerLoggedIn(): boolean {
//     const token = this.getToken(); // Call the method to get the token
//     if (token == null) {
//         return false; // Return false if there is no token
//     }
    
//     const role: string = this.getUserRole(); // Get the user role
//     return role.trim() === "CUSTOMER"; // Use trim to eliminate any whitespace issues
// }


  static isCustomerLoggedIn(): boolean{
    const role: string = this.getUserRole();
    console.log("------------------"+role)
    return role === "CUSTOMER";
  }
//   static isCustomerLoggedIn(): boolean {
//   // Check if the token is null
//   if (this.getToken() == null) {
//     return false;
//   }
//   // Get the user role
//   const role: string = this.getUserRole();
//   // Return true if the role is 'CUSTOMER', otherwise false
//   return role === "CUSTOMER";
// }

  static signOut(): void{
    window.localStorage.removeItem('user');
  }
}
