const {db} = require("../cnn")

const getCXP = async (req,res) => {
    try {
        const cabecerapago = await db.query('SELECT idcabecera, descripcionpago, prov_dni, idfuente,\
        fechapago FROM cabecerapago where cp_active=true order by idcabecera;')
        for (let i = 0; i < cabecerapago.length; i++) {
            let detalle = await db.query("SELECT * FROM detallepago WHERE idcabecera = $1;",
                [cabecerapago[i].idcabecera])
            cabecerapago[i].detalle = detalle
        }
        res.json(cabecerapago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getCXPByProvDNI = async (req,res) => {
    const prov_dni = req.params.prov_dni
    try {
        const cabecerapago = await db.query('SELECT idcabecera, descripcionpago, prov_dni, idfuente,\
        fechapago FROM cabecerapago where cp_active=true and prov_dni=$1 order by idcabecera;',
        [prov_dni])
        for (let i = 0; i < cabecerapago.length; i++) {
            let detalle = await db.query("SELECT * FROM detallepago WHERE idcabecera = $1;",
                [cabecerapago[i].idcabecera])
            cabecerapago[i].detalle = detalle
        }
        res.json(cabecerapago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getDetallePagoById = async (req, res)=>{
    const idcabecera = req.params.idcabecera
    try {
        const response = await db.query(`select * from detallepago where idcabecera = $1`,
            [idcabecera])
        res.json(response)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getCabeceraPago = async (req, res) => {
    try {
        const cabecerapago = await db.query('SELECT * from cabecerapago where cp_active=true\
        order by idcabecera;')
        res.json(cabecerapago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getCabeceraPagoById = async (req, res) => {
    const idcabecera = req.params.idcabecera
    try {
        const cabecerapago = await db.one('SELECT * from cabecerapago where idcabecera = $1;',
            [idcabecera])
        res.json(cabecerapago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getFuentePago = async (req,res) => {
    try {
        const fuentePago = await db.query("SELECT f.idfuente, t.nombrepago, f.descripcionpago,\
        f.cuentabancaria, f.estado FROM fuentepago f, tipopago t where f.idpago = t.idpago order \
        by f.idfuente;")
        res.json(fuentePago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getFuentePagoById = async (req,res) => {
    const idfuente = req.params.idfuente
    try {
        const fuentePago = await db.one("SELECT f.idfuente, t.nombrepago, f.descripcionpago,\
        f.cuentabancaria, f.estado FROM fuentepago f, tipopago t where f.idpago = t.idpago and\
        f.idfuente = $1;",[idfuente])
        res.json(fuentePago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const getTipoPago = async (req,res) => {
    try {
        const tipopago = await db.query("SELECT * from tipopago;")
        res.json(tipopago)
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const postCreateCabeceraPago = async (req, res) => {
    const {descripcionpago, prov_dni, idfuente, fechapago} = req.query
    const sql = "INSERT INTO cabecerapago(descripcionpago, prov_dni, idfuente, fechapago, cp_active)\
        VALUES ($1,$2,$3,$4,true) returning *;"
    const values = [descripcionpago, prov_dni, idfuente, fechapago]
    try {
        const body = await db.one(sql, values)
        res.json({
            message: "CabeceraPago creada con éxito",
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const postCreateDetallePago = async (req, res) => {
    const {id_factura, valorapagar, abono, saldo, idcabecera} = req.query
    try {
        const body = await db.one(`insert into detallepago(id_factura, valorapagar, abono,
            saldo, idcabecera) VALUES($1,$2,$3,$4,$5) returning *;`
            , [id_factura, valorapagar, abono, saldo, idcabecera])
        res.json({
            message: 'Detalle pago creado con exito',
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const postCreateFuentePago = async (req,res) => {
    const { idpago, descripcionpago, cuentabancaria, estado } = req.query
    try {
        const body = await db.one("INSERT INTO fuentepago(idpago, descripcionpago, cuentabancaria,\
            estado) VALUES ($1, $2, $3, $4) returning *;",
            [idpago, descripcionpago, cuentabancaria, estado])
        res.json({
            message: "Fuente Pago actualizada con éxito",
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const putUpdateCabeceraPago = async (req, res) => {
    const {idcabecera, descripcionpago, prov_dni, idfuente, fechapago} = req.query
    try {
        const body = await db.one("UPDATE cabecerapago SET descripcionpago=$2, prov_dni=$3,\
        idfuente=$4, fechapago=$5 WHERE idcabecera=$1 returning *;", [idcabecera,
            descripcionpago, prov_dni, idfuente, fechapago])
        res.json({
            message: "Cabecera Pago actualizada con éxito",
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const putUpdateDetallePago = async (req, res) => {
    const { id_detalle, id_factura, valorapagar, abono, saldo, idcabecera } = req.query
    try {
        const body = await db.one('UPDATE  public.detallepago SET id_factura=$2 ,\
        valorapagar=$3 , abono=$4, saldo=$5, idcabecera=$6 where id_detalle=$1 returning *;',
            [id_detalle, id_factura, valorapagar, abono, saldo, idcabecera])
        res.json({
            message: 'Detalle-Pago actualizado con exito',
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const putUpdateFuentePago = async (req,res) => {
    const {idfuente,idpago, descripcionpago, cuentabancaria, estado} = req.query
    try {
        const body = await db.one("UPDATE fuentepago SET idpago=$2, descripcionpago=$3,\
        cuentabancaria=$4, estado=$5 WHERE idfuente=$1 returning *;",
            [idfuente,idpago, descripcionpago,cuentabancaria, estado])
        res.json({
            message: 'Fuente Pago actualizada con exito',
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const deleteCabeceraPago = async (req, res) => {
    const { idcabecera } = req.query
    try {
        const body = await db.one("UPDATE cabecerapago SET cp_active=false where idcabecera=\
        $1 returning *;",
            [idcabecera])
        res.json({
            message: "Cabecera Pago eliminada con éxito",
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const deleteDetallePago = async (req, res) => {
    const { id_detalle } = req.query
    try {
        const body = await db.query('delete from detallepago where id_detalle=$1 returning\
        *;', [id_detalle])
        res.json({
            message: 'Detalle-pago eliminado con exito',
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

const deleteFuentePago = async (req, res) => {
    const {idfuente} = req.query
    try {
        const body = await db.query("DELETE FROM fuentepago WHERE idfuente=$1 returning *;", 
        [idfuente])
        res.json({
            message: 'Fuente pago eliminada con exito',
            body
        })
    } catch (e) {
        res.json({
            code: e.code,
            message: e.message
        })
    }
}

module.exports = {
    getCXP,
    getCabeceraPago,
    getDetallePagoById,
    getCabeceraPagoById,
    postCreateCabeceraPago,
    postCreateDetallePago,
    putUpdateCabeceraPago,
    putUpdateDetallePago,
    deleteCabeceraPago,
    deleteDetallePago,
    getFuentePago,
    getFuentePagoById,
    getTipoPago,
    postCreateFuentePago,
    putUpdateFuentePago,
    deleteFuentePago,
    getCXPByProvDNI
}