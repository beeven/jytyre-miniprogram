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
    onLoad: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, app.ensureLogin()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
    onGetUserInfo: function (e) {
        if (e.detail.errMsg != "getUserInfo:ok") {
            wx.showModal({
                title: '先生贵姓？',
                content: '请告诉我您是谁，才能给给您打开个人中心哦',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                    }
                }
            });
        }
        else {
            app.globalData.userInfo = e.detail.userInfo;
            wx.navigateTo({ url: "../userConsole/userConsole" });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFFN0IsSUFBSSxDQUFDO0lBQ0csTUFBTTs7Ozs0QkFDVixXQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQTs7d0JBQXZCLFNBQXVCLENBQUM7Ozs7O0tBQ3pCO0lBRUQsYUFBYSxFQUFiLFVBQWMsQ0FBMEI7UUFFdEMsSUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsRUFBRTtZQUN0QyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxPQUFPO2dCQUNkLE9BQU8sRUFBRSxzQkFBc0I7Z0JBQy9CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixPQUFPLEVBQUUsVUFBVSxHQUFHO29CQUNsQixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7cUJBRWhCO2dCQUNMLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDNUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFDLEdBQUcsRUFBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUM7U0FDbkQ7SUFFSCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSBcIi4uLy4uL2FwcFwiO1xyXG5cclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KCk7XHJcblxyXG5QYWdlKHtcclxuICBhc3luYyBvbkxvYWQoKSB7XHJcbiAgICBhd2FpdCBhcHAuZW5zdXJlTG9naW4oKTtcclxuICB9LFxyXG5cclxuICBvbkdldFVzZXJJbmZvKGU6IGV2ZW50LkJ1dHRvbkdldFVzZXJJbmZvKSB7XHJcblxyXG4gICAgaWYoZS5kZXRhaWwuZXJyTXNnICE9IFwiZ2V0VXNlckluZm86b2tcIikge1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5YWI55Sf6LS15aeT77yfJyxcclxuICAgICAgICBjb250ZW50OiAn6K+35ZGK6K+J5oiR5oKo5piv6LCB77yM5omN6IO957uZ57uZ5oKo5omT5byA5Liq5Lq65Lit5b+D5ZOmJyxcclxuICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvO1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6XCIuLi91c2VyQ29uc29sZS91c2VyQ29uc29sZVwifSk7XHJcbiAgICB9XHJcbiAgICBcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gUGFnZSh7XHJcbi8vICAgZGF0YToge1xyXG4vLyAgIH0sXHJcblxyXG4vLyAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBpZiAoIXd4LmNsb3VkKSB7XHJcbiAgICAvLyAgIHd4LnJlZGlyZWN0VG8oe1xyXG4gICAgLy8gICAgIHVybDogJy4uL2Nob29zZUxpYi9jaG9vc2VMaWInLFxyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gICByZXR1cm5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cclxuICAgIC8vIHd4LmdldFNldHRpbmcoe1xyXG4gICAgLy8gICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgLy8gICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgIC8vICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcclxuICAgIC8vICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgIC8vICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgIC8vICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgLy8gICAgICAgICAgICAgYXZhdGFyVXJsOiByZXMudXNlckluZm8uYXZhdGFyVXJsLFxyXG4gICAgLy8gICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mb1xyXG4gICAgLy8gICAgICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgIH0pXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KVxyXG4gIC8vICAgYXBwLmVuc3VyZUxvZ2luKCk7XHJcbiAgLy8gfSxcclxuXHJcbiAgLy8gb25HZXRVc2VySW5mbzogZnVuY3Rpb24oZSkge1xyXG4gIC8vICAgaWYgKCF0aGlzLmxvZ2dlZCAmJiBlLmRldGFpbC51c2VySW5mbykge1xyXG4gIC8vICAgICB0aGlzLnNldERhdGEoe1xyXG4gIC8vICAgICAgIGxvZ2dlZDogdHJ1ZSxcclxuICAvLyAgICAgICBhdmF0YXJVcmw6IGUuZGV0YWlsLnVzZXJJbmZvLmF2YXRhclVybCxcclxuICAvLyAgICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm9cclxuICAvLyAgICAgfSlcclxuICAvLyAgIH1cclxuICAvLyB9LFxyXG5cclxuICAvLyBvbkdldE9wZW5pZDogZnVuY3Rpb24oKSB7XHJcbiAgLy8gICAvLyDosIPnlKjkupHlh73mlbBcclxuICAvLyAgIHd4LmNsb3VkLmNhbGxGdW5jdGlvbih7XHJcbiAgLy8gICAgIG5hbWU6ICdsb2dpbicsXHJcbiAgLy8gICAgIGRhdGE6IHt9LFxyXG4gIC8vICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKCdb5LqR5Ye95pWwXSBbbG9naW5dIHVzZXIgb3BlbmlkOiAnLCByZXMucmVzdWx0Lm9wZW5pZClcclxuICAvLyAgICAgICBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQgPSByZXMucmVzdWx0Lm9wZW5pZFxyXG4gIC8vICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gIC8vICAgICAgICAgdXJsOiAnLi4vdXNlckNvbnNvbGUvdXNlckNvbnNvbGUnLFxyXG4gIC8vICAgICAgIH0pXHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgLy8gICAgICAgY29uc29sZS5lcnJvcignW+S6keWHveaVsF0gW2xvZ2luXSDosIPnlKjlpLHotKUnLCBlcnIpXHJcbiAgLy8gICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgLy8gICAgICAgICB1cmw6ICcuLi9kZXBsb3lGdW5jdGlvbnMvZGVwbG95RnVuY3Rpb25zJyxcclxuICAvLyAgICAgICB9KVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9KVxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIC8vIOS4iuS8oOWbvueJh1xyXG4gIC8vIGRvVXBsb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgLy8gICAvLyDpgInmi6nlm77niYdcclxuICAvLyAgIHd4LmNob29zZUltYWdlKHtcclxuICAvLyAgICAgY291bnQ6IDEsXHJcbiAgLy8gICAgIHNpemVUeXBlOiBbJ2NvbXByZXNzZWQnXSxcclxuICAvLyAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG5cclxuICAvLyAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgLy8gICAgICAgICB0aXRsZTogJ+S4iuS8oOS4rScsXHJcbiAgLy8gICAgICAgfSlcclxuXHJcbiAgLy8gICAgICAgY29uc3QgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoc1swXVxyXG4gICAgICAgIFxyXG4gIC8vICAgICAgIC8vIOS4iuS8oOWbvueJh1xyXG4gIC8vICAgICAgIGNvbnN0IGNsb3VkUGF0aCA9ICdteS1pbWFnZScgKyBmaWxlUGF0aC5tYXRjaCgvXFwuW14uXSs/JC8pWzBdXHJcbiAgLy8gICAgICAgd3guY2xvdWQudXBsb2FkRmlsZSh7XHJcbiAgLy8gICAgICAgICBjbG91ZFBhdGgsXHJcbiAgLy8gICAgICAgICBmaWxlUGF0aCxcclxuICAvLyAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdb5LiK5Lyg5paH5Lu2XSDmiJDlip/vvJonLCByZXMpXHJcblxyXG4gIC8vICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5maWxlSUQgPSByZXMuZmlsZUlEXHJcbiAgLy8gICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLmNsb3VkUGF0aCA9IGNsb3VkUGF0aFxyXG4gIC8vICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5pbWFnZVBhdGggPSBmaWxlUGF0aFxyXG4gICAgICAgICAgICBcclxuICAvLyAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgLy8gICAgICAgICAgICAgdXJsOiAnLi4vc3RvcmFnZUNvbnNvbGUvc3RvcmFnZUNvbnNvbGUnXHJcbiAgLy8gICAgICAgICAgIH0pXHJcbiAgLy8gICAgICAgICB9LFxyXG4gIC8vICAgICAgICAgZmFpbDogZSA9PiB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1vkuIrkvKDmlofku7ZdIOWksei0pe+8micsIGUpXHJcbiAgLy8gICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgLy8gICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gIC8vICAgICAgICAgICAgIHRpdGxlOiAn5LiK5Lyg5aSx6LSlJyxcclxuICAvLyAgICAgICAgICAgfSlcclxuICAvLyAgICAgICAgIH0sXHJcbiAgLy8gICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gIC8vICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgLy8gICAgICAgICB9XHJcbiAgLy8gICAgICAgfSlcclxuXHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIGZhaWw6IGUgPT4ge1xyXG4gIC8vICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSlcclxuICAvLyB9LFxyXG5cclxuLy8gfSlcclxuIl19