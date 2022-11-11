<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Dashboard</h1>
    </div>

    <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
   />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Event count by clients </h2>
        <h3 class="italic">Clients signed up for each event for the last 2 months</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Number of Clients</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="event in queryData">
            <td class="p-2 text-left">{{ event.eventName }}</td>
            <td class="p-2 text-left">{{ event.count }}</td>
      </tr>
    </tbody>
  </table>
</div>
    </div >
  </main>
</template>
<script>
  import axios from "axios";
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  export default {
      
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 50
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },     
  data() {
    return {
      queryData: [],
      chartData: {
        labels: [],
        datasets: [ { data: [], label: 'Show/Hide' ,backgroundColor: '#C8102E',} ]
      },
      chartOptions: {
        responsive: true,
        scales: {
        y: {
            min: 1,
            max: 10,
        }
    }
      }
    };
  },    
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/dashboard/`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
      this.chartData.labels = resp.data.map(value => value.eventName);
      this.chartData.datasets[0].data = resp.data.map(value => value.count);
    });
    window.scrollTo(0, 0);
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>