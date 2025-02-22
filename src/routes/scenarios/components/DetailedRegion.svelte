<script>
	import { getContext } from 'svelte';
	import Switch from '$lib/components/Switch.svelte';

	import ScenarioDescription from './ScenarioDescription.svelte';
	import MiniCharts from './MiniCharts.svelte';

	/** @type {Object.<string, *>} */
	const dataVizStores = {
		energyDataVizStore: getContext('energy-data-viz'),
		emissionsDataVizStore: getContext('emissions-data-viz'),
		capacityDataVizStore: getContext('capacity-data-viz'),
		intensityDataVizStore: getContext('intensity-data-viz')
	};

	let selectedStoreName = 'energyDataVizStore';

	const stores = [
		{ value: 'energyDataVizStore', label: 'Generation' },
		{ value: 'emissionsDataVizStore', label: 'Emissions' },
		{ value: 'capacityDataVizStore', label: 'Capacity' }
	];

	$: isEmissionsView = selectedStoreName === 'emissionsDataVizStore';

	$: selectedStore = dataVizStores[selectedStoreName];
	$: seriesNames = selectedStore.seriesNames;
	$: seriesLabels = selectedStore.seriesLabels;
	$: seriesColours = selectedStore.seriesColours;
	$: xTicks = selectedStore.miniXTicks;
	$: formatTickX = selectedStore.formatTickX;
	$: formatTickY = selectedStore.convertAndFormatValue;
	$: chartOverlay = selectedStore.chartOverlay;
	$: chartOverlayLine = selectedStore.chartOverlayLine;
	$: chartOverlayHatchStroke = selectedStore.chartOverlayHatchStroke;
	$: hoverData = selectedStore.hoverData;
	$: focusData = selectedStore.focusData;
	$: seriesData = selectedStore.seriesData;
	$: displayUnit = selectedStore.displayUnit;

	$: intensityStore = dataVizStores.intensityDataVizStore;
	$: intensitySeriesNames = intensityStore.seriesNames;
	$: intensityFormatTickY = intensityStore.convertAndFormatValue;
	$: intensitySeriesLabels = intensityStore.seriesLabels;
	$: intensitySeriesColours = intensityStore.seriesColours;
	$: intensityHoverData = intensityStore.hoverData;
	$: intensityFocusData = intensityStore.focusData;
	$: intensitySeriesData = intensityStore.seriesData;
	$: intensityDisplayUnit = intensityStore.displayUnit;
</script>

<div class="px-10 md:px-0">
	<ScenarioDescription />
</div>

<section>
	<div class="flex justify-center mb-12">
		<Switch
			buttons={stores}
			selected={selectedStoreName}
			on:change={(evt) => (selectedStoreName = evt.detail.value)}
			class="justify-center"
		/>
	</div>

	{#if isEmissionsView}
		<div class="grid grid-cols-2 gap-3">
			<MiniCharts
				seriesNames={[...$seriesNames].reverse()}
				seriesLabels={$seriesLabels}
				seriesColours={$seriesColours}
				xTicks={$xTicks}
				formatTickX={$formatTickX}
				formatTickY={$formatTickY}
				chartOverlay={$chartOverlay}
				chartOverlayLine={$chartOverlayLine}
				chartOverlayHatchStroke={$chartOverlayHatchStroke}
				hoverData={$hoverData}
				focusData={$focusData}
				seriesData={$seriesData}
				displayUnit={$displayUnit}
				gridColClass="grid-cols-1"
				on:mousemove
				on:mouseout
				on:pointerup
			/>
			<MiniCharts
				seriesNames={[...$seriesNames].reverse()}
				seriesLabels={$intensitySeriesLabels}
				seriesColours={$intensitySeriesColours}
				xTicks={$xTicks}
				formatTickX={$formatTickX}
				formatTickY={$intensityFormatTickY}
				chartOverlay={$chartOverlay}
				chartOverlayLine={$chartOverlayLine}
				chartOverlayHatchStroke={$chartOverlayHatchStroke}
				hoverData={$intensityHoverData}
				focusData={$intensityFocusData}
				seriesData={$intensitySeriesData}
				displayUnit={$intensityDisplayUnit}
				showArea={false}
				gridColClass="grid-cols-1"
				on:mousemove
				on:mouseout
				on:pointerup
			/>
		</div>
	{:else}
		<MiniCharts
			seriesNames={[...$seriesNames].reverse()}
			seriesLabels={$seriesLabels}
			seriesColours={$seriesColours}
			xTicks={$xTicks}
			formatTickX={$formatTickX}
			formatTickY={$formatTickY}
			chartOverlay={$chartOverlay}
			chartOverlayLine={$chartOverlayLine}
			chartOverlayHatchStroke={$chartOverlayHatchStroke}
			hoverData={$hoverData}
			focusData={$focusData}
			seriesData={$seriesData}
			displayUnit={$displayUnit}
			on:mousemove
			on:mouseout
			on:pointerup
		/>
	{/if}
</section>
