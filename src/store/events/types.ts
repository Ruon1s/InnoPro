export interface EventState {
    meta: {
        count: number
    },
    data: {
        id: number,
        event_status: string
        offers: {
            is_free: boolean
            price: number
        }[],
        start_time: string,
        end_time: string
        audience_min_age: number,
        description: {
            fi: string,
            en: string
        },
        short_description: {
            fi: string,
            en: string
        },
        location_extra_info: {
            fi: string,
            en: string
        },
        info_url: {
            fi: string,
            en: string
        },
        name: {
            fi: string,
            en: string
        }
    }[]
}

export const FETCH_EVENTS = "FETCH_EVENTS";

interface FetchEventAction {
    type: typeof FETCH_EVENTS;
    payload: EventState;
}

export type EventActionTypes = FetchEventAction;
