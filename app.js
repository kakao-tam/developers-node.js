const express = require('express');
const session = require('express-session');
const cors = require("cors");
const qs = require("qs");
const axios = require('axios');
const app = express();
const port = 4000;

// 정적 파일 서빙 설정 추가
app.use(express.static(__dirname));
app.use(express.json()); // JSON 파싱을 위해 추가

app.use(session({
    secret: 'your session secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const client_id = ' this is rest api key ';
const client_secret = ' this is client secret key ';
const domain = 'http://localhost:4000';
const redirect_uri = `${domain}/redirect`;
const token_uri = 'https://kauth.kakao.com/oauth/token';
const api_host = "https://kapi.kakao.com";

app.get('/authorize', function (req, res) {
    let { scope } = req.query;
    var scopeParam = "";
    if (scope) {
        scopeParam = "&scope=" + scope;
    }
    res.status(302).redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code${scopeParam}`);
});

async function call(method, uri, param, header) {
    try {
        rtn = await axios({
            method: method,
            url: uri,
            headers: header,
            data: param
        });
    } catch (err) {
        rtn = err.response;
    }    
    return rtn.data;
}

app.get('/redirect', async function (req, res) {
    const param = qs.stringify({
        "grant_type": 'authorization_code',
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "client_secret": client_secret,
        "code": req.query.code
    });
    const header = { 'content-type': 'application/x-www-form-urlencoded' };
    var rtn = await call('POST', token_uri, param, header);
    req.session.key = rtn.access_token;
    res.status(302).redirect(`${domain}/index.html?login=success`);
});

app.get('/profile', async function (req, res) {
    const uri = api_host + "/v2/user/me";
    const param = {};
    const header = {
        'content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('POST', uri, param, header);
    res.send(rtn);
});

app.get('/friends', async function (req, res) {
    const uri = api_host + "/v1/api/talk/friends";
    const param = null;
    const header = {
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('GET', uri, param, header);
    res.send(rtn);
});

app.get('/message', async function (req, res) {
    const uri = api_host + "/v2/api/talk/memo/default/send";
    const param = qs.stringify({
        "template_object": JSON.stringify({
            "object_type": "text",
            "text": "Hello, world!",
            "link": {
                "web_url": "https://developers.kakao.com",
                "mobile_web_url": "https://developers.kakao.com"
            }
        })
    });
    const header = {
        'content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('POST', uri, param, header);
    res.send(rtn);
});

app.get('/friend-message', async function (req, res) {
    const uri = api_host + "/v1/api/talk/friends/message/default/send";
    const { uuid } = req.query;
    
    const param = qs.stringify({
        "receiver_uuids": `[${uuid}]`,
        "template_object": JSON.stringify({
            "object_type": "text",
            "text": "Hello, world!",
            "link": {
                "web_url": "https://developers.kakao.com",
                "mobile_web_url": "https://developers.kakao.com"
            }
        })
    });

    const header = {
        'content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('POST', uri, param, header);
    res.send(rtn);
});

app.get('/logout', async function (req, res) {
    const uri = api_host + "/v1/user/logout";
    const header = {
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('POST', uri, null, header);
    req.session.destroy();
    res.send(rtn);
});

app.get('/unlink', async function (req, res) {
    const uri = api_host + "/v1/user/unlink";
    const header = {
        'Authorization': 'Bearer ' + req.session.key
    }
    var rtn = await call('POST', uri, null, header);
    req.session.destroy();
    res.send(rtn);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 