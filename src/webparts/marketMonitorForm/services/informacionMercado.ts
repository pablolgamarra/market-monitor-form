//Types
import { InformacionMercado } from '@/types';
import { WebPartContext } from '@microsoft/sp-webpart-base';

//SPHTTP
import { ISPHttpClientOptions, SPHttpClient } from '@microsoft/sp-http-base';

//Services
import generateBatchString from '@/services/generateBatchString';

export const saveInformacionesMercado = async (
	context: WebPartContext,
	data: InformacionMercado[],
): Promise<boolean> => {
	const url = `${context.pageContext.web.absoluteUrl}/_api/$batch`;

	const { batchBody, batchID } = generateBatchString(
		`${context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Informacion%20Mercado')/items`,
		data,
		'Informaciones Mercado',
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
			return true;
		} else {
			throw Error(`${data.statusText}`);
		}
	} catch (e) {
		console.error(`Error al insertar informacion de mercado ${e}`);
		throw Error(`Error al insertar informacion de mercado`);
	}
};
