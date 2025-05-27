import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Livro {
  id?: string | number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
}

@Injectable({
  providedIn: 'root'
})
export class LivrosService {
  private readonly API = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API);
  }

  buscarPorId(id: string | number): Observable<Livro> {
    return this.http.get<Livro>(`${this.API}/${id}`);
  }

  adicionar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro);
  }

  atualizar(id: string | number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.API}/${id}`, livro);
  }

  excluir(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
