const updateField = (key: keyof typeof formData, value: any) => {
	setFormData((prev) => ({
		...prev,
		[key]: value,
	}));
};

// Actualiza un producto en productFamilyInformation
const updateProductInfo = (index: number, value: Partial<(typeof formData.productFamilyInformation)[0]>) => {
	setFormData((prev) => {
		const updated = [...prev.productFamilyInformation];
		updated[index] = { ...updated[index], ...value };
		return { ...prev, productFamilyInformation: updated };
	});
};

// Cuando se selecciona el periodo
const handleSelectPeriod = (period: string) => {
	updateField('agroPeriod', period);

	// Simula carga de familias según periodo
	const familias = getFamiliasByPeriodo(period); // Implementa esta función
	const newProductInfo = familias.map((familia: ProductFamily) => ({
		productFamily: familia,
		mainSupplier: undefined,
		buyedVolume: undefined,
	}));
	updateField('productFamilyInformation', newProductInfo);
	nextStep(); // Avanza automáticamente
};
