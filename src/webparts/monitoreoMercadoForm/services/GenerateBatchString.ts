import {
	Cliente,
	CNG,
	FamiliaProducto,
	InformacionMercado,
	Proveedor,
} from '@/types';

import generateUUID from './generateUUID';

const jsonClientes = (data: Cliente): string => {
	const jsonString = `${JSON.stringify({
		Title: data.Nombre,
		Codigo_x0020_SAP: data.CodigoSAP,
		UnidadId: data.Unidad?.Id,
		Codigo_x0020_SAP_x0020_CNGId: data.CNG?.Id,
		A_x00f1_o: data.Anho,
	})}`;

	return jsonString;
};

const jsonCNGS = (data: CNG): string => {
	const jsonString = `${JSON.stringify({
		Title: data.CodigoSAP,
		NombreCNG: data.Nombre,
		Correo: data.Correo,
	})}`;

	return jsonString;
};

const jsonProveedores = (data: Proveedor): string => {
	const jsonString = `${JSON.stringify({
		Title: data.Nombre,
		Familia_x0020_de_x0020_ProductoId: data.FamiliadeProducto?.Id,
	})}`;

	return jsonString;
};

const jsonFamiliasProducto = (data: FamiliaProducto): string => {
	const jsonString = `${JSON.stringify({
		Title: data.Nombre,
		UnidaddeMedida: data.UnidadMedida,
		PeriododeCultivoId: data.PeriodoCultivo?.Id,
		Activo: data.Estado,
	})}`;

	return jsonString;
};

const jsonInformacionesMercado = (data: InformacionMercado): string => {
	const jsonString = `${JSON.stringify({
		ClienteId: data.idCliente,
		VolumenYaComprado: data.volumenComprado,
		Familia_x0020_de_x0020_ProductoId: data.idFamilia,
		Proveedor_x0020_PrincipalId: data.idProveedorPrincipal,
		Precio: data.precioPorMedida,
		Condici_x00f3_nPago: data.condicionPago,
		Periodo_x0020_de_x0020_CultivoId: data.idPeriodoCultivo,
	})}`;

	return jsonString;
};

export default function generateBatchString(
	postUrl: string,
	data:
		| InformacionMercado[]
		| CNG[]
		| Cliente[]
		| Proveedor[]
		| FamiliaProducto[],
	type: string,
): { batchBody: string; batchID: string } {
	const batchID: string = generateUUID();
	const batchBodyParts: string[] = [];
	const changeSetID: string = generateUUID();

	let i = 0;
	try {
		batchBodyParts.push(`--batch_${batchID}`);
		batchBodyParts.push(
			`Content-type: multipart/mixed; boundary=changeset_${changeSetID}`,
		);
		batchBodyParts.push(``);

		data.map(
			(
				value:
					| InformacionMercado
					| CNG
					| Cliente
					| Proveedor
					| FamiliaProducto,
			) => {
				batchBodyParts.push(`--changeset_${changeSetID}`);
				batchBodyParts.push(`Content-type: application/http`);
				batchBodyParts.push(`Content-Transfer-Encoding: binary`);
				batchBodyParts.push(`Content-ID:${(i += 1)}`);
				batchBodyParts.push(``);
				batchBodyParts.push(`POST ${postUrl} HTTP/1.1`);
				batchBodyParts.push(`Content-type: application/json`);
				batchBodyParts.push(``);

				switch (type) {
					case 'Familias Productos':
						batchBodyParts.push(
							jsonFamiliasProducto(value as FamiliaProducto),
						);
						break;
					case 'CNG':
						batchBodyParts.push(jsonCNGS(value as CNG));
						break;
					case 'Proveedores':
						batchBodyParts.push(
							jsonProveedores(value as Proveedor),
						);
						break;
					case 'Clientes':
						batchBodyParts.push(jsonClientes(value as Cliente));
						break;
					case 'Informaciones Mercado':
						batchBodyParts.push(
							jsonInformacionesMercado(
								value as InformacionMercado,
							),
						);
						break;
					default:
						throw Error('Tipo de contenido no encontrado');
				}

				batchBodyParts.push(``);
			},
		);

		batchBodyParts.push(`--changeset_${changeSetID}--`);
		batchBodyParts.push(`--batch_${batchID}--`);

		const batchBody = batchBodyParts.join('\r\n');

		return { batchBody: batchBody, batchID: batchID };
	} catch (e) {
		console.log(`Error generando Batch String de ${type} - ${e}`);
		return { batchBody: '', batchID: '' };
	}
}
