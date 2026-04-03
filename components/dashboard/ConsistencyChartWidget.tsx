import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ConsistencyChartWidgetProps {
  historicalData: number[];
}

export function ConsistencyChartWidget({ historicalData }: ConsistencyChartWidgetProps) {
  return (
    <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 p-4 md:p-6 rounded-3xl backdrop-blur-xl flex flex-col">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h3 className="font-ovo text-base md:text-lg">Consistency Analytics</h3>
        <select className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-light outline-none">
          <option>Last 30 Days</option>
          <option>All Time</option>
        </select>
      </div>
      
      {/* Chart container — horizontally scrollable on very small screens to prevent compression */}
      <div className="w-full flex-grow overflow-x-auto -mx-1 px-1">
        <div className="min-w-[480px] md:min-w-0 h-[280px] md:h-[260px]">
          <Line 
            data={{
              labels: ['Day 1', 'Day 4', 'Day 8', 'Day 12', 'Day 16', 'Day 20', 'Day 23', 'Today'],
              datasets: [
                {
                  fill: true,
                  label: 'Adherence Rating %',
                  data: historicalData,
                  borderColor: '#1D9E75',
                  backgroundColor: 'rgba(29, 158, 117, 0.15)',
                  tension: 0.4,
                  pointBackgroundColor: '#1D9E75',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                }
              ],
            }} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false }
              },
              scales: {
                x: { 
                  grid: { display: false }, 
                  border: { display: false }, 
                  ticks: { color: '#71717a', font: { family: 'var(--font-ovo), Georgia, serif', size: 10 } } 
                },
                y: { 
                  min: 0, 
                  max: 100, 
                  border: { display: false }, 
                  grid: { color: 'rgba(255,255,255,0.05)' }, 
                  ticks: { color: '#71717a', stepSize: 25, font: { size: 10 } } 
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}

