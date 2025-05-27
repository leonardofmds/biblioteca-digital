import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro, LivrosService } from '../../shared/livros.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  imports: [CommonModule] // Adicione os módulos necessários aqui, como FormsModule, RouterModule, etc.
})
export class ListaLivrosComponent implements OnInit {
  livros: Livro[] = [];

  constructor(
    private livrosService: LivrosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livrosService.listar().subscribe((dados) => {
      this.livros = dados;
    });
  }

  editarLivro(id: string | number): void {
    this.router.navigate(['/livros/editar', id]);
  }

  excluirLivro(id: string | number): void {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.livrosService.excluir(id).subscribe(() => {
        this.carregarLivros(); // Atualiza a lista
      });
    }
  }
}
