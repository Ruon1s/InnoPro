export interface NewsState {
    value: News[];
}

export interface News {
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
    details: NewsDetails;
}

export interface NewsDetails {
    value: {
        Date: string | null;
        Id: number;
        Name: "Name" | "LiftContent" | "Content" | "";
        Text: string;
    }[];
}

export const FETCH_NEWS = "FETCH_NEWS";

interface FetchNewsActionType {
    type: typeof FETCH_NEWS;
    payload: NewsState;
}

export type NewsActionTypes = FetchNewsActionType;