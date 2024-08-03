import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { useChart } from '@/shared/components/chart';

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
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
  '& .apexcharts-tooltip-marker': {
    top: 1.25,
    verticalAlign: 'middle',
    marginRight: '0px',
    right: theme.direction === 'ltr' ? '0.25rem !important' : '',
    left: theme.direction === 'rtl' ? '0.25rem !important' : '',
  },
}));

type PieChartPropTypes = {
  title: string;
  subheader: string;
  chartColors: string[];
  chartData: [{ label: string; value: number }];
};

export default function PieChart({
  title,
  subheader,
  chartColors,
  chartData,
  ...other
}: PieChartPropTypes) {
  const { palette } = useTheme();
  const chartLabels = chartData.map((i) => i?.label);
  const chartSeries = chartData.map((i) => i?.value);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      theme: palette.mode,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper>
        <ReactApexChart
          type='pie'
          series={chartSeries}
          options={chartOptions}
          height={280}
        />
      </StyledChartWrapper>
    </Card>
  );
}
