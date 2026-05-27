import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-surface border-b border-outline-variant/30 flex justify-between items-center w-full px-6 h-16 shrink-0 z-[1000] transition-colors duration-300">
      <!-- Brand Logo -->
      <div class="flex items-center gap-4 w-64">
        <span class="text-xl font-black tracking-tighter text-primary">OBSIDIAN LOGISTICS</span>
      </div>

      <!-- Centered Navigation -->
      <nav class="hidden md:flex items-center gap-1 self-stretch">
        <a routerLink="/" 
           routerLinkActive="text-primary border-primary"
           [routerLinkActiveOptions]="{exact: true}"
           class="px-4 flex items-center h-full font-label text-[0.68rem] font-bold tracking-widest uppercase transition-colors text-on-surface-variant hover:text-on-surface border-b-2 border-transparent">
           Dashboard
        </a>
        <a routerLink="/fleet"
           routerLinkActive="text-primary border-primary"
           class="px-4 flex items-center h-full font-label text-[0.68rem] font-bold tracking-widest uppercase transition-colors text-on-surface-variant hover:text-on-surface border-b-2 border-transparent">
           Fleet
        </a>
        <a routerLink="/service-queue" 
           routerLinkActive="text-primary border-primary"
           class="px-4 flex items-center h-full font-label text-[0.68rem] font-bold tracking-widest uppercase transition-colors text-on-surface-variant hover:text-on-surface border-b-2 border-transparent">
          Service Queue
        </a>
      </nav>

      <!-- Right Utility Icons -->
      <div class="flex items-center justify-end gap-2 w-64">
        <!-- <button class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-full">
          <span class="material-symbols-outlined text-[22px]">notifications</span>
        </button> -->
        <button class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-full" (click)="fleetService.toggleChat()">
          <span class="material-symbols-outlined text-[22px]">chat</span>
        </button>
        <button class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-full" (click)="fleetService.toggleTheme()">
          <span class="material-symbols-outlined text-[22px]">{{ fleetService.isDarkMode() ? 'light_mode' : 'dark_mode' }}</span>
        </button>
        <!-- <button class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors rounded-full">
          <span class="material-symbols-outlined text-[22px]">settings</span>
        </button> -->

        <div class="h-6 w-px bg-outline-variant/30 mx-2"></div>

        <div class="relative group">
          <button class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-surface-variant transition-colors">
            <span class="font-label text-[0.65rem] font-bold tracking-widest uppercase text-on-surface-variant hidden lg:block">Administrator</span>
            <span class="material-symbols-outlined text-[28px] text-primary">account_circle</span>
          </button>

          <!-- Profile Dropdown Menu -->
          <div class="absolute right-0 mt-2 w-48 bg-surface-container border border-outline-variant/30 rounded-lg shadow-xl py-2 z-[60] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div class="px-4 py-2 border-b border-outline-variant/20 mb-1">
              <p class="text-[0.65rem] font-bold text-primary tracking-widest uppercase">Administrator</p>
              <p class="text-[0.6rem] text-on-surface-variant uppercase">System Administrator</p>
            </div>
            <a class="flex items-center gap-3 px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-variant hover:text-primary transition-colors" href="#">
              <span class="material-symbols-outlined text-sm">person</span>
              <span>Profile</span>
            </a>
            <a class="flex items-center gap-3 px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-variant hover:text-primary transition-colors" href="#">
              <span class="material-symbols-outlined text-sm">settings</span>
              <span>Settings</span>
            </a>
            <div class="h-px bg-outline-variant/20 my-1"></div>
            <a class="flex items-center gap-3 px-4 py-2 text-xs font-medium text-secondary hover:bg-secondary-container/20 transition-colors" href="#">
              <span class="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `
})
export class Header {
  fleetService = inject(FleetService);
}
