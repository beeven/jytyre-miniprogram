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
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        avatarUrl: "/assets/user-unlogin.png",
        nickName: "未登录",
        phoneNumber: "",
        hasPhoneNumber: false,
        editPhoneNumber: false
    },
    onLoad: function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1, info, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!app.globalData.userInfo) return [3, 6];
                        if (!app.globalData.phoneNumber) return [3, 1];
                        this.setData({
                            nickName: app.globalData.userInfo.nickName,
                            avatarUrl: app.globalData.userInfo.avatarUrl,
                            phoneNumber: app.globalData.phoneNumber,
                            hasPhoneNumber: true
                        });
                        return [3, 5];
                    case 1:
                        this.setData({
                            nickName: app.globalData.userInfo.nickName,
                            avatarUrl: app.globalData.userInfo.avatarUrl,
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, fillPhoneNumber(this)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3, 5];
                    case 5: return [3, 12];
                    case 6: return [4, app.ensureLogin()];
                    case 7:
                        _a.sent();
                        return [4, app.getUserInfo()];
                    case 8:
                        info = _a.sent();
                        this.setData({
                            nickName: info.nickName,
                            avatarUrl: info.avatarUrl
                        });
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4, fillPhoneNumber(this)];
                    case 10:
                        _a.sent();
                        return [3, 12];
                    case 11:
                        err_2 = _a.sent();
                        this.setData({
                            editPhoneNumber: true
                        });
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    },
    inputedit: function (e) {
        var value = e.detail.value;
        this.setData({
            phoneNumber: value
        });
    },
    saveInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData({
                            hasPhoneNumber: true,
                            editPhoneNumber: false
                        });
                        app.globalData.phoneNumber = this.data.phoneNumber;
                        return [4, saveUserInfo()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
    editNumber: function () {
        this.setData({
            hasPhoneNumber: false
        });
    },
    onGetPhoneNumber: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var phoneNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(e.detail);
                        if (!(e.detail.errMsg && e.detail.errMsg != 'getPhoneNumber:ok')) return [3, 1];
                        wx.showToast({
                            title: '无法获得授权，请输入',
                            icon: 'none',
                            duration: 1000
                        });
                        this.setData({
                            editPhoneNumber: true
                        });
                        return [3, 6];
                    case 1:
                        phoneNumber = void 0;
                        if (!e.detail.cloudID) return [3, 3];
                        return [4, getPhoneNumberCloud(e.detail.cloudID)];
                    case 2:
                        phoneNumber = _a.sent();
                        return [3, 5];
                    case 3: return [4, getPhoneNumberServer(e.detail.encryptedData, e.detail.iv)];
                    case 4:
                        phoneNumber = _a.sent();
                        _a.label = 5;
                    case 5:
                        this.setData({
                            phoneNumber: phoneNumber,
                            hasPhoneNumber: true,
                            editPhoneNumber: false
                        });
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    }
});
function fillPhoneNumber(page) {
    return __awaiter(this, void 0, void 0, function () {
        var phoneNumber, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phoneNumber = "";
                    return [4, loadUserInfo()];
                case 1:
                    user = _a.sent();
                    if (user.phoneNumber) {
                        phoneNumber = user.phoneNumber;
                        app.globalData.phoneNumber = phoneNumber;
                        page.setData({
                            phoneNumber: phoneNumber,
                            hasPhoneNumber: true
                        });
                        return [2, phoneNumber];
                    }
                    else {
                        throw new Error("phoneNumber not found");
                    }
                    return [2];
            }
        });
    });
}
function saveUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var db_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wx.showLoading({
                        'title': '保存中'
                    });
                    if (!(app.globalData.useCloud && app.globalData.openid)) return [3, 2];
                    db_1 = wx.cloud.database();
                    return [4, db_1.collection("users").doc(app.globalData.openid).set({
                            data: {
                                phoneNumber: app.globalData.phoneNumber,
                                nickName: app.globalData.userInfo.nickName,
                                avatarUrl: app.globalData.userInfo.avatarUrl,
                            }
                        })];
                case 1:
                    _a.sent();
                    wx.hideLoading();
                    wx.showToast({
                        title: '已保存',
                        icon: 'success',
                        duration: 1000
                    });
                    return [3, 3];
                case 2:
                    wx.request({
                        url: "https://xxxxx/xxx",
                        method: "POST",
                        data: ""
                    });
                    _a.label = 3;
                case 3: return [2];
            }
        });
    });
}
function loadUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var db_2, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(app.globalData.useCloud && app.globalData.openid)) return [3, 2];
                    db_2 = wx.cloud.database();
                    return [4, db_2.collection("users").doc(app.globalData.openid).get()];
                case 1:
                    res = _a.sent();
                    return [2, res.data];
                case 2: throw new Error("Not implemented.");
            }
        });
    });
}
function getPhoneNumberCloud(code) {
    return __awaiter(this, void 0, void 0, function () {
        var ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, wx.cloud.callFunction({
                        name: "updatePhoneNumber",
                        data: {
                            openid: app.globalData.openid,
                            phoneNumber: wx.cloud.CloudID(code)
                        }
                    })];
                case 1:
                    ret = _a.sent();
                    return [2, ret.result.phoneNumber];
            }
        });
    });
}
function getPhoneNumberServer(encryptedData, iv) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, new Promise(function (resolve, reject) {
                        wx.request({
                            url: "http://xxxx/xxx",
                            method: "POST",
                            data: {
                                openid: app.globalData.openid,
                                encryptedData: encryptedData,
                                iv: iv
                            },
                            success: function (res) {
                                resolve(res.data);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckNvbnNvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyQ29uc29sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFZN0IsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFHO1FBQ0gsU0FBUyxFQUFFLDBCQUEwQjtRQUNyQyxRQUFRLEVBQUUsS0FBSztRQUNmLFdBQVcsRUFBRSxFQUFFO1FBQ2YsY0FBYyxFQUFFLEtBQUs7UUFDckIsZUFBZSxFQUFFLEtBQUs7S0FDekI7SUFFSyxNQUFNOzs7Ozs7NkJBQ0osR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQXZCLGNBQXVCOzZCQUNuQixHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBMUIsY0FBMEI7d0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVE7NEJBQzFDLFNBQVMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzRCQUM1QyxXQUFXLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXOzRCQUN2QyxjQUFjLEVBQUUsSUFBSTt5QkFDdkIsQ0FBQyxDQUFDOzs7d0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDVCxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUTs0QkFDMUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVM7eUJBQy9DLENBQUMsQ0FBQzs7Ozt3QkFFQyxXQUFNLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTNCLFNBQTJCLENBQUM7Ozs7d0JBSzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLENBQUM7Ozs0QkFJM0IsV0FBTSxHQUFH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RUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07Z0NBQzdCLGFBQWEsRUFBRSxhQUFhO2dDQUM1QixFQUFFLEVBQUUsRUFBRTs2QkFDVDs0QkFDRCxPQUFPLEVBQUUsVUFBQyxHQUFHO2dDQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBQ3JCLENBQUM7NEJBQ0QsSUFBSSxFQUFFLFVBQUEsR0FBRztnQ0FDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hCLENBQUM7eUJBQ0osQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxFQUFBOztvQkFoQkYsU0FnQkUsQ0FBQTs7Ozs7Q0FFTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gXCIuLi8uLi9hcHBcIjtcclxuXHJcbi8vIHBhZ2VzL3VzZXJDb25zb2xlL3VzZXJDb25zb2xlLmpzXHJcblxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcclxuXHJcbmludGVyZmFjZSBVc2VyQ29uc29sZURhdGEge1xyXG4gICAgYXZhdGFyVXJsOiBzdHJpbmc7XHJcbiAgICBuaWNrTmFtZTogc3RyaW5nO1xyXG4gICAgcGhvbmVOdW1iZXI6IHN0cmluZztcclxuICAgIGhhc1Bob25lTnVtYmVyOiBib29sZWFuO1xyXG4gICAgZWRpdFBob25lTnVtYmVyOiBib29sZWFuXHJcbn1cclxuXHJcblxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiAge1xyXG4gICAgICAgIGF2YXRhclVybDogXCIvYXNzZXRzL3VzZXItdW5sb2dpbi5wbmdcIixcclxuICAgICAgICBuaWNrTmFtZTogXCLmnKrnmbvlvZVcIixcclxuICAgICAgICBwaG9uZU51bWJlcjogXCJcIixcclxuICAgICAgICBoYXNQaG9uZU51bWJlcjogZmFsc2UsXHJcbiAgICAgICAgZWRpdFBob25lTnVtYmVyOiBmYWxzZVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS5waG9uZU51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTogYXBwLmdsb2JhbERhdGEudXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyVXJsOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby5hdmF0YXJVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGFwcC5nbG9iYWxEYXRhLnBob25lTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc1Bob25lTnVtYmVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhclVybDogYXBwLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGZpbGxQaG9uZU51bWJlcih0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZWRpdFBob25lTnVtYmVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXdhaXQgYXBwLmVuc3VyZUxvZ2luKCk7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gYXdhaXQgYXBwLmdldFVzZXJJbmZvKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbmlja05hbWU6IGluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgICAgICBhdmF0YXJVcmw6IGluZm8uYXZhdGFyVXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgYXdhaXQgZmlsbFBob25lTnVtYmVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdFBob25lTnVtYmVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dGVkaXQoZTogZXZlbnQuSW5wdXQpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogdmFsdWVcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgc2F2ZUluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaGFzUGhvbmVOdW1iZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGVkaXRQaG9uZU51bWJlcjogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnBob25lTnVtYmVyID0gdGhpcy5kYXRhLnBob25lTnVtYmVyO1xyXG4gICAgICAgIGF3YWl0IHNhdmVVc2VySW5mbygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlZGl0TnVtYmVyKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGhhc1Bob25lTnVtYmVyOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIG9uR2V0UGhvbmVOdW1iZXIoZTogZXZlbnQuQnV0dG9uR2V0UGhvbmVOdW1iZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbCk7XHJcbiAgICAgICAgaWYoZS5kZXRhaWwuZXJyTXNnICYmIGUuZGV0YWlsLmVyck1zZyAhPSAnZ2V0UGhvbmVOdW1iZXI6b2snKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aXoOazleiOt+W+l+aOiOadg++8jOivt+i+k+WFpScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgZWRpdFBob25lTnVtYmVyOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwaG9uZU51bWJlcjpzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKGUuZGV0YWlsLmNsb3VkSUQpIHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyID0gYXdhaXQgZ2V0UGhvbmVOdW1iZXJDbG91ZChlLmRldGFpbC5jbG91ZElEKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlciA9IGF3YWl0IGdldFBob25lTnVtYmVyU2VydmVyKGUuZGV0YWlsLmVuY3J5cHRlZERhdGEhLCBlLmRldGFpbC5pdiEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBoYXNQaG9uZU51bWJlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVkaXRQaG9uZU51bWJlcjogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZpbGxQaG9uZU51bWJlcihwYWdlOiBQYWdlLlBhZ2VJbnN0YW5jZTxVc2VyQ29uc29sZURhdGE+KSB7XHJcblxyXG4gICAgbGV0IHBob25lTnVtYmVyID0gXCJcIjtcclxuICAgIGxldCB1c2VyID0gYXdhaXQgbG9hZFVzZXJJbmZvKCk7XHJcbiAgICBpZiAodXNlciEucGhvbmVOdW1iZXIpIHtcclxuICAgICAgICBwaG9uZU51bWJlciA9IHVzZXIhLnBob25lTnVtYmVyXHJcbiAgICAgICAgYXBwLmdsb2JhbERhdGEucGhvbmVOdW1iZXIgPSBwaG9uZU51bWJlcjtcclxuICAgICAgICBwYWdlLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwaG9uZU51bWJlcjogcGhvbmVOdW1iZXIsXHJcbiAgICAgICAgICAgIGhhc1Bob25lTnVtYmVyOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBob25lTnVtYmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwaG9uZU51bWJlciBub3QgZm91bmRcIik7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzYXZlVXNlckluZm8oKSB7XHJcbiAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgJ3RpdGxlJzogJ+S/neWtmOS4rSdcclxuICAgIH0pO1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZUNsb3VkICYmIGFwcC5nbG9iYWxEYXRhLm9wZW5pZCkge1xyXG4gICAgICAgIGNvbnN0IGRiID0gd3guY2xvdWQuZGF0YWJhc2UoKTtcclxuICAgICAgICBhd2FpdCBkYi5jb2xsZWN0aW9uKFwidXNlcnNcIikuZG9jKGFwcC5nbG9iYWxEYXRhLm9wZW5pZCkuc2V0KHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6IGFwcC5nbG9iYWxEYXRhLnBob25lTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbmlja05hbWU6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvIS5uaWNrTmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhclVybDogYXBwLmdsb2JhbERhdGEudXNlckluZm8hLmF2YXRhclVybCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICflt7Lkv53lrZgnLFxyXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETzogc2F2ZSB1c2VyIHRvIHNlcnZlciBsb2dpY1xyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly94eHh4eC94eHhcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogXCJcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRVc2VySW5mbygpIHtcclxuICAgIC8vY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEpO1xyXG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZUNsb3VkICYmIGFwcC5nbG9iYWxEYXRhLm9wZW5pZCkge1xyXG4gICAgICAgIGNvbnN0IGRiID0gd3guY2xvdWQuZGF0YWJhc2UoKTtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgZGIuY29sbGVjdGlvbihcInVzZXJzXCIpLmRvYyhhcHAuZ2xvYmFsRGF0YS5vcGVuaWQpLmdldCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZXMuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETzogbG9hZCB1c2VyIGZyb20gc2VydmVyIGxvZ2ljXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkLlwiKVxyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly94eHh4eC94eHhcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogXCJpbmZvXCJcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRQaG9uZU51bWJlckNsb3VkKGNvZGU6IHN0cmluZykge1xyXG4gICAgbGV0IHJldCA9IGF3YWl0IHd4LmNsb3VkLmNhbGxGdW5jdGlvbih7XHJcbiAgICAgICAgICAgIG5hbWU6IFwidXBkYXRlUGhvbmVOdW1iZXJcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQsXHJcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogd3guY2xvdWQuQ2xvdWRJRChjb2RlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXQucmVzdWx0KTtcclxuICAgIHJldHVybiByZXQucmVzdWx0LnBob25lTnVtYmVyO1xyXG59IFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0UGhvbmVOdW1iZXJTZXJ2ZXIoZW5jcnlwdGVkRGF0YTogc3RyaW5nLCBpdjogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8veHh4eC94eHhcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQsXHJcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlbmNyeXB0ZWREYXRhLFxyXG4gICAgICAgICAgICAgICAgaXY6IGl2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKSAgICBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+e1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbiAgICBcclxufSJdfQ==