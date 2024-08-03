import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader, useTheme } from '@mui/material';
import { useChart } from '@/shared/components/chart';
import { fNumber } from '@/helpers/utils/NumberUtil';

type BarChartPropTypes = {
  title: string;
  subheader: string;
  chartData: [{ label: string; value: number }];
};

export default function BarChart({
  title,
  subheader,
  chartData,
  ...other
}: BarChartPropTypes) {
  const theme = useTheme();
  const chartLabels = chartData.map((i) => i.label);
  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      theme: theme.palette.mode,
      marker: { show: true },
      y: {
        formatter: (seriesName: number) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir={'ltr'}>
        <ReactApexChart
          type='bar'
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={395}
        />
      </Box>
    </Card>
  );
}
