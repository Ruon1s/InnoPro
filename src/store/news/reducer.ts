import { FETCH_NEWS, NewsActionTypes, NewsState } from "./types";

const initialState: NewsState = {
    value: [
        {
        classifications: [
            {
            NodeId: 0,
            NodeName: '',
            Type: 0,
            }
        ],
        ContentId: 0,
        CreatedDate: '',
        CreatorId: 0,
        EditedDate: '',
        Editor: 0,
        EventLanguageVersionCorrelationId: 0,
        ExpiryDate: '',
        FileLinks: [],
        IsRecurrentEvent: false,
        LanguageId: 0,
        LanguageVersionCorrelationId: '',
        PublicDate: '',
        PublishedDate: '',
        Subject: '',
        TemplateId: 0,
        Version: 0,
        details: {
            value: [
            {
                Name: '',
                Text: '',
                Id: 0,
                Date: null,
            }
            ]
        }
        }
    ]
}

const reducer = (state = initialState, action: NewsActionTypes) => {
    switch (action.type) {
        case FETCH_NEWS:
            return { ...action.payload };
        default:
            return state;
    }
}

export default reducer;