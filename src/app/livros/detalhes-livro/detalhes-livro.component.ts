import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Livro, LivrosService } from '../../shared/livros.service';


@Component({
  selector: 'app-detalhes-livro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhes-livro.component.html',
  styleUrls: ['./detalhes-livro.component.css']
})
export class DetalhesLivroComponent implements OnInit {
  livro!: Livro;

  constructor(
    private route: ActivatedRoute,
    private livrosService: LivrosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.livrosService.buscarPorId(id).subscribe(dados => {
      this.livro = dados;
    });
  }
}
