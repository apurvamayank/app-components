/* eslint react/prop-types: 0 */
import React from 'react';
import { Tornado } from '../components/Tornado/Tornado';
import {
  TopTornadoLabel,
  BottomTornadoStatsLabel,
} from '../components/Tornado/TornadoLabels';

export default {
  title: 'core/Tornado',
  component: Tornado,
  argTypes: {
    topLabelRenderer: { control: 'none' },
    bottomStatsRenderer: { control: 'none' },
  },
};

const Template = (args) => <Tornado {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  initialIndex: 0,
  data: {
    labels: ['Social', 'Display', 'Search', 'Email', 'Other'],
    stats: [
      {
        id: 0,
        revenue: '$0',
        orders: 173,
        roas: 0,
      },
      {
        id: 1,
        revenue: '$0',
        orders: 173,
        roas: 0,
      },
      {
        id: 2,
        revenue: '$50K',
        orders: 173,
        roas: 29,
      },
      {
        id: 3,
        revenue: '$50K',
        orders: 173,
        roas: 36,
      },
      {
        id: 4,
        revenue: '$100K',
        orders: 173,
        roas: 95,
      },
    ],
    rows: [
      {
        id: 'row-0',
        data: [33, 152, 200, 254, 60],
        label: 'Website visits',
        totalValue: 687,
        totalPercentage: '100',
      },
      {
        id: 'row-1',
        data: [120, 300, 150, 120, 600],
        label: 'Page visits',
        totalValue: 1410,
        totalPercentage: '39',
      },
      {
        id: 'row-2',
        data: [60, 80, 100, 40, 220],
        label: 'Carts created',
        totalValue: 450,
        totalPercentage: '12',
      },
      {
        id: 'row-3',
        data: [5, 12, 14, 5, 40],
        label: 'Orders placed',
        totalValue: 73,
        totalPercentage: '2',
      },
    ],
  },
  // eslint-disable-next-line react/display-name
  topLabelRenderer: ({ text, pathColor, isSelected }) => (
    <TopTornadoLabel color={pathColor} isSelected={isSelected}>
      {text}
    </TopTornadoLabel>
  ),
  // eslint-disable-next-line react/display-name
  bottomStatsRenderer: ({ stats, pathColor, isSelected }) => (
    <BottomTornadoStatsLabel
      stats={stats}
      pathColor={pathColor}
      isSelected={isSelected}
    />
  ),
};
