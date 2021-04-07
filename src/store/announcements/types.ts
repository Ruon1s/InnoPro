export interface AnnouncementState {
    value: Announcement[];
}

export interface Announcement {
    classifications: {
        NodeId: number;
        NodeName: string;
        Type: number;
    }[];
    ContentId: number;
    CreatedDate: string;
    CreatorId: number;
    EditedDate: string;
    Editor: number;
    EventLanguageVersionCorrelationId: number;
    ExpiryDate: string;
    FileLinks: [];
    IsRecurrentEvent: boolean;
    LanguageId: number;
    LanguageVersionCorrelationId: string;
    PublicDate: string;
    PublishedDate: string;
    Subject: string;
    TemplateId: number;
    Version: number;
    details: AnnouncementDetails;
}

export interface AnnouncementDetails {
    value: {
        Date: string | null;
        Id: number;
        Name: "Name" | "LiftContent" | "Content" | "";
        Text: string;
    }[];
}

export const FETCH_ANNOUNCEMENTS = "FETCH_ANNOUNCEMENTS";

interface FetchAnnouncementsAction {
    type: typeof FETCH_ANNOUNCEMENTS;
    payload: AnnouncementState;
}

export type AnnouncementActionTypes = FetchAnnouncementsAction; 