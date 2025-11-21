import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMainService {
    private apiUrl = 'http://localhost:3000/api';
    private token = localStorage.getItem('token');
    private header = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    

  constructor(private http: HttpClient) { }

  getUsers():Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/allUsers`);
  }

  postLoginUserFunc(infoUserFunc: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login/usersFunc`,infoUserFunc);
  }

  postRegisterUserFunc(infoUserFunc: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/registerUsersFunc`,infoUserFunc);
  }

  getInfoUser(idUser:any):Observable<any>{
   return this.http.get<any>(`${this.apiUrl}/user/${idUser}`,{headers:this.header}) 
  }

  putEditInfoUser(body:any, idUser:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/usersFunc/${idUser}`,body)
  }

  deleteUSer(id:any):Observable<any>{
    return this.http.delete<any[]>(`${this.apiUrl}/users/${id}`);
  }

  getListCargos():Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/listCargo`)
  }

  postRegisterUserClient(infoUser: any):Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/users`,infoUser)
  }

  postRegisterPet(infoPet: any):Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/createPets`,infoPet);
  }
}
