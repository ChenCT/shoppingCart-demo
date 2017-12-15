var express = require('express');
var router = express.Router();

//拦截全部请求
router.all('/',function(req,res,next){
  console.log("触发请求");
  next();
});
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

/* GET goods listing. */
router.get('/list',function(req,res,next){
    let sort = req.query.sort;
    let priceLevel = req.query.priceLevel;
    let price='';
    let sortsql = 'order by productPrice '+sort;

    if( priceLevel!='all' ){
        switch(priceLevel){
            case '0': price='where productPrice between 0 and 500 ';break;
            case '1': price='where productPrice between 501 and 1000 ';break;
            case '2': price='where productPrice between 1000 and 2000 ';break;
        }
    }
    
    let sql='select * from goods '+price+sortsql;
    // console.log(sql)

    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);//错误处理
        } else {
            conn.query(sql, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    //直接把结果转化为json返回给客户端
                    res.json({
                        status:'0',
                        msg:'',
                        result:result
                    });
                }
            });
        }
    });
});

router.post('/addCart',function(req,res,next){
    let userId = req.cookies.userId ;
    let productId=req.body.productId, productName=req.body.productName, productPrice=req.body.productPrice, productImg=req.body.productImg;
    let repeatSql='select * from goods_cart where user_id='+userId+' and product_id ='+productId;
    // console.log(repeatSql);
   
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);//错误处理
        } else {
            conn.query(repeatSql, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    if(result[0]){
                        var sql="update goods_cart set product_num = product_num+1 where user_id="+userId+" and product_id ="+productId;
                    }else{
                        var sql="insert into goods_cart (user_id,product_id,product_num,product_name,product_price,product_img,checked) values("+userId+","+productId+",1,'"+productName+"',"+productPrice+",'"+productImg+"',1)";
                    }
                    console.log(sql);
                    req.getConnection(function(err, conn) {
                        if (err) {
                            return next(err);//错误处理
                        } else {
                            conn.query(sql, [], function(err,result) {
                                if (err) {
                                    return next(err);
                                } else {
                                    res.json({
                                        status:'0',
                                        msg:'',
                                        result:result
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});



module.exports = router;