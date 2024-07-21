<script lang="ts">
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { readable, writable } from 'svelte/store';
	import { Root, Row, Cell, Head, Header, Body } from '$lib/components/ui/table';
	import DataTableActions from '../dashboard/data-table/data-table-actions.svelte';
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
	type Link = {
		short_id: string;
		redirect_url: string;
		visitors: number;
		created_at: string;
		expiration_date: string;
		redirects_left: number;
	};
	export let data;
	const linkStore = writable(data);
	//$: linkStore.update((ln) => [data[data.length - 1]]);
	export let chosenLink;
	const table = createTable(linkStore, {
		page: addPagination({ initialPageSize: 5 }),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns()
	});
	const columns = table.createColumns([
		table.column({
			accessor: 'short_id',
			header: 'Link',
			cell: ({ value }) => {
				return `${import.meta.env.VITE_LINK_HOST}/${value}`;
			}
		}),
		table.column({
			accessor: 'redirect_url',
			header: 'Original link'
		}),
		table.column({
			accessor: 'visitors',
			header: 'Visits',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'expiration_date',
			header: 'Expires at',
			cell: ({ value }) => {
				return df.format(new Date(value));
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'redirects_left',
			header: 'Visits left',
			cell: (cell) => {
				if (cell.value === -1) {
					if (cell.row.original.redirects_limit === -1) return `unlimited`;
					return 0;
				} else {
					return cell.value;
				}
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'options',
			header: '',
			cell: (cell) => {
				return createRender(DataTableActions, {
					link: cell.row.original,
					editFunc: () => {
						chosenLink = { link: cell.row.original, action: 'edit' };
					},
					deleteFunc: () => {
						chosenLink = { link: cell.row.original, action: 'delete' };
					}
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);
	const hidableCols = ['visitors', 'expiration_date', 'redirects_left'];
</script>

<div>
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Filter links..." type="text" bind:value={$filterValue} />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hidableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border">
		<Root {...$tableAttrs}>
			<Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Head {...attrs}>
										{#if cell.id === 'options'}
											<Render of={cell.render()} />
										{:else}
											<Button
												variant="ghost"
												size="ghost"
												class="text-base"
												on:click={props.sort.toggle}
											>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-1 h-4 w-4'} />
											</Button>
										{/if}
									</Head>
								</Subscribe>
							{/each}
						</Row>
					</Subscribe>
				{/each}
			</Header>
			<Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Cell {...attrs}>
										<Render of={cell.render()} />
									</Cell>
								</Subscribe>
							{/each}
						</Row>
					</Subscribe>
				{/each}
			</Body>
		</Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="secondary-custom"
			size="standard"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="primary-custom"
			size="standard"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
