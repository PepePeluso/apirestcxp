const {Router} = require("express")
const { getCXP, getCabeceraPago, getCabeceraPagoById, getDetallePagoById,
    postCreateCabeceraPago, postCreateDetallePago, putUpdateCabeceraPago, 
    putUpdateDetallePago, deleteCabeceraPago, deleteDetallePago,
    getFuentePago, getFuentePagoById, getTipoPago, postCreateFuentePago,
    putUpdateFuentePago, deleteFuentePago, getCXPByProvDNI} = require("../controllers/cxp_controllers")

const router = Router()

router.get("/", (req,res) => {res.send("Welcome API Rest CXP!!!!")})
router.get("/cxp", getCXP)
router.get("/cxp/:prov_dni",getCXPByProvDNI)
router.get("/cxp/cabecera/",getCabeceraPago)
router.post("/cxp/cabecera/",postCreateCabeceraPago)
router.put("/cxp/cabecera/",putUpdateCabeceraPago)
router.delete("/cxp/cabecera/",deleteCabeceraPago)
router.get("/cxp/cabecera/:idcabecera",getCabeceraPagoById)
router.get("/cxp/detalle/:idcabecera",getDetallePagoById)
router.post("/cxp/detalle/",postCreateDetallePago)
router.put("/cxp/detalle/",putUpdateDetallePago)
router.delete("/cxp/detalle/",deleteDetallePago)
router.get("/cxp/fuentepago/",getFuentePago)
router.post("/cxp/fuentepago/",postCreateFuentePago)
router.put("/cxp/fuentepago/",putUpdateFuentePago)
router.delete("/cxp/fuentepago",deleteFuentePago)
router.get("/cxp/fuentepago/:idfuente",getFuentePagoById)
router.get("/cxp/tipopago/",getTipoPago)


module.exports = router