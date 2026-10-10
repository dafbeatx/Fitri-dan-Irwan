export type AttendanceStatus = "hadir" | "tidak_hadir" | "ragu";

export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  attendance: AttendanceStatus;
  message: string;
  created_at: string;
}

export interface RsvpSubmission {
  name: string;
  phone?: string;
  attendance: AttendanceStatus;
  guests_count: number;
  message?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  iconName?: string;
  logoUrl?: string;
}

export interface StoryTimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}
