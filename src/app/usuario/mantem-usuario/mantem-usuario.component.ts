import { Component } from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../shared/services/usuario.service';


@Component({
  selector: 'app-mantem-usuario',
  templateUrl: './mantem-usuario.component.html',
  styleUrls: ['./mantem-usuario.component.css']
})
export class MantemUsuarioComponent {

  usuarioDeManutencao: Usuario;
  estahCadastrando = true;
  nomeBotaoManutencao = 'Cadastrar';

  usuarios: Usuario[] = [];

  constructor(private rotaAtual: ActivatedRoute, private roteador: Router, private usuarioService: UsuarioService) {
    this.usuarioDeManutencao = new Usuario('', 0);
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    this.usuarioService.listar().subscribe(
      usuariosRetornados => {
        this.usuarios = usuariosRetornados;
        
        if (idParaEdicao) {
          // editando
          this.usuarioService.pesquisarPorId(+idParaEdicao).subscribe(
            usuarioEncontrado => {
              this.usuarioDeManutencao = usuarioEncontrado
              this.estahCadastrando = false;
              this.nomeBotaoManutencao = 'Salvar'}
          )
          
          
           
          } else {
          this.nomeBotaoManutencao = 'Cadastrar';
        
      }
  })
    }
  
  

  manter(){
   
    if (this.estahCadastrando && this.usuarioDeManutencao) {
      this.usuarioService.inserir(this.usuarioDeManutencao).subscribe(
        usuariocadastrado=>{
          this.usuarioDeManutencao = new Usuario();
          this.nomeBotaoManutencao = 'Cadastrar';
          this.roteador.navigate(['listagemusuarios']);
        }
    
        )
    
    }
    else{
      this.usuarioService.atualizar(this.usuarioDeManutencao).subscribe(
        usuariocadastrado=>{
          this.usuarioDeManutencao = new Usuario();
          this.nomeBotaoManutencao = 'Cadastrar';
          this.roteador.navigate(['listagemusuarios']);
        }
        )
    }
    
  }
}