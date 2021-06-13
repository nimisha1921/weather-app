
const axios = require('axios');
const express = require('express');
const router = express.Router();
router.use(express.json());

const apiKey = 'ad408f675f6f4f2096245515211206';
const weatherApi = axios.create({
    baseURL: 'http://api.weatherapi.com/v1/',
    headers: {
        key: apiKey
    }
});



router.use('/search', async function(req,res) {
    try {
        const response = await weatherApi.get("search.json", {
            params: {
                ...req.query
            }
        })
        res.status(200).json({
            success: true,
            data : response.data,
            message: 'done',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});



router.use('/currentWeather', async function(req,res) {
    try {
        const response = await weatherApi.get("current.json", {
            params: {
                ...req.query
            }
        })
        res.status(200).json({
            success: true,
            data : response.data,
            message: 'done',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;