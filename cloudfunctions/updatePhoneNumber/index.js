"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var cloud = require('wx-server-sdk');
cloud.init();
var db = cloud.database();
exports.main = function (event, context) { return __awaiter(_this, void 0, void 0, function () {
    var wxContext, phoneNumber, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wxContext = cloud.getWXContext();
                if (event.phoneNumber && event.phoneNumber.errCode) {
                    return [2, {
                            openid: wxContext.OPENID,
                            phoneNumber: '',
                            errCode: event.phoneNumber.errCode,
                            errMsg: event.phoneNumber.errMsg
                        }];
                }
                phoneNumber = event.phoneNumber.data.phoneNumber;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, db.collection('users').doc(wxContext.OPENID).update({
                        data: {
                            phoneNumber: phoneNumber
                        }
                    })];
            case 2:
                _a.sent();
                return [3, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [2, {
                        openid: wxContext.OPENID,
                        phoneNumber: '',
                        errCode: -1,
                        errMsg: e_1
                    }];
            case 4: return [2, {
                    phoneNumber: phoneNumber,
                    openid: wxContext.OPENID,
                    appid: wxContext.APPID,
                    unionid: wxContext.UNIONID,
                }];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQkEwQ0M7QUExQ0QsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRXRDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUNaLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUcxQixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQU8sS0FBSyxFQUFFLE9BQU87Ozs7O2dCQUM1QixTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFBO2dCQUV0QyxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7b0JBQ2xELFdBQU87NEJBQ0wsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNOzRCQUN4QixXQUFXLEVBQUUsRUFBRTs0QkFDZixPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPOzRCQUNsQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNO3lCQUNqQyxFQUFBO2lCQUNGO2dCQUVHLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Z0JBR25ELFdBQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDeEQsSUFBSSxFQUFFOzRCQUNKLFdBQVcsRUFBRSxXQUFXO3lCQUN6QjtxQkFDRixDQUFDLEVBQUE7O2dCQUpGLFNBSUUsQ0FBQzs7OztnQkFFSCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUNqQixXQUFPO3dCQUNMLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTt3QkFDeEIsV0FBVyxFQUFFLEVBQUU7d0JBQ2YsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDWCxNQUFNLEVBQUUsR0FBQztxQkFDVixFQUFBO29CQUdILFdBQU87b0JBQ0wsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTtvQkFDeEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUN0QixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87aUJBQzNCLEVBQUE7OztLQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkupHlh73mlbDlhaXlj6Pmlofku7ZcclxuY29uc3QgY2xvdWQgPSByZXF1aXJlKCd3eC1zZXJ2ZXItc2RrJylcclxuXHJcbmNsb3VkLmluaXQoKVxyXG5sZXQgZGIgPSBjbG91ZC5kYXRhYmFzZSgpO1xyXG5cclxuLy8g5LqR5Ye95pWw5YWl5Y+j5Ye95pWwXHJcbmV4cG9ydHMubWFpbiA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4ge1xyXG4gIGNvbnN0IHd4Q29udGV4dCA9IGNsb3VkLmdldFdYQ29udGV4dCgpXHJcblxyXG4gIGlmIChldmVudC5waG9uZU51bWJlciAmJiBldmVudC5waG9uZU51bWJlci5lcnJDb2RlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBvcGVuaWQ6IHd4Q29udGV4dC5PUEVOSUQsXHJcbiAgICAgIHBob25lTnVtYmVyOiAnJyxcclxuICAgICAgZXJyQ29kZTogZXZlbnQucGhvbmVOdW1iZXIuZXJyQ29kZSxcclxuICAgICAgZXJyTXNnOiBldmVudC5waG9uZU51bWJlci5lcnJNc2dcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCBwaG9uZU51bWJlciA9IGV2ZW50LnBob25lTnVtYmVyLmRhdGEucGhvbmVOdW1iZXI7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKCd1c2VycycpLmRvYyh3eENvbnRleHQuT1BFTklEKS51cGRhdGUoe1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBvcGVuaWQ6IHd4Q29udGV4dC5PUEVOSUQsXHJcbiAgICAgIHBob25lTnVtYmVyOiAnJyxcclxuICAgICAgZXJyQ29kZTogLTEsXHJcbiAgICAgIGVyck1zZzogZVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICByZXR1cm4ge1xyXG4gICAgcGhvbmVOdW1iZXI6IHBob25lTnVtYmVyLFxyXG4gICAgb3BlbmlkOiB3eENvbnRleHQuT1BFTklELFxyXG4gICAgYXBwaWQ6IHd4Q29udGV4dC5BUFBJRCxcclxuICAgIHVuaW9uaWQ6IHd4Q29udGV4dC5VTklPTklELFxyXG4gIH1cclxufSJdfQ==