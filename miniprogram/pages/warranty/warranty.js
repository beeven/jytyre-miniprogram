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
var moment = require("moment-mini-ts");
var warranty_service_1 = require("./warranty.service");
var warrantListItem_1 = require("./warrantListItem");
var app = getApp();
Page({
    data: {
        loading: true,
        items: [],
    },
    onLoad: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, app.ensureLogin()];
                    case 1:
                        _a.sent();
                        return [4, this.reloadList()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
    onItemClicked: function (e) {
        var itemId = e.currentTarget.dataset["itemId"];
        wx.navigateTo({
            url: "./detail/detail?id=" + itemId,
        });
    },
    addNew: function () {
        return __awaiter(this, void 0, void 0, function () {
            var warrantyID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, warranty_service_1.warrantyService.createWarrantyItem()];
                    case 1:
                        warrantyID = _a.sent();
                        wx.navigateTo({
                            url: "./detail/detail?id=" + warrantyID
                        });
                        return [2];
                }
            });
        });
    },
    UpdateItem: function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            var items, i;
            return __generator(this, function (_a) {
                items = this.data.items;
                i = items.findIndex(function (x) { return x.warrantyID === id; });
                if (item.isDeleting) {
                    if (i != -1) {
                        items.splice(i, 1);
                    }
                }
                else {
                    if (i != -1) {
                        items.splice(i, 1, item);
                    }
                    else {
                        items.push(item);
                    }
                }
                this.setData({
                    items: items
                });
                return [2];
            });
        });
    },
    onPullDownRefresh: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.reloadList()];
                    case 1:
                        _a.sent();
                        wx.stopPullDownRefresh();
                        return [2];
                }
            });
        });
    },
    reloadList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var warrantyItems, viewItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showToast({
                            title: '数据加载中',
                            icon: 'loading',
                            duration: 10000
                        });
                        return [4, warranty_service_1.warrantyService.loadWarrantyItems()];
                    case 1:
                        warrantyItems = _a.sent();
                        viewItems = [];
                        warrantyItems.forEach(function (item) {
                            var i = new warrantListItem_1.WarrantyListItem(item._id, item.plateNumber ? item.plateNumber : '车牌未填写', item.endDate ? "\u8D28\u4FDD\u671F\u9650\uFF1A " + moment(item.endDate).format("YYYY-MM-DD") : "", item.thumbnail, item.approvalStatus);
                            viewItems.push(i);
                        });
                        wx.hideToast();
                        this.setData({
                            items: viewItems,
                            loading: false
                        });
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FycmFudHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3YXJyYW50eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQXlDO0FBQ3pDLHVEQUFxRTtBQUNyRSxxREFBcUQ7QUFFckQsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFrQjdCLElBQUksQ0FBaUM7SUFDakMsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUUsRUFDTjtLQUNnQjtJQUNmLE1BQU07Ozs7NEJBQ1IsV0FBTSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUF2QixTQUF1QixDQUFDO3dCQUN4QixXQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQXZCLFNBQXVCLENBQUM7Ozs7O0tBRTNCO0lBRUQsYUFBYSxFQUFiLFVBQWMsQ0FBYztRQUV4QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1YsR0FBRyxFQUFFLHFCQUFxQixHQUFHLE1BQU07U0FDdEMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUlLLE1BQU07Ozs7OzRCQUNTLFdBQU0sa0NBQWUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFBOzt3QkFBdkQsVUFBVSxHQUFHLFNBQTBDO3dCQUMzRCxFQUFFLENBQUMsVUFBVSxDQUFDOzRCQUNWLEdBQUcsRUFBRSx3QkFBc0IsVUFBWTt5QkFDMUMsQ0FBQyxDQUFBOzs7OztLQUNMO0lBSUssVUFBVSxFQUFoQixVQUFpQixFQUFVLEVBQUUsSUFBc0I7Ozs7Z0JBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDeEIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsVUFBVSxLQUFLLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO3dCQUNULEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO3FCQUNyQjtpQkFDSjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTt3QkFDVCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBQ25CO2lCQUNKO2dCQUVELElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1QsS0FBSyxFQUFFLEtBQUs7aUJBQ2YsQ0FBQyxDQUFDOzs7O0tBQ047SUFFSyxpQkFBaUI7Ozs7NEJBQ25CLFdBQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBdkIsU0FBdUIsQ0FBQzt3QkFDeEIsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Ozs7O0tBQzVCO0lBRUssVUFBVSxFQUFoQjs7Ozs7O3dCQUVJLEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQ1QsS0FBSyxFQUFFLE9BQU87NEJBQ2QsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsUUFBUSxFQUFFLEtBQUs7eUJBQ2xCLENBQUMsQ0FBQzt3QkFFaUIsV0FBTSxrQ0FBZSxDQUFDLGlCQUFpQixFQUFFLEVBQUE7O3dCQUF6RCxhQUFhLEdBQUcsU0FBeUM7d0JBRXpELFNBQVMsR0FBdUIsRUFBRSxDQUFDO3dCQUN2QyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs0QkFDdEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQ0FBZ0IsQ0FDeEIsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLG9DQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3hFLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FDdEIsQ0FBQzs0QkFFRixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixDQUFDLENBQUMsQ0FBQTt3QkFHRixFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDVCxLQUFLLEVBQUUsU0FBUzs0QkFDaEIsT0FBTyxFQUFFLEtBQUs7eUJBQ2pCLENBQUMsQ0FBQTs7Ozs7S0FDTDtDQUVKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gXCIuLi8uLi9hcHBcIjtcclxuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gXCJtb21lbnQtbWluaS10c1wiO1xyXG5pbXBvcnQgeyB3YXJyYW50eVNlcnZpY2UsIEFwcHJvdmFsU3RhdHVzIH0gZnJvbSAnLi93YXJyYW50eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgV2FycmFudHlMaXN0SXRlbSB9IGZyb20gXCIuL3dhcnJhbnRMaXN0SXRlbVwiO1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdhcnJhbnR5UGFnZURhdGEge1xyXG4gICAgaXRlbXM6IFdhcnJhbnR5TGlzdEl0ZW1bXSxcclxuICAgIGxvYWRpbmc6IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXYXJyYW50eVBhZ2Uge1xyXG4gICAgb25JdGVtQ2xpY2tlZChlOiBhbnkpOiB2b2lkO1xyXG4gICAgYWRkTmV3KCk6IHZvaWQ7XHJcbiAgICByZWxvYWRMaXN0KCk6IHZvaWQ7XHJcbiAgICBVcGRhdGVJdGVtKGlkOiBzdHJpbmcsIGl0ZW06IFdhcnJhbnR5TGlzdEl0ZW0pOiB2b2lkO1xyXG59XHJcblxyXG5QYWdlPFdhcnJhbnR5UGFnZURhdGEsIFdhcnJhbnR5UGFnZT4oe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICBdLFxyXG4gICAgfSBhcyBXYXJyYW50eVBhZ2VEYXRhLFxyXG4gICAgYXN5bmMgb25Mb2FkKCkge1xyXG4gICAgICAgIGF3YWl0IGFwcC5lbnN1cmVMb2dpbigpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVsb2FkTGlzdCgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25JdGVtQ2xpY2tlZChlOiBldmVudC5Ub3VjaCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgbGV0IGl0ZW1JZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0W1wiaXRlbUlkXCJdO1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IFwiLi9kZXRhaWwvZGV0YWlsP2lkPVwiICsgaXRlbUlkLFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgYXN5bmMgYWRkTmV3KCkge1xyXG4gICAgICAgIGxldCB3YXJyYW50eUlEID0gYXdhaXQgd2FycmFudHlTZXJ2aWNlLmNyZWF0ZVdhcnJhbnR5SXRlbSgpO1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGAuL2RldGFpbC9kZXRhaWw/aWQ9JHt3YXJyYW50eUlEfWBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIGFzeW5jIFVwZGF0ZUl0ZW0oaWQ6IHN0cmluZywgaXRlbTogV2FycmFudHlMaXN0SXRlbSkge1xyXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuZGF0YS5pdGVtcztcclxuICAgICAgICBsZXQgaSA9IGl0ZW1zLmZpbmRJbmRleCh4ID0+IHgud2FycmFudHlJRCA9PT0gaWQpO1xyXG4gICAgICAgIGlmIChpdGVtLmlzRGVsZXRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGkgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxLCBpdGVtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXRlbXM6IGl0ZW1zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVsb2FkTGlzdCgpO1xyXG4gICAgICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgcmVsb2FkTGlzdCgpIHtcclxuXHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmlbDmja7liqDovb3kuK0nLFxyXG4gICAgICAgICAgICBpY29uOiAnbG9hZGluZycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vYXdhaXQgd2FycmFudHlTZXJ2aWNlLnNhbXBsaW5nRGF0YWJhc2UoKTtcclxuICAgICAgICBsZXQgd2FycmFudHlJdGVtcyA9IGF3YWl0IHdhcnJhbnR5U2VydmljZS5sb2FkV2FycmFudHlJdGVtcygpO1xyXG5cclxuICAgICAgICBsZXQgdmlld0l0ZW1zOiBXYXJyYW50eUxpc3RJdGVtW10gPSBbXTtcclxuICAgICAgICB3YXJyYW50eUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpID0gbmV3IFdhcnJhbnR5TGlzdEl0ZW0oXHJcbiAgICAgICAgICAgICAgICBpdGVtLl9pZCxcclxuICAgICAgICAgICAgICAgIGl0ZW0ucGxhdGVOdW1iZXIgPyBpdGVtLnBsYXRlTnVtYmVyIDogJ+i9pueJjOacquWhq+WGmScsXHJcbiAgICAgICAgICAgICAgICBpdGVtLmVuZERhdGUgPyBg6LSo5L+d5pyf6ZmQ77yaICR7bW9tZW50KGl0ZW0uZW5kRGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKX1gIDogXCJcIixcclxuICAgICAgICAgICAgICAgIGl0ZW0udGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgaXRlbS5hcHByb3ZhbFN0YXR1c1xyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdmlld0l0ZW1zLnB1c2goaSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHZpZXdJdGVtcyk7XHJcblxyXG4gICAgICAgIHd4LmhpZGVUb2FzdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGl0ZW1zOiB2aWV3SXRlbXMsXHJcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn0pXHJcblxyXG4iXX0=