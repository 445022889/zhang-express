const mysql = require('./db')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(logger);


app.post("/api/add_company", async (req, res) => {
    if (req.headers["x-wx-source"]) {
        const data = req.body;
        data.openid = req.headers["x-wx-source"]
        data['expire-date'] = (parseInt(data.long) || 1) * 86400 * 365 + new Date().getTime()
        const duplicates = await mysql.select("count(1)").from("company").where("company-name", data["company-name"]).queryValue()
        const must_in_arr = ["company-name", "company-area", "company-address", "company-master-name", "company-master-mobile", "company-main-brand", "company-type", "company-salesman", "company-construction-workers", "company-supervisors", "company-construction-workers", "expire-date"]
        for (const item of must_in_arr) {
            if (!Object.keys(data).includes(item)) res.send({code: 0, msg: "您还有信息需要填写"})
        }

        if (duplicates === 1) {
            res.send({code: 0, msg: "名称重复"})
        }
        const inreview = await mysql.select("count(1)").from("company").where("openid", data["openid"]).where("status", 0).queryValue()
        if (inreview === 1) {
            res.send({code: 0, msg: "您有一个正在审核的公司"})
        }
        await mysql.insert("company", data)

        res.send({code: 200, msg: "申请成功"})
    } else {
        res.send({code: 0, msg: "暂无权限"});
    }

})


const port = process.env.PORT || 80;

async function bootstrap() {
    app.listen(port, () => {
        console.log("启动成功", port);
    });
}

bootstrap();
