import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import config from './../config';

const router = express.Router();
export default router;

// page, order은 query string으로 전달

router.get('/list/:kind', async (req, res) => {

});

router.get('/list/:kind/:category', async (req, res) => {

});

router.get('/:kind/:category', async (req, res) => {

});

router.post('/:kind/:category', async (req, res) => {

});

router.patch('/:kind/:category', async (req, res) => {

});

router.delete('/:kind/:category', async (req, res) => {

});
