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
  livrosPaginados: Livro[] = [];

  termoBusca: string = '';
  paginaAtual: number = 1;
  itensPorPagina: number = 5;
  opcoesPaginacao: number[] = [5, 10, 20, 99999]; // 99999 = todos

  constructor(
    private livrosService: LivrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livrosService.listar().subscribe((dados) => {
      this.livros = dados;
      this.filtrarLivros();
    });
  }

  filtrarLivros(): void {
    const termo = this.termoBusca.toLowerCase();
    this.livrosFiltrados = this.livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo)
    );
    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.livrosPaginados = this.livrosFiltrados.slice(inicio, fim);
  }


  mudarPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.atualizarPaginacao();
  }

  totalPaginas(): number[] {
    return Array(Math.ceil(this.livrosFiltrados.length / this.itensPorPagina))
      .fill(0)
      .map((_, i) => i + 1);
  }

  editarLivro(id: string): void {
    this.router.navigate(['/livros/editar', id]);
  }

  excluirLivro(id: string): void {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.livrosService.excluir(id).subscribe(() => {
        this.carregarLivros();
      });
    }
  }

  verDetalhes(id: string): void {
    this.router.navigate(['/livros/detalhes', id]);
  }

  mudarItensPorPagina(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.itensPorPagina = parseInt(selectElement.value, 10);
    this.paginaAtual = 1;
    this.atualizarPaginacao();
  }


}
