// Helper function used to get the value of a writable store in ts files
export function getStore(store) {
	let $val;
	store.subscribe(($) => ($val = $))();
	return $val;
}
