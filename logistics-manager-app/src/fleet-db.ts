type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface FleetUnit {
  id: string;
  uuid: UUID;
  lat: number;
  lng: number;
  status: 'EN ROUTE' | 'DOCKING' | 'CRITICAL' | 'TRANSIT' | 'CHARGING' | 'MAINTENANCE' | 'WARNING';
  speed: string;
  battery: string;
  needsService: boolean;
}

export interface ServiceTicket {
  id: string;
  unitId: string;
  issue: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  reportedAt: string;
}

export class FleetDatabaseService {
  private fleet: FleetUnit[] = [
    {
      uuid: '8f3b90e1-7b21-4d1a-9f8e-1c5e9a4d2c3b',
      id: 'AMBER-COYOTE-01',
      lat: 40.7128,
      lng: -74.006,
      needsService: false,
      status: 'EN ROUTE',
      speed: '84.2 KM/H',
      battery: '72.0%',
    },
    {
      uuid: '2a1f8c92-6d4e-4b3a-8c1f-9e7d5b2a0c4f',
      id: 'SILVER-COBRA-02',
      lat: 34.0522,
      lng: -118.2437,
      needsService: false,
      status: 'DOCKING',
      speed: '12.5 KM/H',
      battery: '18.5%',
    },
    {
      uuid: 'c9e8d7f6-a5b4-4321-8765-43210fedcba9',
      id: 'IRON-EAGLE-04',
      lat: 41.8781,
      lng: -87.6298,
      needsService: true,
      status: 'CRITICAL',
      speed: '0.0 KM/H',
      battery: '4.0%',
    },
    {
      uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      id: 'NEON-TIGER-09',
      lat: 29.7604,
      lng: -95.3698,
      needsService: false,
      status: 'TRANSIT',
      speed: '102.0 KM/H',
      battery: '94.1%',
    },
    {
      uuid: '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e',
      id: 'FROST-WOLF-05',
      lat: 47.6062,
      lng: -122.3321,
      needsService: false,
      status: 'EN ROUTE',
      speed: '65.0 KM/H',
      battery: '88.2%',
    },
    {
      uuid: 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a',
      id: 'SWIFT-FALCON-06',
      lat: 37.7749,
      lng: -122.4194,
      needsService: false,
      status: 'CHARGING',
      speed: '0.0 KM/H',
      battery: '34.5%',
    },
    {
      uuid: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      id: 'STURDY-BISON-07',
      lat: 32.7157,
      lng: -117.1611,
      needsService: false,
      status: 'EN ROUTE',
      speed: '78.4 KM/H',
      battery: '56.1%',
    },
    {
      uuid: '5e6f7a8b-9c0d-4e1f-2a3b-4c5d6e7f8a9b',
      id: 'BOLD-PANTHER-08',
      lat: 33.4484,
      lng: -112.074,
      needsService: false,
      status: 'TRANSIT',
      speed: '0.0 KM/H',
      battery: '89.0%',
    },
    {
      uuid: '3d4e5f6a-7b8c-4d9e-0f1a-2b3c4d5e6f7a',
      id: 'SHADOW-RAVEN-10',
      lat: 36.1699,
      lng: -115.1398,
      needsService: false,
      status: 'TRANSIT',
      speed: '112.5 KM/H',
      battery: '45.2%',
    },
    {
      uuid: '1c2d3e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f',
      id: 'GLACIAL-BEAR-11',
      lat: 40.7608,
      lng: -111.891,
      needsService: false,
      status: 'EN ROUTE',
      speed: '90.1 KM/H',
      battery: '61.8%',
    },
    {
      uuid: '9a0b1c2d-3e4f-4a5b-6c7d-8e9f0a1b2c3d',
      id: 'CRIMSON-STAG-12',
      lat: 45.5152,
      lng: -122.6784,
      needsService: false,
      status: 'DOCKING',
      speed: '5.2 KM/H',
      battery: '22.4%',
    },
    {
      uuid: '7f8a9b0c-1d2e-4f3a-4b5c-6d7e8f9a0b1c',
      id: 'AZURE-SHARK-13',
      lat: 39.7392,
      lng: -104.9903,
      needsService: false,
      status: 'TRANSIT',
      speed: '105.0 KM/H',
      battery: '81.7%',
    },
    {
      uuid: '5d6e7f8a-9b0c-41d2-e3f4-a5b6c7d8e9f0',
      id: 'GOLDEN-FOX-14',
      lat: 32.7767,
      lng: -96.797,
      needsService: false,
      status: 'EN ROUTE',
      speed: '88.6 KM/H',
      battery: '50.3%',
    },
    {
      uuid: '3b4c5d6e-7f8a-49b0-c1d2-e3f4a5b6c7d8',
      id: 'BRONZE-OWL-15',
      lat: 30.2672,
      lng: -97.7431,
      needsService: false,
      status: 'CHARGING',
      speed: '0.0 KM/H',
      battery: '41.9%',
    },
    {
      uuid: '1a2b3c4d-5e6f-47a8-b9c0-d1e2f3a4b5c6',
      id: 'OBSIDIAN-MANTIS-16',
      lat: 29.9511,
      lng: -90.0715,
      needsService: false,
      status: 'TRANSIT',
      speed: '45.0 KM/H',
      battery: '18.1%',
    },
    {
      uuid: 'f9e8d7c6-b5a4-4321-0fed-cba987654321',
      id: 'EMERALD-LYNX-17',
      lat: 25.7617,
      lng: -80.1918,
      needsService: false,
      status: 'EN ROUTE',
      speed: '72.3 KM/H',
      battery: '95.5%',
    },
    {
      uuid: 'd7c6b5a4-3210-4fed-cba9-876543210fed',
      id: 'COBALT-RHINO-18',
      lat: 33.749,
      lng: -84.388,
      needsService: false,
      status: 'TRANSIT',
      speed: '98.4 KM/H',
      battery: '67.2%',
    },
    {
      uuid: 'b5a43210-fedc-4ba9-8765-43210fedcba9',
      id: 'VIOLET-VIPER-19',
      lat: 38.9072,
      lng: -77.0369,
      needsService: false,
      status: 'DOCKING',
      speed: '15.0 KM/H',
      battery: '29.8%',
    },
    {
      uuid: '93210fed-cba9-4876-5432-10fedcba9876',
      id: 'SOLAR-HAWK-20',
      lat: 39.9526,
      lng: -75.1652,
      needsService: false,
      status: 'EN ROUTE',
      speed: '81.9 KM/H',
      battery: '76.4%',
    },
    {
      uuid: '710fedcb-a987-4654-3210-fedcba987654',
      id: 'LUNAR-BADGER-21',
      lat: 42.3601,
      lng: -71.0589,
      needsService: true,
      status: 'CRITICAL',
      speed: '0.0 KM/H',
      battery: '2.1%',
    },
    {
      uuid: '5fedcba9-8765-4432-10fe-dcba98765432',
      id: 'MIST-OCTOPUS-22',
      lat: 42.3314,
      lng: -83.0458,
      needsService: false,
      status: 'TRANSIT',
      speed: '92.7 KM/H',
      battery: '83.9%',
    },
    {
      uuid: '3ba98765-4321-40fe-dcba-9876543210fe',
      id: 'FLAME-SCORPION-23',
      lat: 44.9778,
      lng: -93.265,
      needsService: false,
      status: 'EN ROUTE',
      speed: '85.5 KM/H',
      battery: '58.0%',
    },
    {
      uuid: '18765432-10fe-4dcb-a987-6543210fedcb',
      id: 'TITAN-HERON-24',
      lat: 38.627,
      lng: -90.1994,
      needsService: false,
      status: 'CHARGING',
      speed: '0.0 KM/H',
      battery: '66.6%',
    },
    {
      uuid: '06543210-fedc-4ba9-8765-43210fedcba9',
      id: 'GHOST-COUGAR-25',
      lat: 39.0997,
      lng: -94.5786,
      needsService: false,
      status: 'TRANSIT',
      speed: '108.2 KM/H',
      battery: '91.2%',
    },
  ];

  private serviceQueue: ServiceTicket[] = [];

  getFleet(): FleetUnit[] {
    return this.fleet;
  }

  getServiceQueue(): ServiceTicket[] {
    return this.serviceQueue;
  }

  getTicket(id: string): ServiceTicket | undefined {
    return this.serviceQueue.find((t) => t.id === id);
  }

  addTicket(ticket: Omit<ServiceTicket, 'id'>): ServiceTicket {
    const newId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = { ...ticket, id: newId } as ServiceTicket;
    this.serviceQueue.push(newTicket);
    return newTicket;
  }

  updateTicket(id: string, update: Partial<ServiceTicket>): ServiceTicket | undefined {
    const index = this.serviceQueue.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.serviceQueue[index] = { ...this.serviceQueue[index], ...update };
      return this.serviceQueue[index];
    }
    return undefined;
  }

  deleteTicket(id: string): boolean {
    const initialLength = this.serviceQueue.length;
    this.serviceQueue = this.serviceQueue.filter((t) => t.id !== id);
    return this.serviceQueue.length < initialLength;
  }

  getUnit(id: string): FleetUnit | undefined {
    return this.fleet.find((u) => u.id === id);
  }

  updateUnit(id: string, update: Partial<FleetUnit>): FleetUnit | undefined {
    const index = this.fleet.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.fleet[index] = { ...this.fleet[index], ...update };
      return this.fleet[index];
    }
    return undefined;
  }
}

export const fleetDb = new FleetDatabaseService();
