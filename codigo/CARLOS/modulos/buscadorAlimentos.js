const xlsx = require('xlsx');
const file = './Taco-4a-Edicao.xlsx';
const express = require('express')
const app = express ()
const port = 2000
const _=require('lodash');

app.get('/', (req, res) => {
    res.send("Hello word")
})

app.listen(port, () => {
        console.log('app lsitening on port ${port}')
})