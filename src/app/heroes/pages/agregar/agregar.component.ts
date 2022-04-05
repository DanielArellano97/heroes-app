import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponentComponent } from '../../components/confirm-component/confirm-component.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'Dc Comics',
      desc: 'Dc - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''

  }

  constructor(private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes("editar")) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroePorID(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }


  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackBar('Registro actualizado'));
    } else {
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar('Registro realizado con exito!')
        });
    }
  }

  eliminar() {

    const dialog = this.dialog.open(ConfirmComponentComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroeService.eliminarHeroe(this.heroe.id!)
          .subscribe(heroe => this.router.navigate(['/heroes']));
      }
    })

  }

  mostrarSnackBar(mensaje: string) {
    this.snackbar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
