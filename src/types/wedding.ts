export type AttendanceStatus = "hadir" | "tidak_hadir" | "ragu";

export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  attendance: AttendanceStatus;
  message: string;
  photo_url?: string;
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

export interface ContactPerson {
  name: string;
  phoneDisplay: string;
  waNumber: string;
  role?: string;
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

export type GuestCategory = "vip" | "keluarga" | "teman" | "rekan" | "umum";

export interface GuestItem {
  id: string;
  name: string;
  category: GuestCategory;
  phone?: string;
  notes?: string;
  isSent: boolean;
  sentAt?: string;
  createdAt: string;
}
