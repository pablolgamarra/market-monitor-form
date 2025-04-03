import { useForm } from './context/FormContext';

interface PageProps {
	nextStep: () => void;
	prevStep: () => void;
}

const MonitorFormProducts = ({ nextStep, prevStep }: PageProps) => {
	const { formData, updateFormData } = useForm();

	const addProduct = () => {
		updateFormData({
			informacionCompras: [
				...formData.informacionCompras,
				{ familiaProducto: '', volumenComprado: '', proveedorPrincipal: '' },
			],
		});
	};

	return (
		<div>
			<h2 className='text-lg font-bold'>Información por Familia de Producto</h2>
			{formData.informacionCompras.map((producto, index) => (
				<div
					key={index}
					className='mb-4'
				>
					<input
						type='text'
						placeholder='Familia Producto'
						value={producto.familiaProducto}
						onChange={(e) => {
							const updated = [...formData.informacionCompras];
							updated[index].familiaProducto = e.target.value;
							updateFormData({ informacionCompras: updated });
						}}
						className='w-full p-2 border rounded'
					/>
				</div>
			))}
			<button
				onClick={addProduct}
				className='px-4 py-2 bg-green-500 text-white rounded'
			>
				Agregar Producto
			</button>
			<button
				onClick={prevStep}
				className='mr-2 px-4 py-2 bg-gray-400 text-white rounded'
			>
				Atrás
			</button>
			<button
				onClick={nextStep}
				className='px-4 py-2 bg-blue-500 text-white rounded'
			>
				Siguiente
			</button>
		</div>
	);
};

export default MonitorFormProducts;
