// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.phoneNumber && event.phoneNumber.errCode) {
    return {
      openid: wxContext.OPENID,
      phoneNumber: '',
      errCode: event.phoneNumber.errCode,
      errMsg: event.phoneNumber.errMsg
    }
  }

  let phoneNumber = event.phoneNumber.data.phoneNumber;

  try {
    await db.collection('users').doc(wxContext.OPENID).update({
      data: {
        phoneNumber: phoneNumber
      }
    });
  } catch (e) {
    console.error(e);
    return {
      openid: wxContext.OPENID,
      phoneNumber: '',
      errCode: -1,
      errMsg: e
    }
  }
  
  return {
    phoneNumber: phoneNumber,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}