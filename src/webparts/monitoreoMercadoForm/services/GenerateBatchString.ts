import { InformacionMercado } from '../types';
import generateUUID from './generateUUID';

export default function generateBatchString(
	postUrl: string,
	data: InformacionMercado[],
): { batchBody: string; batchID: string } {
	const batchID = generateUUID();
	const changeID = generateUUID();

	const batchBody: string = `
    --batch_${batchID}
    Content-Type: multipart/mixed; boundary=changeset_${changeID}

    ${data.map(
		(item: InformacionMercado) =>
			`--changeset_${changeID}
			Content-Type: application/http
			Content-Transfer-Encoding: binary

			POST ${postUrl} HTTP/1.1
			Content-Type: application/json

					${JSON.stringify({
						ClienteId: item.idCliente,
						VolumenYaComprado: item.volumenComprado,
						Familia_x0020_de_x0020_ProductoId: item.idFamilia,
						Proveedor_x0020_PrincipalId: item.idProveedorPrincipal,
						Precio: item.precioPorMedida,
						Condici_x00f3_nPago: item.condicionPago,
						Periodo_x0020_de_x0020_CultivoId: item.idPeriodoCultivo,
					})}
			
			--changeset_${changeID}--`
	).join("")}
    
    --batch_${batchID}--
    `;
	console.log(batchBody)

	return { batchBody: batchBody, batchID: batchID };
}
