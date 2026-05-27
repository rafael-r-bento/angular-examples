import { Component, input, output, effect, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import type * as LType from 'leaflet';
import { FleetUnit } from '../../services/fleet.service';

@Component({
  selector: 'app-fleet-detail-modal',
  imports: [DecimalPipe],
  template: `
    <dialog #dialog 
      (close)="close.emit()"
      (click)="onDialogClick($event)"
      class="backdrop:bg-surface-container-highest/80 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto border-none outline-none overflow-visible max-w-2xl w-[90vw] md:w-full"
      aria-labelledby="modal-title"
    >
      <div class="bg-surface text-on-surface rounded-xl border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col">
        <header class="bg-surface-container flex justify-between items-center p-4 border-b border-outline-variant/30">
          <h2 id="modal-title" class="text-xl font-black text-primary uppercase tracking-widest">{{ unit().id }}</h2>
          <button (click)="closeModal()" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center" aria-label="Close modal">
            <span class="material-symbols-outlined">close</span>
          </button>
        </header>

        <div class="flex flex-col md:flex-row gap-6 p-6">
          <div class="flex-1 space-y-6">
            <div class="space-y-4">
               <div>
                 <span class="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Status</span>
                 <span class="text-sm font-bold px-2 py-1 rounded border border-outline-variant/30 uppercase tracking-widest"
                       [class]="getStatusBadgeClass(unit().status)">
                    {{ unit().status }}
                 </span>
               </div>
               
               <div>
                 <span class="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Speed</span>
                 <span class="text-base font-bold text-on-surface">{{ unit().speed }}</span>
               </div>

               <div>
                 <span class="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Battery</span>
                 <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden max-w-[100px]">
                      <div class="h-full rounded-full" 
                           [style.width]="unit().battery"
                           [class]="getBatteryColor(unit().battery)"></div>
                    </div>
                    <span class="text-sm font-bold text-on-surface-variant">{{ unit().battery }}</span>
                 </div>
               </div>

               <div>
                 <span class="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Service Status</span>
                 <div class="flex items-center gap-2">
                   @if (unit().needsService) {
                     <span class="material-symbols-outlined text-error text-xl animate-pulse">warning</span>
                     <span class="text-sm font-bold text-error uppercase tracking-widest">Needs Attention</span>
                   } @else {
                     <span class="material-symbols-outlined text-primary/70 text-xl">check_circle</span>
                     <span class="text-sm font-bold text-primary/70 uppercase tracking-widest">Operational</span>
                   }
                 </div>
               </div>
            </div>
          </div>

          <div class="flex-1 flex flex-col gap-2">
            <span class="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest block">Last Known Location</span>
            <span class="text-xs font-mono text-on-surface-variant">{{ unit().lat | number:'1.4-4' }}, {{ unit().lng | number:'1.4-4' }}</span>
            <div class="flex-1 bg-surface-container-highest rounded-lg overflow-hidden border border-outline-variant/30 min-h-[200px] relative z-0">
              <div #mapContainer class="absolute inset-0 w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  `
})
export class FleetDetailModal {
  unit = input.required<FleetUnit>();
  close = output<void>();

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  mapContainer = viewChild<ElementRef<HTMLElement>>('mapContainer');

  private map: LType.Map | undefined;
  private L: typeof LType | undefined;

  constructor() {
    effect(() => {
      const dialogEl = this.dialog().nativeElement;
      if (!dialogEl.open) {
        dialogEl.showModal();
      }
    });

    afterNextRender(() => {
      import('leaflet').then(L => {
        this.L = L;
        this.initMap();
      });
    });
  }

  initMap() {
    if (!this.L) return;
    const container = this.mapContainer()?.nativeElement;
    if (!container) return;
    
    const u = this.unit();
    const mapOptions = {
      zoomControl: true,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true
    };

    this.map = this.L.map(container, mapOptions).setView([u.lat, u.lng], 14);
    
    const isDark = document.documentElement.classList.contains('dark');
    const url = isDark 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    this.L.tileLayer(url).addTo(this.map);
    
    const icon = this.L.divIcon({
        html: '<div class="w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(255,182,144,0.8)] border-2 border-surface"></div>',
        className: 'custom-vehicle-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      
    this.L.marker([u.lat, u.lng], { icon }).addTo(this.map);
  }

  closeModal() {
    this.dialog().nativeElement.close();
  }

  onDialogClick(event: MouseEvent) {
    if (event.target === this.dialog().nativeElement) {
      this.closeModal();
    }
  }

  getStatusBadgeClass(status: string) {
    switch (status) {
      case 'EN ROUTE': case 'TRANSIT': return 'bg-primary/10 text-primary border-primary/20';
      case 'DOCKING': case 'CHARGING': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'CRITICAL': case 'REPAIR': case 'WARNING': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-surface-container-highest text-on-surface-variant';
    }
  }

  getBatteryColor(battery: string) {
    const val = parseFloat(battery);
    if (val < 20) return 'bg-error';
    if (val < 50) return 'bg-warning text-warning';
    return 'bg-primary';
  }
}
