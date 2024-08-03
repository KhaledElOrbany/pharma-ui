import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { useChart } from '../../../shared/components/chart';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
  '& .apexcharts-legend-text': {
    right: theme.direction === 'rtl' ? '0.25rem' : '',
    left: theme.direction === 'ltr' ? '0.25rem' : '',
  },
}));

type DistributionWidgetPropTypes = {
  title: string;
  subheader: string;
  chartData: [];
  chartColors: string[];
  chartLabels: string[];
};

export default function DistributionWidget({
  title,
  subheader,
  chartData,
  chartColors,
  chartLabels,
  ...other
}: DistributionWidgetPropTypes) {
  const dir = document.documentElement.dir;
  const chartOptions = useChart({
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: chartColors,
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir={dir}>
        <ReactApexChart
          type='radar'
          series={chartData}
          options={chartOptions}
          height={340}
        />
      </StyledChartWrapper>
    </Card>
  );
}
