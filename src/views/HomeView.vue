<script lang="ts" setup>
import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LPopup, LTileLayer, LCircle} from "@vue-leaflet/vue-leaflet";
import axios, {scrapePromiseResData} from "@/services/axios";
import {onMounted, reactive, ref, watch} from "vue";
const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

type DataPoint = {
	lat: number,
	lon: number,
	timestamp: string,
	age_millis: number
};

const requestDataPoints = (start: Date, end: Date, every_nth: number) => {
	return scrapePromiseResData<DataPoint[]>(axios.get('/gps', {
		params: {
			start: start.toISOString(),
			end: end.toISOString(),
			every_nth
		}
	}));
};

const dataPoints: DataPoint[] = reactive([]);

const end = new Date();
const start = new Date;
start.setHours(end.getHours() - 6);

onMounted(()=>{
	requestDataPoints(start, end, 10).then(res=>{
		dataPoints.push(...res);
		const first = dataPoints[0];
		center.value = [first.lat, first.lon];
	}).catch((e) => {
		console.error(e);
	});
});

const center = reactive({value: [0, 0]});

type RGB = [number, number, number];

const pickHex = (color1: RGB, color2: RGB, weight: number): RGB => {
	// console.log(weight);
	const w1 = weight;
	const w2 = 1 - w1;
	const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
		Math.round(color1[1] * w1 + color2[1] * w2),
		Math.round(color1[2] * w1 + color2[2] * w2)] satisfies RGB;
	return rgb;
};

const date2UTC = (date: Date) => {
	return Date.UTC(date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCFullYear(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds());
};

const timePoint2Weight = (dateStart: Date, dateEnd: Date, dateCompare: Date) => {
	const startEndDiff = date2UTC(dateEnd) - date2UTC(dateStart);
	const startCompareDiff = date2UTC(dateCompare) - date2UTC(dateStart);
	// console.log(`${startEndDiff} / 100 * ${startCompareDiff} = ${( ( startEndDiff/100 ) * startCompareDiff)}`);
	return ( (100/startEndDiff) * startCompareDiff)/100;
};

const RGB2color = (color: RGB) => {
	return `rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`;
};

const zoom = ref(16);

watch(zoom, (nv)=>{
	console.log("Zoom", nv);
});

// console.log(zoom.value);

</script>

<template>
	<div
		style="width: 100vw; height: 100vh"
		class="pa-5"
	>
		<l-map
			id="leafletmap"
			:zoom="zoom"
			:max-zoom="20"
			:center="center.value"
			:options="{
				attributionControl: false
			}"
			class="elevation-3 rounded-xl"
		>
			<l-tile-layer
				:url="mapUrl"
				:max-zoom="20"
			/>
			<!--	eslint-disable vue/no-unused-vars-->
			<template
				v-for="dataPoint in dataPoints"
				:key="dataPoint.timestamp"
			>
				<l-circle
					:lat-lng="[dataPoint.lat, dataPoint.lon]"
					:radius="0"
					:color="RGB2color(
						pickHex(
							[0, 255, 0],
							[255, 0, 0],
							timePoint2Weight(start, end, new Date(dataPoint.timestamp))
						)
					)"
				>
					<l-popup
						class="w-auto"
						:options="{
							color: 'red'
						}"
					>
						{{ new Date(dataPoint.timestamp) }} :: {{ dataPoint.age_millis }}
					</l-popup>
				</l-circle>
			</template>
		</l-map>
	</div>
</template>
