var express = require('express');
var router = express.Router();
require('./../util/util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登录
router.post('/login',function(req,res,next){
	var param = {
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}

	var sql="select * from user where user_name='"+param.userName+"' and login_password='"+param.userPwd+"'";
	console.log(sql)

	req.getConnection(function(err, conn) {
        if (err) {
            res.json({
            	status:'1',
            	msg:err
            });
            return next(err);//错误处理
        } else {
            conn.query(sql, [], function(err,result) {
                if (err) {
                    return next(err);
                } else {
                    if(result[0]){
                    	res.cookie('userId',result[0].user_id,{
                    		path:'/',
                    		maxAge:1000*60*60
                    	});
                        res.cookie('userName',result[0].user_name,{
                            path:'/',
                            maxAge:1000*60*60
                        });
                    	// req.session.user = result[0];

                    	res.json({
                    		status:'0',
                    		result:{
                    			userName:result[0].user_name
                    		}
                    	});
                    }  
                    else{
                    	res.json({
                    		status:'1',
                    		result:'用户名或密码错误'
                    	});
                    }
                }
            });
        }
    });
});

// 登出
router.post('/logout',function(req,res,next){
	res.cookie("userId","",{
		path:"/",
		maxAge:-1
	});
    res.cookie("userName","",{
        path:"/",
        maxAge:-1
    });
	res.json({
		status:"0",
		msg:'',
		result:''
	});
});

// 检查登录
router.get('/checkLogin',function(req,res,next){
    if(req.cookies.userId){
        res.json({
            status:'0',
            msg:'',
            result:{
                userName:req.cookies.userName}
        });
    }else{
        res.json({
            status:'1',
            msg:'未登录',
            result:''
        });
    }
});

// 获取购物车商品数量
router.get('/getCartCount',function(req,res,next){
    if(req.cookies && req.cookies.userId){
        var userId = req.cookies.userId;
        var sql = "select * from goods_cart where user_id='"+userId+"'";
        req.getConnection(function(err, conn) {
            if (err) {
                return next(err);//错误处理
            } else {
                conn.query(sql, [], function(err,result) {
                    if (err) {
                        return next(err);
                    } else {
                        let cartCount = 0;
                        result.forEach((item)=>{
                            cartCount += parseInt(item.product_num);
                        })
                        res.json({
                            status:'0',
                            msg:'',
                            result:cartCount
                        });
                    }
                });
            }
        });
    }
});

// 获取购物车列表
router.get('/cartList',function(req,res,next){
    var userId = req.cookies.userId;
    var sql = "select * from goods_cart where user_id='"+userId+"'";
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
});

// 删除购物车
router.post('/cart/del',function(req,res,next){
    var userId = req.cookies.userId, productId = req.body.productId;
    var sql = "delete from goods_cart where user_id='"+userId+"' and product_id='"+productId+"'";
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
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
});

// 编辑购物车内商品
router.post('/cart/cartEdit',function(req,res,next){
    var userId = req.cookies.userId, 
        productId = req.body.productId, 
        productNum = req.body.productNum,
        checked = req.body.checked;
    var sql = "update goods_cart set product_num='"+productNum+"',checked='"+checked+"' where user_id='"+userId+"' and product_id='"+productId+"'";
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
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
});

// 选中所有商品
router.post('/cart/checkAll',function(req,res,next){
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll;
    var sql = "update goods_cart set checked='"+checkAll+"' where user_id='"+userId+"'";
    req.getConnection(function(err, conn) {
        if (err) {
            return next(err);
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
});

// 获取地址列表
router.get('/addressList',function(req,res,next){
    var userId = req.cookies.userId;
    var sql = "select * from address where user_id='"+userId+"'";
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            conn.query(sql,[],function(err,result){
                if(err){
                    return next(err);
                }else{
                    res.json({
                        status:'0',
                        msg:'查询地址列表成功',
                        result:result
                    });
                }
            });
        }
    });
});

// 设为默认地址
router.post('/setDefault',function(req,res,next){
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if(!addressId){
        res.json({
            status:'1003',
            msg:'addressId is null',
            result:''
        });
    }else{
        var sql = "update address set isdefault = case when address_id='"+addressId+"' then '1' else '0' end where user_id='"+userId+"'";
        console.log(sql);
        req.getConnection(function(err,conn){
            if(err){
                return next(err);
            }else{
                conn.query(sql,[],function(err,result){
                    if(err){
                        return next(err);
                    }else{
                        res.json({
                            status:'0',
                            msg:'set default success',
                            result:result
                        });
                    }
                });
            }
        });
    }
});

// 删除地址
router.post('/delAddress',function(req,res,next){
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if(!addressId){
        res.json({
            status:'1003',
            msg:'addressId is null',
            result:''
        });
    }else{
        var sql = "delete from address where user_id='"+userId+"' and address_id='"+addressId+"'";
        console.log(sql);
        req.getConnection(function(err,conn){
            if(err){
                return next(err);
            }else{
                conn.query(sql,[],function(err,result){
                    if(err){
                        return next(err);
                    }else{
                        res.json({
                            status:'0',
                            msg:'delete address success',
                            result:result
                        });
                    }
                });
            }
        });
    }
});

// 选好后确认支付
router.post('/payMent',function(req,res,next){
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal;

    var r1 = Math.floor(Math.random()*10);
    var r2 = Math.floor(Math.random()*10);

    var sysDate = new Date().Format('yyyyMMddhhmmss');
    var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
    var orderId = r1+sysDate+r2;

    var sql1 = "select * from address where user_id='"+userId+"' and address_id='"+addressId+"'";
    var sql2 = "select * from goods_cart where user_id='"+userId+"' and checked='1'";

    // var flag1=false,flag2=false;
    
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            //先获取提交订单的地址
            conn.query(sql1,[],function(err,result){
                if(err){
                    return next(err);
                }else{
                    if(result[0]){
                        var address = result[0];
                        var sql3 ="insert into order_info values ('"+orderId+"','"+userId+"','"+createDate+"','"+orderTotal+"','"+address.addressarea+"','1','"+address.receiver+"','"+address.user_phone+"');";
                        console.log(sql3);
                        //写入订单表order
                        conn.query(sql3,[],function(err3,result3){
                            if(err3){
                                return next(err3);
                            }
                        });
                    }
                }
            });
            //获取提交的商品信息
            conn.query(sql2,[],function(err2,result2){
                if(err2){
                    return next(err2);
                }else{ 
                    //写入订单明细表order_detail
                    result2.forEach((item)=>{
                        var sql4 ="insert into order_detail values (null,'"+orderId+"','"+item.product_id+"','"+item.product_num+"','"+item.product_name+"','"+item.product_price+"','"+item.product_img+"');";
                        conn.query(sql4,[],function(err4,result4){
                            if(err4){
                                return next(err4);
                            }
                        });
                    })

                    //将购物车表goods_cart中相关数据删除
                    var sql5 = "delete from goods_cart where user_id='"+userId+"' and checked='1'";
                    conn.query(sql5,[],function(err5,result5){
                        if(err5){
                            return next(err5);
                        }
                    });
                }
            });

            res.json({
                status:'0',
                msg:'订单生成成功',
                result:{
                    orderId:orderId
                }
            });
        }
    }); 
});

// 获取订单详情
router.get('/orderDetail',function(req,res,next){
    var userId = req.cookies.userId;
    var orderId = req.query.orderId;
    var sql = "select * from order_info where user_id='"+userId+"' and order_id='"+orderId+"'";
    console.log(sql);
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            conn.query(sql,[],function(err,result){
                if(err){
                    return next(err);
                }else{
                    res.json({
                        status:'0',
                        msg:'',
                        result:{
                            orderId:result[0].order_id,
                            orderTotal:result[0].order_total
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
