import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Livro, LivrosService } from '../../shared/livros.service';

@Component({
  selector: 'app-edicao-livro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edicao-livro.component.html',
  styleUrls: ['./edicao-livro.component.css']
})
export class EdicaoLivroComponent implements OnInit {

    constructor(
    
    private route: ActivatedRoute,
    private livrosService: LivrosService,
    private router: Router
  ) {}

  fb = new FormBuilder();

  form = this.fb.group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    ano: [null as number | null, [Validators.required, Validators.min(1901)]],
    genero: ['', Validators.required]
  });

  id!: string | number;



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.livrosService.buscarPorId(this.id).subscribe((livro: Livro) => {
      this.form.patchValue({
        ...livro,
        ano: livro.ano ?? null
      });
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { titulo, autor, ano, genero } = this.form.value;
    this.livrosService.atualizar(this.id, {
      titulo: titulo ?? '',
      autor: autor ?? '',
      ano: ano ?? 0,
      genero: genero ?? ''
    }).subscribe(() => {
      alert('Livro atualizado com sucesso!');
      this.router.navigate(['/livros']);
    });
  }
}
