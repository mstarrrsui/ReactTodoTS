interface Position {
  lat: number;
  lng: number;
}

interface POV {
  heading: number;
  pitch: number;
}

export interface Location {
  position: Position;
  pov: POV;
}

export interface House {
  id: number;
  name: string;
  location: Location;
}
