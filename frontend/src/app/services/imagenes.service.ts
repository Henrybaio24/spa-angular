import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  url = environment.apiUrl;
  public auth = true;
  header = new HttpHeaders({
    'X-Auth-Token': localStorage.getItem('token')
  });

  constructor(private http: HttpClient) { }


  actualizarAuth(auth: boolean) {
    this.auth = auth;
  }

  getAllImagenes() {
    return this.http.get(this.url + `images`, { headers: this.header });
  }

  getImagen(id: string) {
    return this.http.get(this.url + `image/${id}`, { headers: this.header });
  }

  // tslint:disable-next-line:no-shadowed-variable
  subirImagen(Image: Image) {
    const formData = new FormData();
    formData.append('nombre', Image.nombre);
    formData.append('descripcion', Image.descripcion);
    formData.append('imagen', Image.imagen);
    return this.http.post(this.url + 'images/create', formData, { headers: this.header })
      .pipe(map(res => {
        return res['image'];
      }));
  }

  deleteImagen(id: string) {
    return this.http.delete(this.url + `images/delete/${id}`, { headers: this.header })
      .pipe(map(res => {
        return res['image'];
      }));
  }

  updateImagen(id: string, image: Image) {
    return this.http.put(this.url + `images/edit/${id}`, image, { headers: this.header });
  }

  getUser(id: string) {
    return this.http.get(this.url + `user/${id}`, { headers: this.header });
  }

  getThisUser() {
    return this.http.get(this.url + 'user', { headers: this.header });
  }
}
