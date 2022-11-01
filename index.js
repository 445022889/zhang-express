const mysql = require('/db')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);


app.get("/api/add_company", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    const { action } = req.body;
const a=await mysql.select("Counters").where(["id",1]).queryRow()
res.send({a})
  }else {
    res.send({code:0,msg:"暂无权限"});
  }

})


const port = process.env.PORT || 80;

async function bootstrap() {
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
