import { Component, inject, effect, afterNextRender, Injector } from '@angular/core';
import { FleetService, FleetUnit } from '../../services/fleet.service';

@Component({
  selector: 'app-sidebar',
  host: {
    'class': 'bg-surface-container-low/60 backdrop-blur-md w-80 h-full flex flex-col border-l border-outline-variant/30 z-10 transition-colors duration-300'
  },
  template: `
    <!-- Sidebar Header -->
    <div class="p-6 border-b border-outline-variant/30">
      <div class="flex justify-between items-end mb-4">
        <div>
          <h2 class="font-headline font-bold text-lg tracking-tight text-on-surface">CENTRAL-US-1F4</h2>
          <p class="font-label text-[0.65rem] uppercase tracking-widest text-primary">Regional Monitoring</p>
        </div>
      </div>
    </div>

    <!-- Scrollable Content Area -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Critical Alert Card -->
      <div class="p-3 bg-secondary-container/20 border border-secondary shadow-sm rounded-lg">
        <div class="flex justify-between items-start mb-2">
          <span class="font-label text-[0.6rem] font-black uppercase text-secondary tracking-widest">CRITICAL ALERT</span>
          <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">warning</span>
        </div>
        <h3 class="font-headline font-black text-sm text-on-surface">V-UNIT 04_ALPHA</h3>
        <p class="font-label text-[0.68rem] text-secondary mt-1">POWER CELL DEPLETION CRITICAL: 4%</p>
        <div class="mt-2 w-full bg-surface-variant h-1 rounded-full overflow-hidden">
          <div class="bg-secondary h-full w-[4%] shadow-sm"></div>
        </div>
      </div>

      <!-- Fleet List -->
      <div class="space-y-1">
        <div class="flex items-center justify-between px-2 py-1 mb-2">
          <span class="font-label text-[0.6rem] font-bold uppercase text-on-surface-variant tracking-widest">Active Fleet</span>
          <span class="font-label text-[0.65rem] text-on-surface-variant/80">{{ fleetService.units().length < 10 ? '0' : '' }}{{ fleetService.units().length }} UNITS</span>
        </div>

        @for (unit of fleetService.fleetWithActiveState(); track unit.id) {
          <div [id]="'unit-' + unit.id"
               class="p-3 bg-surface-container hover:bg-surface-container-high transition-all group border-l-2 cursor-pointer shadow-sm"
               [class.border-primary]="unit.active"
               [class.border-transparent]="!unit.active"
               [class.hover:border-primary-container]="!unit.active"
               [class.bg-primary-container]="unit.active"
               [class.bg-opacity-10]="unit.active"
               (click)="selectUnit(unit)">
            <div class="flex justify-between">
              <span class="font-headline font-bold text-xs uppercase text-on-surface">{{ unit.id }}</span>
              <span class="font-label text-[0.65rem] font-medium" [class.text-primary]="unit.active" [class.text-on-surface-variant]="!unit.active">
                {{ unit.status }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-2 mt-3">
              <div class="flex flex-col">
                <span class="font-label text-[0.55rem] uppercase text-on-surface-variant">Speed</span>
                <span class="font-label text-xs font-bold uppercase tracking-tighter text-on-surface">{{ unit.speed }}</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label text-[0.55rem] uppercase text-on-surface-variant">Battery</span>
                <span class="font-label text-xs font-bold uppercase tracking-tighter text-on-surface">{{ unit.battery }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class Sidebar {
  fleetService = inject(FleetService);
  injector = inject(Injector);

  constructor() {
    effect(() => {
      const activeId = this.fleetService.activeUnitId();
      if (activeId && typeof document !== 'undefined') {
        afterNextRender(() => {
          const element = document.getElementById('unit-' + activeId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, { injector: this.injector });
      }
    });
  }

  selectUnit(selected: FleetUnit) {
    this.fleetService.setActiveUnit(selected.id);
  }
}