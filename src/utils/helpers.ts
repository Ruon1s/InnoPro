//Helper functions that doesn't really fit anywhere else

export const formatDate = (timestamp: string): string => {
  if (timestamp !== undefined && timestamp !== '') {
    const date = timestamp.split('T')[0];
    const hours = timestamp.split('T')[1].split(':')[0];
    const minutes = timestamp.split('T')[1].split(':')[1]
  
    return `${date} ${hours}:${minutes}`;
  }

  return '';
}

export const getDayFromWeekAgoFormatted = (): string => {
  const currentDate = new Date();
  let day = currentDate.getDate();

  if (day <= 7) {
    day = 1
  } else {
    day = day - 7;
  }

  const dayAsString = day < 10 ? `0${day}` : day;  
  const month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()}` : currentDate.getMonth();
  const year = currentDate.getFullYear();
  
  return `${year}-${month}-${dayAsString}T00:00:00`;
}

export const removeHTMLTags = (text: string | undefined): string => {
  if (text !== undefined && text !== '') {
    const splitted = text.split(/<\/?[^>]+(>|$)/g);
    const removeLeftOverArrows = splitted.filter(char => char !== '>');
    const removeEmptys = removeLeftOverArrows.filter(char => char !== '');
  
    return removeEmptys.join(' ');
  }
  return 'No content';
}