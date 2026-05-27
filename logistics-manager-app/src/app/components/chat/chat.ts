import { Component, inject } from '@angular/core';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-chat',
  imports: [],
  template: `
    @if (fleetService.isChatOpen()) {
      <div class="fixed bottom-6 right-6 w-80 bg-surface-container border border-outline-variant/30 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col z-[9999] overflow-hidden transition-all duration-300 transform origin-bottom-right">
        <!-- Header -->
        <div class="bg-primary-container/20 border-b border-outline-variant/20 px-4 py-3 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-sm">chat</span>
            <span class="font-headline font-bold text-sm text-on-surface tracking-wide uppercase">AI Assistant</span>
          </div>
          <button class="text-on-surface-variant hover:text-on-surface transition-colors" (click)="fleetService.toggleChat()">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        
        <!-- Messages -->
        <div class="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-surface-container-low/50">
          <div class="flex flex-col items-center justify-center h-full text-center p-4">
            <span class="material-symbols-outlined text-on-surface-variant/20 text-4xl mb-2">forum</span>
            <p class="text-on-surface-variant/50 font-label text-[0.65rem] uppercase tracking-widest">No active transmission</p>
          </div>
        </div>

        <!-- Input -->
        <div class="p-3 border-t border-outline-variant/20 bg-surface-container flex items-center gap-2">
          <input type="text" 
                 placeholder="Type a command..." 
                 class="flex-1 bg-surface border border-outline-variant/50 rounded-full px-4 py-2 font-label text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors shadow-inner">
          <button class="bg-primary text-on-primary p-2 rounded-full hover:bg-primary/90 transition-colors shrink-0 flex items-center justify-center shadow-md">
            <span class="material-symbols-outlined text-[16px] ml-0.5">send</span>
          </button>
        </div>
      </div>
    }
  `
})
export class Chat {
  fleetService = inject(FleetService);
}
