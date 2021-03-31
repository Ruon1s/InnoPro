import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { getDayFromWeekAgoFormatted } from "../../utils/helpers";
import { setErrorMessage, toggleLoading } from "../app/actions";
import { FETCH_NEWS, News } from "./types";

export const fetchNews = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {

    const date = getDayFromWeekAgoFormatted();

    const response = await fetch(`https://www.espoo.fi/api/opennc/v1/ContentLanguages(2)/Contents?$filter=TemplateId%20eq%209%20and%20PublicDate%20gt%20DateTime%27${date}%27&$top=10&$format=json`);
    const toJSON = await response.json();

    const newsWithDetails = await Promise.all(toJSON.value.map(async (item: News) => {
      try {
        const details = await fetch(`https://www.espoo.fi/api/opennc/v1/ContentLanguages(2)/Contents(${item.ContentId})/ExtendedProperties?$format=json`);
        const toJSON = await details.json();

        return { ...item, details: toJSON }
      } catch (error) {
        dispatch(setErrorMessage(error.message, 5));
      }
    }));

    dispatch({ type: FETCH_NEWS, payload: { value: newsWithDetails } });
  } catch (error) {
    dispatch(setErrorMessage(error.message, 5));
  }
}