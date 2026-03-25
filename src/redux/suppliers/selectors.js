export const selectSuppliers = state => state.suppliers.suppliers;

export const selectSuppliersLoading = state => state.suppliers.isLoading;

export const selectSuppliersError = state => state.suppliers.isError;
