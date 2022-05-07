// Helper function used to get the value of a writable store
export function getStore(store) {
	let $val;
	store.subscribe(($) => ($val = $))();
	return $val;
}
