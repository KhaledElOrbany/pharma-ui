import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, styled, useTheme } from '@mui/material';
import { useChart } from '@/shared/components/chart';

const StyledChartWrapper = styled('div')(({ theme }) => ({
  ':dir': theme.direction,
  '& .apexcharts-legend-marker': {
    verticalAlign: 'middle',
  },
  '& .apexcharts-tooltip-marker': {
    top: 1.25,
    marginRight: '0px',
    right: theme.direction === 'ltr' ? '0.25rem !important' : '',
    left: theme.direction === 'rtl' ? '0.25rem !important' : '',
  },
  '& .apexcharts-legend-text': {
    right: theme.direction === 'rtl' ? '0.25rem' : '',
    left: theme.direction === 'ltr' ? '0.25rem' : '',
  },
}));

type LineChartPropTypes = {
  title: string;
  subheader: string;
  chartData: [{ name: string; type: string; data: number[]; fill: string }];
  chartLabels: string[];
};

export default function LineChart({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}: LineChartPropTypes) {
  const { palette } = useTheme();
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: {
      labels: {
        formatter: function (value: string) {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
          });
          return formattedDate;
        },
      },
    },
    tooltip: {
      theme: palette.mode,
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper>
        <ReactApexChart
          type='line'
          series={chartData}
          options={chartOptions}
          height={375}
        />
      </StyledChartWrapper>
    </Card>
  );
}
