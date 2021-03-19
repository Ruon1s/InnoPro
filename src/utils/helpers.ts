export const formatDate = (timestamp: string | undefined): string => {
  if (timestamp) {
    const date = timestamp.split('T')[0];
    const hours = timestamp.split('T')[1].split(':')[0];
    const minutes = timestamp.split('T')[1].split(':')[1]
  
    return `${date} ${hours}:${minutes}`;
  }

  return '';
}

export const getDayFromWeekAgoFormatted = (): string => {
  const currentDate = new Date();
  const day = currentDate.getDate() - 7 < 10 ? `0${currentDate.getDate() - 7}` : currentDate.getDate() - 7;
  const month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()}` : currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  return `${year}-${month}-${day}T00:00:00`;
}

export const removeHTMLTags = (text: string | undefined): string => {
  if (text) {
    const splitted = text.split(/<\/?[^>]+(>|$)/g);
    const removeLeftOverArrows = splitted.filter(char => char !== '>');
    const removeEmptys = removeLeftOverArrows.filter(char => char !== '');
  
    return removeEmptys.join(' ');
  }
  return 'No content';
}