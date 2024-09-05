import { Location, SmallLocation } from './location.interface';

export interface SmallMeetingRoom {
  id: string;
  name: string;
  location: SmallLocation;
  image: string;
}

export interface MeetingRoom extends SmallMeetingRoom {
  occupancy: number;
  isActive: boolean;
  // attributes: MeetingRoomAttributes;
  hasWhiteboard: boolean;
  hasProjector: boolean;
  hasScreen: boolean;
  hasSpeakers: boolean;
  hasVideoConferencing: boolean;
  hasWifi: boolean;
  department?: string;
}

// export interface MeetingRoomAttributes {
//   hasWhiteboard: boolean;
//   hasProjector: boolean;
//   hasScreen: boolean;
//   hasSpeakers: boolean;
//   hasVideoConferencing: boolean;
//   hasWiFi: boolean;
// }
