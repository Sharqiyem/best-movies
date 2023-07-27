import {Colors} from '@src/constants/colors';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface TagsSeletorProps {
  selectedIndex: {key: string; value: string}[];
  tags: {key: string; value: string}[];
  onPress: (tag: {key: string; value: string}) => void;
}

export const TagsSeletor = ({
  selectedIndex,
  tags,
  onPress,
}: TagsSeletorProps) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.tagsContainer}>
      {tags.map(tag => {
        const selected = selectedIndex.findIndex(t => t.key === tag.key) !== -1;

        return (
          <TouchableOpacity
            onPress={() => {
              onPress(tag);
            }}
            key={tag.key}
            style={[
              styles.tagContainer,
              selected && styles.activeTagContainer,
            ]}>
            <Text style={[styles.tagText, selected && styles.activeTagText]}>
              {tag.value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  tagContainer: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary[900],
    borderRadius: 7,
  },
  activeTagContainer: {
    backgroundColor: Colors.primary[900],
  },
  tagText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    color: Colors.primary[900],
  },
  activeTagText: {
    color: '#FFFFFF',
  },
});
