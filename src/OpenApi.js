import React, { useEffect, useState } from 'react';
import { Typography, Box } from "@material-ui/core";

const OpenApi = () => {
    const [temp, setTemp] = useState("상태");
    const [hum, setHum] = useState("상태");
    const [wsd, setWsd] = useState("상태");
    const [sky, setSky] = useState("상태");
    const [pop, setPop] = useState("상태");

    useEffect(() => {
        const now = new Date();

        const url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
        const serviceKey = process.env.REACT_APP_SERVICE_KEY;
        const pageNo = 1;
        const numOfRows = 100;
        const dataType = 'JSON';
        const baseDate = now.toISOString().slice(0, 10).replace(/-/g, ''); 
        const baseTime = (now.getHours() - 1).toString().padStart(2, '0') + '00';
        const nx = 57;
        const ny = 125;

        const constructedUrl = `${url}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

        fetch(constructedUrl)
            .then(res => res.json())
            .then(data => {
                const items = data.response.body.items.item;
                const tempItem = items.find(item => item.category === "TMP");
                const humItem = items.find(item => item.category === "REH");
                const wsdItem = items.find(item => item.category === "WSD");
                const skyItem = items.find(item => item.category === "SKY");
                const popItem = items.find(item => item.category === "POP");
                
                setTemp(tempItem.fcstValue);
                setHum(humItem.fcstValue);
                setWsd(wsdItem.fcstValue);
                setPop(popItem.fcstValue);

                if(skyItem.fcstValue === "1") {
                    setSky("맑음");
                } else if(skyItem.fcstValue === "3") {
                    setSky("구름 많음");
                } else if(skyItem.fcstValue === "4") {
                    setSky("흐림");
                }
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setTemp("오류 발생");
            });
    }, []);

    return (
        <div className="openapi" style={{ padding: '20px' }}>
                <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>
                    경기도 부천시 원미구 역곡 2동 날씨 정보
                </Typography>
                <Typography variant="body1">
                    하늘 : {sky} / 
                    온도: {temp}°C / 
                    습도: {hum}% / 
                    강수 확률: {pop}% /
                    풍속: {wsd}m/s 
                </Typography>
            </div>
    );
}

export default OpenApi;