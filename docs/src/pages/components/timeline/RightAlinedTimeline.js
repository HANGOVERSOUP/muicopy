import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot'

export default function RightAlignedTimeline() {
  return (
    <Timeline align="right">
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Eat</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Code</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Sleep</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Repeat</TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}