import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Announcement } from '../store/announcements/types';
import { formatDate, removeHTMLTags } from '../utils/helpers';
import Card from './Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subject: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 2,
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12,
    color: 'silver'
  },
  content: {
    fontSize: 14,
  },
  top: {
    flex: 1,
    marginBottom: 5,
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
  }
});

interface Props {
  announcement: Announcement;
}

const AnnouncementItem: React.FC<Props> = ({ announcement }) => {
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text numberOfLines={2} style={styles.subject}>{announcement.Subject}</Text>
          <Text style={styles.date}>{formatDate(announcement.CreatedDate)}</Text>
        </View>
        <View style={styles.bottom}>
          <Text numberOfLines={3} style={styles.content}>{removeHTMLTags(announcement.details.value.find(item => item.Name === "LiftContent")?.Text)}</Text>
        </View>
      </View>
    </Card>
  );
}

export default AnnouncementItem;

