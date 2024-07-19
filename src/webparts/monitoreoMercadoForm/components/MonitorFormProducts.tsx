import * as React from "react";

import { Input, Combobox, Option, Title2, Button, Text, Body2, makeStyles, Field } from "@fluentui/react-components";
import {
	ArrowLeftFilled,
	ArrowRightFilled,
	SaveRegular,
} from '@fluentui/react-icons';

import { IFamiliaProducto } from "./interfaces/IFamiliaProducto";
import { IProveedor } from "./interfaces/IProveedor";
import { IPeriodoCultivo } from "./interfaces/IPeriodoCultivo";


export interface IMonitorFormProductsProps{
  listaFamiliasProducto:IFamiliaProducto[],
  listaProveedores:IProveedor[],
  periodoCultivo:IPeriodoCultivo|undefined,
}

interface IProductValueState{
  familiaProducto:IFamiliaProducto|undefined,
  volumenComprado:string|undefined,
  precioPorMedida:number|undefined,
  condicionPago:string|undefined,
  proveedorPrincipal:IProveedor|undefined,
}

interface IMonitorFormProductsState{
  valoresFormProducts:(IProductValueState|undefined)[],
}

const useStyles = makeStyles({
	NavegacionContainer: {
		display: 'flex',
		width: '100%',
		height: 'auto',
	},
	BotonesContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	Boton: {
		minWidth: '180px',
	},
	BotonRetroceso: {
		minWidth: '180px',
		marginRight: 'auto',
	},
});

const MonitorFormProducts:React.FC<IMonitorFormProductsProps> = (props) =>{
  const {listaFamiliasProducto, listaProveedores, periodoCultivo} = props
  const volumen:number[] = [...Array(11).keys()].map((value:number) => value * 10)
// [
//   estadoUnProducto:IProductValueState,
//   estadoUnProducto:IProductValueState
//   estadoUnProducto:IProductValueState
//   estadoUnProducto:IProductValueState
//   estadoUnProducto:IProductValueState
// ]


  //Component Style
  const styles = useStyles()

  const [productValues, setProductValues] = React.useState<IMonitorFormProductsState>({} as IMonitorFormProductsState)
  const [index, setIndex] = React.useState<number>(0);
  const listaProductosFiltro:IFamiliaProducto[] = listaFamiliasProducto.filter((item:IFamiliaProducto) => item.PeriodoCultivo?.Id === periodoCultivo?.Id)

  const largoLista = listaProductosFiltro.length
  
  const handleBtnRetrocesoClick = React.useCallback(() =>{
    const indexNuevo = index-1 > -1 ? index-1 : index
    setIndex(indexNuevo)
    
    // let objAux:IProductValueState = {} as IProductValueState

    // objAux = productValues.valoresFormProducts[indexNuevo]

    // setProductValues({
    //   ...productValues, 
    //   valoresFormProducts: [...productValues.valoresFormProducts]
    // })

  },
    [setIndex]
  )

  const handleBtnAvanzarClick = React.useCallback(()=>{
    const indexNuevo = index+1 < largoLista ? index+1 : index
    setIndex(indexNuevo)
    
      let objAux:IProductValueState|undefined = {} as IProductValueState

      objAux = productValues.valoresFormProducts[indexNuevo]

      setProductValues({
        ...productValues, 
        valoresFormProducts: [objAux]
      })
  },
    [setIndex]
  )

  // const btnPasarClick = (): void => {
  //   if (index < largoLista - 1) {
  //     const indexNuevo = index + 1;
  //     const familiaNueva = actualizarFamilia(indexNuevo);
  //     setFamiliaActiva(familiaNueva);
  //     setValoresForm(prevValores => {
  //       const nuevosValores = [...prevValores];
  //       nuevosValores[index] = { ...nuevosValores[index], idFamiliaProducto: familiaActiva.Id };
  //       return nuevosValores;
  //     });
  //     setIndex(indexNuevo);
  //   } else {
  //     const listaValoresProductos = actualizarValores(valoresForm);

  //     const dataGuardar:DatosValores[] = listaValoresProductos.map(
  //       (valoresProducto: FamiliasValores)  => ({
  //         idCliente: cliente,
  //         idUnidad: unidad,
  //         idFamilia: valoresProducto.idFamiliaProducto,
  //         volumenComprado: valoresProducto.volumenComprado,
  //         precio: valoresProducto.precio,
  //         condicionPago: valoresProducto.condicionPago,
  //         proveedorPrincipal: valoresProducto.proveedorPrincipal,
  //   }));
  //     dataGuardar.map((data:DatosValores)=>{
  //       onSave(data);
  //       reset();
  //     })
  //   }
  // };


  console.log(productValues.valoresFormProducts[index] || '')

  return(
    <section>
      <Title2>
        {listaProductosFiltro[index].Nombre}
      </Title2>
        <form>
          <Field
            label={'Volumen Ya Comprado'}
            required
          >
            <Combobox
              placeholder={`Seleccione volumen ya comprado`}
              value={productValues?.valoresFormProducts[index]?.volumenComprado || ''}
            >
              {
                volumen.map((item:number) => (
                  <Option value={`${item}%`} key={item}>
                    {`${item}%`}
                  </Option>
                ))
              }
            </Combobox>
          </Field>
          <Field
            label={`Precio por ${listaProductosFiltro[index].UnidadMedida}`}
            required
          >
              <Input 
                placeholder={`Seleccionar precio por ${listaProductosFiltro[index].UnidadMedida}`}
                value={productValues?.valoresFormProducts[index]?.precioPorMedida?.toString() || ''}
              />
          </Field>
          <Field
            label={`Condición de Pago`}
            required
          >
            <Combobox
            placeholder={'Seleccione condicion de pago'}
            value={productValues?.valoresFormProducts[index]?.condicionPago || ''}
            >
              <Option>Crédito</Option>
              <Option>Contado</Option>
            </Combobox>
          </Field>
          <Field
            label={`Proveedor Principal`}
            required
          >
            <Combobox
              placeholder="Seleccione Proveedor Principal"
              value={productValues?.valoresFormProducts[index]?.proveedorPrincipal?.Nombre || ''}
            >
              {listaProveedores.map((item:IProveedor) => (
                <Option key={item.Id} text='Opcion' value={item.Id?.toString()}>
                  {item.Nombre}
                </Option>
              ))}
            </Combobox>
          </Field>
        </form>
      <div className={`${styles.BotonesContainer}`}>
				{index > 0 && (
					<Button
						className={styles.BotonRetroceso + '' + styles.Boton}
						onClick={handleBtnRetrocesoClick}
						appearance='secondary'
						shape='rounded'
						icon={<ArrowLeftFilled />}
						iconPosition='before'
					>
						<Text size={400} weight={'semibold'}>Página Anterior</Text>
					</Button>
				)}
				<Body2>
					{index + 1} de {largoLista}
				</Body2>
			</div>
			<div className={`${styles.BotonesContainer}`}>
				<Button
					className={`${styles.Boton}`}
					onClick={handleBtnAvanzarClick}
					appearance='primary'
					shape='rounded'
					icon={
						index + 1 === largoLista ? (
							<SaveRegular />
						) : (
							<ArrowRightFilled />
						)
					}
					iconPosition='after'
				>
					<Text size={400} weight={'semibold'}>
						{index + 1 === largoLista ? 'Guardar' : 'Siguiente Página'}
					</Text>
				</Button>
			</div>
    </section>
  )
}

export default MonitorFormProducts