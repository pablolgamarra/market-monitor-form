import { InformacionMercado } from '../types';
import generateUUID from './generateUUID';

export default function generateBatchString(
	postUrl: string,
	data: InformacionMercado[],
): { batchBody: string; batchID: string } {
	const batchID: string = generateUUID();
	const batchBodyParts: string[] = [];
	const changeSetID: string = generateUUID();

	batchBodyParts.push(`--batch_${batchID}`);
	batchBodyParts.push(
		`Content-type: multipart/mixed; boundary=changeset_${changeSetID}`,
	);
	batchBodyParts.push(``);

	data.map((value: InformacionMercado) => {
		batchBodyParts.push(`--changeset_${changeSetID}`);
		batchBodyParts.push(`Content-type: application/http`);
		batchBodyParts.push(`Content-Transfer-Encoding: binary`);
		batchBodyParts.push(``);
		batchBodyParts.push(`POST ${postUrl} HTTP/1.1`);
		batchBodyParts.push(`Content-type: application/json`);
		batchBodyParts.push(``);
		batchBodyParts.push(
			`${JSON.stringify({
				ClienteId: value.idCliente,
				VolumenYaComprado: value.volumenComprado,
				Familia_x0020_de_x0020_ProductoId: value.idFamilia,
				Proveedor_x0020_PrincipalId: value.idProveedorPrincipal,
				Precio: value.precioPorMedida,
				Condici_x00f3_nPago: value.condicionPago,
				Periodo_x0020_de_x0020_CultivoId: value.idPeriodoCultivo,
			})}`,
		);
		batchBodyParts.push(``);
	});

	batchBodyParts.push(`--changeset_${changeSetID}--`);
	batchBodyParts.push(`--batch_${batchID}--`);

	const batchBody = batchBodyParts.join('\r\n');

	return { batchBody: batchBody, batchID: batchID };
}
