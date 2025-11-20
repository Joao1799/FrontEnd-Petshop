import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMainService {
    private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/allUsers`);
  }
  deleteUSer(id:any){
    return this.http.delete<any[]>(`${this.apiUrl}/users/${id}`);
  }

  postRegisterUser(infoUser: any){
    return this.http.post<any[]>(`${this.apiUrl}/users`,infoUser)
  }

  postRegisterPet(infoPet: any) {
    return this.http.post<any[]>(`${this.apiUrl}/createPets`,infoPet);
  }

  loginUserFunc(infoUserFunc: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login/usersFunc`,infoUserFunc);
  }

  registerUserFunc(infoUserFunc: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/registerUsersFunc`,infoUserFunc);
  }
}
