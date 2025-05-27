import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivrosService } from '../../shared/livros.service';

@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.css']
})
export class CadastroLivroComponent {

  constructor(
    private livrosService: LivrosService,
    private router: Router
  ) {}

  form = new FormBuilder().group({
    titulo: ['', Validators.required],
    autor: ['', Validators.required],
    ano: [null, [Validators.required, Validators.min(1901)]],
    genero: ['', Validators.required]
  });



  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { titulo, autor, ano, genero } = this.form.value;
    this.livrosService.adicionar({
      titulo: titulo as string,
      autor: autor as string,
      ano: (ano ?? 0) as number,
      genero: genero as string
    }).subscribe(() => {
      alert('Livro cadastrado com sucesso!');
      this.router.navigate(['/livros']);
    });
  }
}
