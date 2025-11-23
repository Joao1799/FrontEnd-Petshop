import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServiceMainService {
    private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  postLoginUserFunc(infoUserFunc: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login/usersFunc`,infoUserFunc);
  }

  postRegisterUserFunc(infoUserFunc: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/registerUsersFunc`,infoUserFunc);
  }

  getInfoUser(idUser:any):Observable<any>{
   return this.http.get<any>(`${this.apiUrl}/user/${idUser}`,{headers: this.getAuthHeaders()}) 
  }

  putEditInfoUser(body:any, idUser:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/usersFunc/${idUser}`,body,{headers: this.getAuthHeaders()})
  }

  getUsers():Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/allUsers`,{headers: this.getAuthHeaders()});
  }


  deleteUSer(id:any):Observable<any>{
    return this.http.delete<any[]>(`${this.apiUrl}/users/${id}`,{headers: this.getAuthHeaders()});
  }

  getListCargos():Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/listCargo`,{headers: this.getAuthHeaders()})
  }

  postRegisterUserClient(infoUser: any):Observable<any>{
    return this.http.post<any[]>(`${this.apiUrl}/users`,infoUser,{headers: this.getAuthHeaders()})
  }

  postRegisterPet(infoPet: any):Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/createPets`,infoPet,{headers: this.getAuthHeaders()});
  }
}
