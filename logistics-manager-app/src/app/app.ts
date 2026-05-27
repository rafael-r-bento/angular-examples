import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Chat } from './components/chat/chat';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Chat],
  host: {
    'class': 'flex flex-col h-full w-full relative'
  },
  template: `
    <app-header />
    <router-outlet />
    <app-chat />
  `
})
export class App {}
