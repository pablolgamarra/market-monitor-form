import { ISPHttpClientOptions, SPHttpClient } from '@microsoft/sp-http-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { InformacionMercado } from '@/types';
import generateBatchString from '@/services/generateBatchString';

export const saveInformacionesMercado = async (
	context: WebPartContext,
	data: InformacionMercado[],
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/$batch`;

	const { batchBody, batchID } = generateBatchString(
		`${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Informacion%20Mercado')/items`,
		data,
	);

	const request: ISPHttpClientOptions = {
		headers: {
			'Content-Type': `multipart/mixed; boundary="batch_${batchID}"`,
		},
		body: batchBody,
	};

	console.debug(request);

	try {
		const data = await context.spHttpClient.post(
			url,
			SPHttpClient.configurations.v1,
			request,
		);
		if (data.status === 200) {
			console.log(data.ok);
			return true;
		} else {
			console.log(data);
			throw Error(`${data.statusText}`);
		}
	} catch (e) {
		console.error(`Error al insertar informacion de mercado ${e}`);
		return false;
	}
};
