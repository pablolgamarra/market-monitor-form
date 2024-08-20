import { ISPHttpClientOptions, SPHttpClient } from '@microsoft/sp-http-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { InformacionMercado } from '../types';
import generateBatchString from './generateBatchString';

export const saveInformacionesMercado = async (
	context: WebPartContext,
	data: InformacionMercado[],
) => {
	const url = `${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/$batch`;

	const { batchBody, batchID } = generateBatchString(
		`${context.pageContext.web.absoluteUrl}/Apps/monitoreo-mercado/_api/web/lists/getByTitle('Informacion%20Mercado')/items`,
		data,
	);

	const request: ISPHttpClientOptions = {
		headers: {
			'Content-Type': `Multipart/mixed;boundary="${batchID}"`,
			Accept: 'application/json',
		},
		body: batchBody,
	};

	context.spHttpClient.post(url, SPHttpClient.configurations.v1, request)
    .then((data)=>{
        return data.ok
    })
    .catch((e)=>{
        console.error(`Error al insertar informacion de mercado ${e}`)
    })
};
