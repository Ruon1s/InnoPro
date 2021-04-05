import {EventActionTypes, EventState, FETCH_EVENTS} from "./types"

const initialState: EventState = {
    meta: {
        count: 0
    },
    data: [{
        id: 0,
        event_status: "",
        offers: [{
            is_free: false,
            price: 0
        }],
        start_time: "",
        end_time: "",
        audience_min_age: 0,
        description: {
            fi: "",
            en: ""
        },
        short_description: {
            fi: "",
            en: ""
        },
        location_extra_info: {
            fi: "",
            en: ""
        },
        info_url: {
            fi: "",
            en: ""
        },
        name: {
            fi: "",
            en: ""
        }
    }]
};

const reducer = (state = initialState, action: EventActionTypes) => {
    if (action.type === FETCH_EVENTS) {
        return {...action.payload};
    } else {
        return state;
    }
};
export default reducer;
