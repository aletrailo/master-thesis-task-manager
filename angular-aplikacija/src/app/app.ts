import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navigacija } from './komponente/navigacija/navigacija';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigacija],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}