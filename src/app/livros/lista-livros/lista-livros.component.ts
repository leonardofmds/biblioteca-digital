import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Livro, LivrosService } from '../../shared/livros.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  imports: [CommonModule, RouterModule, FormsModule] // Adicione os módulos necessários aqui, como FormsModule, RouterModule, etc.
})
export class ListaLivrosComponent implements OnInit {
  livros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  termoBusca: string = '';

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
      this.livrosFiltrados = dados;
    });
  }

  filtrarLivros(): void {
    const termo = this.termoBusca.toLowerCase();
    this.livrosFiltrados = this.livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo)
    );
  }

  editarLivro(id: string | number): void {
    this.router.navigate(['/livros/editar', id]);
  }

  excluirLivro(id: string | number): void {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.livrosService.excluir(id).subscribe(() => {
        this.carregarLivros();
      });
    }
  }

  verDetalhes(id: string | number): void {
  this.router.navigate(['/livros/detalhes', id]);
}

}