const invoiceToken = async (req, res, next) => {
    try {
        const records = await req.mongoConnection.collection('check_in').find().sort({ invoice_id: -1 }).limit(1).toArray();
        records.length > 0 ? req.invoiceToken = records[0].invoice_id + 1 : req.invoiceToken = 1;
        next();
    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: 'Internal Server Error'
        });
    }

}
module.exports = { invoiceToken };