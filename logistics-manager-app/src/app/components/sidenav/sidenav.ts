import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  imports: [],
  template: `
    <nav class="absolute left-0 top-0 h-full w-14 bg-surface-container-low flex flex-col items-center py-6 gap-6 z-[500] transition-colors duration-300">
      <button class="bg-surface-container-highest text-primary border-l-4 border-primary p-2 transition-colors">
        <span class="material-symbols-outlined">local_shipping</span>
      </button>
      <button class="text-on-surface/60 hover:text-on-surface hover:bg-surface-container-highest/50 transition-all p-2">
        <span class="material-symbols-outlined">biotech</span>
      </button>
      <button class="text-on-surface/60 hover:text-on-surface hover:bg-surface-container-highest/50 transition-all p-2">
        <span class="material-symbols-outlined">map</span>
      </button>
      <button class="text-on-surface/60 hover:text-on-surface hover:bg-surface-container-highest/50 transition-all p-2">
        <span class="material-symbols-outlined">monitoring</span>
      </button>

      <button class="mt-auto text-on-surface/60 hover:text-on-surface hover:bg-surface-container-highest/50 transition-all p-2">
        <span class="material-symbols-outlined">help_outline</span>
      </button>
    </nav>
  `
})
export class Sidenav {}