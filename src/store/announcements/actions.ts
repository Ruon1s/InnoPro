import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { getDayFromWeekAgoFormatted } from "../../utils/helpers";
import { setErrorMessage } from "../app/actions";
import { Announcement, FETCH_ANNOUNCEMENTS } from "./types";

export const fetchAnnouncements = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const date = getDayFromWeekAgoFormatted();

    const response = await fetch(`https://www.espoo.fi/api/opennc/v1/ContentLanguages(2)/Contents?$filter=TemplateId%20eq%2077%20and%20PublicDate%20gt%20DateTime%27${date}%27&$top=10&$format=json`);
    const toJSON = await response.json();

    const announcementsWithDetails = await Promise.all(toJSON.value.map(async (item: Announcement) => {
      try {
        const details = await fetch(`https://www.espoo.fi/api/opennc/v1/ContentLanguages(2)/Contents(${item.ContentId})/ExtendedProperties?$format=json`);
        const toJSON = await details.json();

        return { ...item, details: toJSON };
      } catch (error) {
        dispatch(setErrorMessage(error.message, 5));
      }
    }));

    dispatch({ type: FETCH_ANNOUNCEMENTS, payload: { value: announcementsWithDetails } });
  } catch (error) {
    dispatch(setErrorMessage(error.message, 5));
  }
}