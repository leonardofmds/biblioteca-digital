import { Routes } from '@angular/router';
import { ListaLivrosComponent } from './livros/lista-livros/lista-livros.component';
import { CadastroLivroComponent } from './livros/cadastro-livro/cadastro-livro.component';
import { EdicaoLivroComponent } from './livros/edicao-livro/edicao-livro.component';
import { DetalhesLivroComponent } from './livros/detalhes-livro/detalhes-livro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'livros', pathMatch: 'full' },
    { path: 'livros', component: ListaLivrosComponent },
    { path: 'livros/novo', component: CadastroLivroComponent },
    { path: 'livros/editar/:id', component: EdicaoLivroComponent },
     { path: 'livros/detalhes/:id', component: DetalhesLivroComponent }

];
