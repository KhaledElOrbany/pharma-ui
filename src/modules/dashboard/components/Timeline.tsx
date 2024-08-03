import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline as MuiTimeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { fDateTime } from '@/helpers/utils/TimeUtil';

type TimelinePropTypes = {
  title: string;
  subheader: string;
  list: [{ id: string; time: Date; title: string; type: string }];
};

export default function Timeline({
  title,
  subheader,
  list,
  ...other
}: TimelinePropTypes) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <MuiTimeline>
          {list.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </MuiTimeline>
      </CardContent>
    </Card>
  );
}

type OrderItemPropTypes = {
  isLast: boolean;
  item: {
    time: Date;
    title: string;
    type: string;
  };
};

function OrderItem({ item, isLast }: OrderItemPropTypes) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant='subtitle2'>{title}</Typography>

        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
