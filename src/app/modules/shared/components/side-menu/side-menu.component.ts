import { Component } from '@angular/core';
import { MenuItem } from '../../interface/side-menu.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})

export class SideMenuComponent {

  public reactiveMenu:MenuItem[] = [
    { title: 'Básicos', router: './reactive/basic'},
    { title: 'Dinámicos', router: './reactive/dynamic'},
    { title: 'Switches', router: './reactive/switches'}
  ];

  public authMenu:MenuItem[] = [
    { title: 'Registro', router: './auth'}
  ];
}
