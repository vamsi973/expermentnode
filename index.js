const express = require('express')

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is listening on ${server.address().address}:${server.address().port}`);
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})



const dbMiddleWare = require('./middlewares/mongodb');
var bodyParser = require('body-parser');
var cors = require('cors');
var requestLog = require('url-request-log');
var { tokenValidator } = require('./middlewares/tokenValidator')
app.use(express.json());
const asyncBusboy = require("async-busboy");
var busboy = require('connect-busboy');
app.use(express.urlencoded({
    extended: true,
    sizeLimit: '50mb'
}));
// app.use(express.bodyParser())
app.use(busboy());
const fs = require('fs');
var XLSX = require('xlsx')
var wb = XLSX.readFile('./uploads/hotel.xlsx');
// console.log(wb,63);
let ss = JSON.stringify(wb);
// fs.writeFileSync('./uploads/test.txt', ss, (err, data) => {
//     if (err) { }
//     console.log("done")
// })

// console.log("excel name", wb.SheetNames);
// console.log("sheet names", wb.Sheets);
// console.log("excel LastAuthor name", wb.Props['LastAuthor']);
// console.log("excel Author name", wb.Props['Author']);
// console.log("excel CreatedDate name", wb.Props['CreatedDate']);
// console.log("excel ModifiedDate name", wb.Props['ModifiedDate']);
// console.log("excel total available worksheet count", wb.Props['Worksheets']);
var i = wb.SheetNames.length;
while (i--) {
    const sheetname = wb.SheetNames[i];
    arrayName = sheetname.toString();
    let z = XLSX.utils.sheet_to_json(wb.Sheets['OCT']);
    insertData(z);

}
// var excel = require("exceljs");
// var workbook1 = new excel.Workbook();
// workbook1.creator = 'Me';
// workbook1.lastModifiedBy = 'Me';
// workbook1.created = new Date();
// workbook1.modified = new Date(); 
// var sheet1 = workbook1.addWorksheet('Sheet1');
// var reHeader = ['name', 'active'];
// var reColumns = [
//     { header: 'name', key: 'firstname' },
//     { header: 'active', key: 'lastname' },

// ];
// sheet1.columns = reColumns;
// sheet1.columns = ["av", "bv"]

app.use(cors());

app.use(requestLog.log());
var db;
async () => {
    db = await dbConnect();
    console.log(db)
}
async function dbConnect() {
    return new Promise(async (resolve, reject) => {
        dbMiddleWare().then(database => {
            db = database;
            resolve(db)
        }).catch(err => {
            // console.log(err, 20)
        })
    })
}
// mongo connection creation

dbMiddleWare().then(database => {
    db = database;
}).catch(err => {
    // console.log(err, 20)
})
app.use((req, res, next) => {
    // Adding the connection to the request object
    if (!db) {
        // console.log('im in middleware!')
        dbMiddleWare().then(database => {
            db = database;
            req.mongoConnection = db;

            next();
        }).catch(err => {
            res.send({ success: false, error: 'Mongo Error!' })
            return;
        })
    }
    req.mongoConnection = db;
    next();
});



// Routes

const auth = require('./routes/auth');
const notes = require('./routes/notes');
const staff = require('./routes/staff');
const roomservice = require('./routes/rooms');
const department = require('./routes/department');
const budget = require('./routes/budget');
const hotel = require('./routes/hotel');
const upload = require('./routes/upload');
const client = require('./routes/client');
const { insertCheckIn } = require('./models/hotel.model');
const { colorScheme } = require('excel4node/distribution/lib/types');



var apiRoutes = express.Router();

app.use('/api', apiRoutes);



//routes  start

apiRoutes.use('/auth', auth)
apiRoutes.use('/hotel', tokenValidator.decodeToken, hotel)
apiRoutes.use('/upload', upload)
apiRoutes.use('/staff', tokenValidator.decodeToken, staff)
apiRoutes.use('/roomservice', tokenValidator.decodeToken, roomservice)
apiRoutes.use('/department', department)
apiRoutes.use('/client', tokenValidator.decodeToken, client)
apiRoutes.use('/notes', tokenValidator.decodeToken, notes)
apiRoutes.use('/budget', tokenValidator.decodeToken, budget)

function insertData(i) {
    // let db;
    // dbMiddleWare().then(database => {
    //     db = database;
    //     db.collection('user').insert(i)

    // }).catch(err => {
    //     // console.log(err, 20)
    // })

}
// Export the Express API
module.exports = app
