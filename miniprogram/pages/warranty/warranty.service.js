"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var app = getApp();
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus["drafting"] = "drafting";
    ApprovalStatus["pending"] = "pending";
    ApprovalStatus["approved"] = "approved";
    ApprovalStatus["rejected"] = "rejected";
})(ApprovalStatus = exports.ApprovalStatus || (exports.ApprovalStatus = {}));
var WarrantyService = (function () {
    function WarrantyService() {
        this.db = wx.cloud.database();
        console.log("constructing WarrantyService");
    }
    WarrantyService.prototype.loadWarrantyItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.collection("warranty").where({
                            _openid: app.globalData.openid
                        }).field({
                            _id: true,
                            thumbnail: true,
                            plateNumber: true,
                            endDate: true,
                            approvalStatus: true
                        }).get()];
                    case 1:
                        items = _a.sent();
                        ret = [];
                        items.data.forEach(function (item) {
                            ret.push({
                                _id: item._id.toString(),
                                thumbnail: item["thumbnail"],
                                plateNumber: item["plateNumber"],
                                endDate: item["endDate"] ? new Date(item["endDate"]) : undefined,
                                approvalStatus: item["approvalStatus"]
                            });
                        });
                        return [2, ret];
                }
            });
        });
    };
    WarrantyService.prototype.getWarrantyItemDetail = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, detail, shopLocation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.collection("warranty").doc(id).get()];
                    case 1:
                        ret = _a.sent();
                        detail = {
                            _id: ret.data._id,
                            thumbnail: ret.data["thumbnail"],
                            plateNumber: ret.data["plateNumber"],
                            plateImageFileID: ret.data["plateImageFileID"],
                            shopAddress: ret.data["shopAddress"],
                            shopImageFileID: ret.data["shopImageFileID"],
                            shopName: ret.data["shopName"],
                            tyreModelImageFileID: ret.data["tyreModelImageFileID"],
                            tyreInstallationImageFileID: ret.data["tyreInstallationImageFileID"],
                            datePurchased: ret.data["datePurchased"] ? new Date(ret.data["datePurchased"]) : new Date(),
                            endDate: ret.data["endDate"] ? new Date(ret.data["endDate"]) : new Date((new Date()).getTime() + 365 * 24 * 60 * 60 * 1000),
                            approvalStatus: ret.data["approvalStatus"],
                            dateCreated: ret.data["dateCreated"] ? new Date(ret.data["dateCreated"]) : new Date(),
                            lastUpdated: ret.data["lastUpdated"] ? new Date(ret.data["lastUpdated"]) : new Date()
                        };
                        shopLocation = ret.data["shopLocation"];
                        if (shopLocation != null && typeof shopLocation !== 'undefined' && shopLocation.coordinates) {
                            detail["shopLocation"] = {
                                longtitude: ret.data["shopLocation"].coordinates[0].toString(),
                                latitude: ret.data["shopLocation"].coordinates[1].toString(),
                            };
                        }
                        return [2, detail];
                }
            });
        });
    };
    WarrantyService.prototype.createWarrantyItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.collection("warranty").add({
                            data: {
                                approvalStatus: ApprovalStatus.drafting,
                                dateCreated: this.db.serverDate(),
                                lastUpdated: this.db.serverDate(),
                            }
                        })];
                    case 1:
                        ret = _a.sent();
                        return [2, ret._id];
                }
            });
        });
    };
    WarrantyService.prototype.updateWarrantyItem = function (id, update, location) {
        return __awaiter(this, void 0, void 0, function () {
            var shopLocation, o, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shopLocation = location ? __assign({ type: 'Point' }, location) : undefined;
                        o = Object.entries(update).filter(function (_a) {
                            var name = _a[0], value = _a[1];
                            return !!value;
                        });
                        if (o.length == 0 && typeof shopLocation === 'undefined') {
                            return [2];
                        }
                        update.lastUpdated = this.db.serverDate();
                        return [4, this.db.collection("warranty").doc(id).update({
                                data: __assign({}, update, { shopLocation: shopLocation })
                            })];
                    case 1:
                        ret = _a.sent();
                        return [2];
                }
            });
        });
    };
    WarrantyService.prototype.removeWarrantyItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, fileIDs, t1, t2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.collection("warranty").doc(id).field({
                            _id: true,
                            plateImageFileID: true,
                            tyreModelImageFileID: true,
                            tyreInstallationImageFileID: true,
                            shopImageFileID: true
                        }).get()];
                    case 1:
                        ret = _a.sent();
                        fileIDs = [ret.data["plateImageFileID"], ret.data["shopImageFileID"], ret.data["tyreModelImageFileID"], ret.data["tyreInstallationImageFildID"]];
                        fileIDs = fileIDs.filter(function (x) { return !!x; });
                        t1 = wx.cloud.deleteFile({
                            fileList: fileIDs
                        });
                        t2 = this.db.collection("warranty").doc(id).remove();
                        return [4, Promise.all([t1, t2])];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    WarrantyService.prototype.samplingDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, i, startDate, endDate, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Sampling Data");
                        return [4, this.loadWarrantyItems()];
                    case 1:
                        items = _a.sent();
                        if (items.length >= 3) {
                            return [2];
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < 3)) return [3, 5];
                        startDate = (moment().subtract(Math.round(Math.random() * 100), "day"));
                        endDate = (moment().add(Math.round(Math.random() * 100), "day"));
                        return [4, this.db.collection("warranty").add({
                                data: {
                                    thumbnail: defaultThumbnail,
                                    plateNumber: "粤A DE" + Math.round((Math.random() * 1000)).toString().padStart(3, '0'),
                                    startDate: startDate.toDate(),
                                    endDate: endDate.toDate()
                                }
                            })];
                    case 3:
                        ret = _a.sent();
                        console.log(ret);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2];
                }
            });
        });
    };
    WarrantyService.prototype.uploadPlateImage = function (warrantyID, localFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, fileData, fileExt, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = wx.getFileSystemManager();
                        return [4, new Promise(function (resolve, reject) {
                                manager.readFile({
                                    filePath: localFilePath,
                                    encoding: 'base64',
                                    success: function (res) {
                                        resolve(res.data);
                                    },
                                    fail: function (err) {
                                        reject(err);
                                    }
                                });
                            })];
                    case 1:
                        fileData = _a.sent();
                        fileExt = localFilePath.substr(localFilePath.lastIndexOf('.'));
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, wx.cloud.callFunction({
                                name: 'uploadscanplate',
                                data: {
                                    fileData: fileData,
                                    fileExt: fileExt,
                                    warrantyID: warrantyID
                                }
                            })];
                    case 3:
                        res = _a.sent();
                        console.log(res);
                        if (res.result.error_msg) {
                            throw new Error(res.result.error_msg);
                        }
                        return [2, {
                                fileID: res.result.fileID,
                                plateNumber: res.result.number,
                                probability: res.result.probability
                            }];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw err_1;
                    case 5: return [2];
                }
            });
        });
    };
    WarrantyService.prototype.getPlateNumber = function (fileID) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, wx.cloud.callFunction({
                            name: 'scanPlate',
                            data: {
                                fileID: fileID
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        if (res.result.error_msg) {
                            throw new Error(res.result.error_msg);
                        }
                        return [2, {
                                fileID: fileID,
                                plateNumber: res.result.number,
                                probability: res.result.probability
                            }];
                }
            });
        });
    };
    WarrantyService.prototype.uploadImage = function (warrantyID, localFilePath, name) {
        return __awaiter(this, void 0, void 0, function () {
            var i, ext, ret;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        i = localFilePath.lastIndexOf(".");
                        ext = ".jpg";
                        if (i != -1) {
                            ext = localFilePath.substr(i);
                        }
                        return [4, wx.cloud.uploadFile({
                                cloudPath: "warranty/" + warrantyID + "/" + name + ext,
                                filePath: localFilePath
                            })];
                    case 1:
                        ret = _b.sent();
                        return [4, this.db.collection("warranty").doc(warrantyID).update({
                                data: (_a = {},
                                    _a[name + "ImageFileID"] = ret.fileID,
                                    _a)
                            })];
                    case 2:
                        _b.sent();
                        return [2, ret.fileID];
                }
            });
        });
    };
    return WarrantyService;
}());
exports.WarrantyService = WarrantyService;
var defaultThumbnail = "data:image/png;base64,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";
exports.warrantyService = new WarrantyService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FycmFudHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhcnJhbnR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQXlDO0FBRXpDLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRTdCLElBQVksY0FLWDtBQUxELFdBQVksY0FBYztJQUN0Qix1Q0FBcUIsQ0FBQTtJQUNyQixxQ0FBbUIsQ0FBQTtJQUNuQix1Q0FBcUIsQ0FBQTtJQUNyQix1Q0FBcUIsQ0FBQTtBQUN6QixDQUFDLEVBTFcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFLekI7QUF3Q0Q7SUFDSTtRQUlRLE9BQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBSDdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBSUssMkNBQWlCLEdBQXZCOzs7Ozs0QkFFZ0IsV0FBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7NEJBQ25ELE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07eUJBQ2pDLENBQUMsQ0FBQyxLQUFLLENBQUM7NEJBQ0wsR0FBRyxFQUFFLElBQUk7NEJBQ1QsU0FBUyxFQUFFLElBQUk7NEJBQ2YsV0FBVyxFQUFFLElBQUk7NEJBQ2pCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLGNBQWMsRUFBRSxJQUFJO3lCQUN2QixDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUE7O3dCQVJKLEtBQUssR0FBRyxTQVFKO3dCQUNKLEdBQUcsR0FBbUIsRUFBRSxDQUFDO3dCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7NEJBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0NB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LFVBQWtCLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxJQUFZOzs7Ozs7O3dCQUNqRSxDQUFDLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkMsR0FBRyxHQUFHLE1BQU0sQ0FBQzt3QkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7NEJBQ1QsR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ2pDO3dCQUNTLFdBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0NBQ2hDLFNBQVMsRUFBRSxjQUFZLFVBQVUsU0FBSSxJQUFJLEdBQUcsR0FBSztnQ0FDakQsUUFBUSxFQUFFLGFBQWE7NkJBQzFCLENBQUMsRUFBQTs7d0JBSEUsR0FBRyxHQUFHLFNBR1I7d0JBRUYsV0FBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDO2dDQUN4RCxJQUFJO29DQUNBLEdBQUMsSUFBSSxHQUFHLGFBQWEsSUFBRyxHQUFHLENBQUMsTUFBTTt1Q0FDckM7NkJBQ0osQ0FBQyxFQUFBOzt3QkFKRixTQUlFLENBQUM7d0JBRUgsV0FBTyxHQUFHLENBQUMsTUFBTSxFQUFDOzs7O0tBQ3JCO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBaE9ELElBZ09DO0FBaE9ZLDBDQUFlO0FBbU81QixJQUFNLGdCQUFnQixHQUFHLDQ5S0FBNDlLLENBQUE7QUFHeCtLLFFBQUEsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTXlBcHAgfSBmcm9tIFwiLi4vLi4vYXBwXCI7XHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50LW1pbmktdHNcIjtcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KCk7XHJcblxyXG5leHBvcnQgZW51bSBBcHByb3ZhbFN0YXR1cyB7XHJcbiAgICBkcmFmdGluZyA9IFwiZHJhZnRpbmdcIixcclxuICAgIHBlbmRpbmcgPSBcInBlbmRpbmdcIixcclxuICAgIGFwcHJvdmVkID0gXCJhcHByb3ZlZFwiLFxyXG4gICAgcmVqZWN0ZWQgPSBcInJlamVjdGVkXCJcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2FycmFudHlJdGVtIHtcclxuICAgIF9pZDogc3RyaW5nO1xyXG4gICAgdGh1bWJuYWlsOiBzdHJpbmc7XHJcbiAgICBwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG4gICAgZW5kRGF0ZT86IERhdGUsXHJcbiAgICBhcHByb3ZhbFN0YXR1czogQXBwcm92YWxTdGF0dXM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2FycmFudHlJdGVtRGV0YWlsIHtcclxuICAgIF9pZDogc3RyaW5nO1xyXG4gICAgdGh1bWJuYWlsOiBzdHJpbmc7XHJcbiAgICBwbGF0ZU51bWJlcj86IHN0cmluZztcclxuICAgIHBsYXRlSW1hZ2VGaWxlSUQ/OiBzdHJpbmc7XHJcbiAgICBzaG9wSW1hZ2VGaWxlSUQ/OiBzdHJpbmc7XHJcbiAgICBzaG9wTmFtZT86IHN0cmluZztcclxuICAgIHNob3BBZGRyZXNzPzogc3RyaW5nO1xyXG4gICAgc2hvcExvY2F0aW9uPzoge1xyXG4gICAgICAgIGxhdGl0dWRlOiBudW1iZXI7XHJcbiAgICAgICAgbG9uZ3RpdHVkZTogbnVtYmVyO1xyXG4gICAgfVxyXG4gICAgdHlyZU1vZGVsSW1hZ2VGaWxlSUQ6IHN0cmluZztcclxuICAgIHR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRDogc3RyaW5nO1xyXG4gICAgZGF0ZVB1cmNoYXNlZD86IERhdGU7XHJcbiAgICBlbmREYXRlPzogRGF0ZTtcclxuICAgIGFwcHJvdmFsU3RhdHVzOiBBcHByb3ZhbFN0YXR1cztcclxuICAgIGRhdGVDcmVhdGVkOiBEYXRlO1xyXG4gICAgbGFzdFVwZGF0ZWQ/OiBEYXRlIHwgREIuU2VydmVyRGF0ZTtcclxuICAgIGZlZWRiYWNrPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVwbG9hZFBsYXRlSW1hZ2VSZXN1bHQge1xyXG4gICAgZmlsZUlEOiBzdHJpbmc7XHJcbiAgICBwbGF0ZU51bWJlcjogc3RyaW5nO1xyXG4gICAgcHJvYmFiaWxpdHk6IG51bWJlcjtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBXYXJyYW50eVNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25zdHJ1Y3RpbmcgV2FycmFudHlTZXJ2aWNlXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkYiA9IHd4LmNsb3VkLmRhdGFiYXNlKCk7XHJcblxyXG4gICAgYXN5bmMgbG9hZFdhcnJhbnR5SXRlbXMoKSB7XHJcblxyXG4gICAgICAgIGxldCBpdGVtcyA9IGF3YWl0IHRoaXMuZGIuY29sbGVjdGlvbihcIndhcnJhbnR5XCIpLndoZXJlKHtcclxuICAgICAgICAgICAgX29wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkXHJcbiAgICAgICAgfSkuZmllbGQoe1xyXG4gICAgICAgICAgICBfaWQ6IHRydWUsXHJcbiAgICAgICAgICAgIHRodW1ibmFpbDogdHJ1ZSxcclxuICAgICAgICAgICAgcGxhdGVOdW1iZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGVuZERhdGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFwcHJvdmFsU3RhdHVzOiB0cnVlXHJcbiAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgbGV0IHJldDogV2FycmFudHlJdGVtW10gPSBbXTtcclxuICAgICAgICBpdGVtcy5kYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIF9pZDogaXRlbS5faWQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6IGl0ZW1bXCJ0aHVtYm5haWxcIl0sXHJcbiAgICAgICAgICAgICAgICBwbGF0ZU51bWJlcjogaXRlbVtcInBsYXRlTnVtYmVyXCJdLFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVtcImVuZERhdGVcIl0gPyBuZXcgRGF0ZShpdGVtW1wiZW5kRGF0ZVwiXSkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBhcHByb3ZhbFN0YXR1czogaXRlbVtcImFwcHJvdmFsU3RhdHVzXCJdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRXYXJyYW50eUl0ZW1EZXRhaWwoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXQgPSBhd2FpdCB0aGlzLmRiLmNvbGxlY3Rpb24oXCJ3YXJyYW50eVwiKS5kb2MoaWQpLmdldCgpO1xyXG5cclxuICAgICAgICBsZXQgZGV0YWlsOiBXYXJyYW50eUl0ZW1EZXRhaWwgPSB7XHJcbiAgICAgICAgICAgIF9pZDogcmV0LmRhdGEuX2lkIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgdGh1bWJuYWlsOiByZXQuZGF0YVtcInRodW1ibmFpbFwiXSxcclxuICAgICAgICAgICAgcGxhdGVOdW1iZXI6IHJldC5kYXRhW1wicGxhdGVOdW1iZXJcIl0sXHJcbiAgICAgICAgICAgIHBsYXRlSW1hZ2VGaWxlSUQ6IHJldC5kYXRhW1wicGxhdGVJbWFnZUZpbGVJRFwiXSxcclxuICAgICAgICAgICAgc2hvcEFkZHJlc3M6IHJldC5kYXRhW1wic2hvcEFkZHJlc3NcIl0sXHJcbiAgICAgICAgICAgIHNob3BJbWFnZUZpbGVJRDogcmV0LmRhdGFbXCJzaG9wSW1hZ2VGaWxlSURcIl0sXHJcbiAgICAgICAgICAgIHNob3BOYW1lOiByZXQuZGF0YVtcInNob3BOYW1lXCJdLFxyXG4gICAgICAgICAgICB0eXJlTW9kZWxJbWFnZUZpbGVJRDogcmV0LmRhdGFbXCJ0eXJlTW9kZWxJbWFnZUZpbGVJRFwiXSxcclxuICAgICAgICAgICAgdHlyZUluc3RhbGxhdGlvbkltYWdlRmlsZUlEOiByZXQuZGF0YVtcInR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRFwiXSxcclxuICAgICAgICAgICAgZGF0ZVB1cmNoYXNlZDogcmV0LmRhdGFbXCJkYXRlUHVyY2hhc2VkXCJdID8gbmV3IERhdGUocmV0LmRhdGFbXCJkYXRlUHVyY2hhc2VkXCJdKSA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGVuZERhdGU6IHJldC5kYXRhW1wiZW5kRGF0ZVwiXSA/IG5ldyBEYXRlKHJldC5kYXRhW1wiZW5kRGF0ZVwiXSkgOiBuZXcgRGF0ZSgobmV3IERhdGUoKSkuZ2V0VGltZSgpICsgMzY1ICogMjQgKiA2MCAqIDYwICogMTAwMCksXHJcbiAgICAgICAgICAgIGFwcHJvdmFsU3RhdHVzOiByZXQuZGF0YVtcImFwcHJvdmFsU3RhdHVzXCJdLFxyXG4gICAgICAgICAgICBkYXRlQ3JlYXRlZDogcmV0LmRhdGFbXCJkYXRlQ3JlYXRlZFwiXSA/IG5ldyBEYXRlKHJldC5kYXRhW1wiZGF0ZUNyZWF0ZWRcIl0pIDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IHJldC5kYXRhW1wibGFzdFVwZGF0ZWRcIl0gPyBuZXcgRGF0ZShyZXQuZGF0YVtcImxhc3RVcGRhdGVkXCJdKSA6IG5ldyBEYXRlKClcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IHNob3BMb2NhdGlvbiA9IHJldC5kYXRhW1wic2hvcExvY2F0aW9uXCJdXHJcbiAgICAgICAgaWYgKHNob3BMb2NhdGlvbiAhPSBudWxsICYmIHR5cGVvZiBzaG9wTG9jYXRpb24gIT09ICd1bmRlZmluZWQnICYmIHNob3BMb2NhdGlvbi5jb29yZGluYXRlcykge1xyXG5cclxuICAgICAgICAgICAgZGV0YWlsW1wic2hvcExvY2F0aW9uXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgbG9uZ3RpdHVkZTogcmV0LmRhdGFbXCJzaG9wTG9jYXRpb25cIl0uY29vcmRpbmF0ZXNbMF0udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiByZXQuZGF0YVtcInNob3BMb2NhdGlvblwiXS5jb29yZGluYXRlc1sxXS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNyZWF0ZVdhcnJhbnR5SXRlbSgpIHtcclxuICAgICAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5kYi5jb2xsZWN0aW9uKFwid2FycmFudHlcIikuYWRkKHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgYXBwcm92YWxTdGF0dXM6IEFwcHJvdmFsU3RhdHVzLmRyYWZ0aW5nLFxyXG4gICAgICAgICAgICAgICAgZGF0ZUNyZWF0ZWQ6IHRoaXMuZGIuc2VydmVyRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgbGFzdFVwZGF0ZWQ6IHRoaXMuZGIuc2VydmVyRGF0ZSgpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJldC5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdXBkYXRlV2FycmFudHlJdGVtKGlkOiBzdHJpbmcsIHVwZGF0ZTogT3B0aW9uYWw8T21pdDxXYXJyYW50eUl0ZW1EZXRhaWwsIFwic2hvcExvY2F0aW9uXCI+PiwgbG9jYXRpb24/OiB7IGxhdGl0dWRlOiBudW1iZXIsIGxvbmd0aXR1ZGU6IG51bWJlciB9KSB7XHJcblxyXG5cclxuICAgICAgICBsZXQgc2hvcExvY2F0aW9uID0gbG9jYXRpb24gPyB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXHJcbiAgICAgICAgICAgIC4uLmxvY2F0aW9uXHJcbiAgICAgICAgfSA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgbGV0IG8gPSBPYmplY3QuZW50cmllcyh1cGRhdGUpLmZpbHRlcigoW25hbWUsIHZhbHVlXSkgPT4gISF2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmIChvLmxlbmd0aCA9PSAwICYmIHR5cGVvZiBzaG9wTG9jYXRpb24gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZS5sYXN0VXBkYXRlZCA9IHRoaXMuZGIuc2VydmVyRGF0ZSgpO1xyXG5cclxuICAgICAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5kYi5jb2xsZWN0aW9uKFwid2FycmFudHlcIikuZG9jKGlkKS51cGRhdGUoe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAuLi51cGRhdGUsXHJcbiAgICAgICAgICAgICAgICBzaG9wTG9jYXRpb246IHNob3BMb2NhdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVtb3ZlV2FycmFudHlJdGVtKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5kYi5jb2xsZWN0aW9uKFwid2FycmFudHlcIikuZG9jKGlkKS5maWVsZCh7XHJcbiAgICAgICAgICAgIF9pZDogdHJ1ZSxcclxuICAgICAgICAgICAgcGxhdGVJbWFnZUZpbGVJRDogdHJ1ZSxcclxuICAgICAgICAgICAgdHlyZU1vZGVsSW1hZ2VGaWxlSUQ6IHRydWUsXHJcbiAgICAgICAgICAgIHR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRDogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvcEltYWdlRmlsZUlEOiB0cnVlXHJcbiAgICAgICAgfSkuZ2V0KCk7XHJcblxyXG4gICAgICAgIGxldCBmaWxlSURzOiBzdHJpbmdbXSA9IFtyZXQuZGF0YVtcInBsYXRlSW1hZ2VGaWxlSURcIl0sIHJldC5kYXRhW1wic2hvcEltYWdlRmlsZUlEXCJdLCByZXQuZGF0YVtcInR5cmVNb2RlbEltYWdlRmlsZUlEXCJdLCByZXQuZGF0YVtcInR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGRJRFwiXV07XHJcbiAgICAgICAgZmlsZUlEcyA9IGZpbGVJRHMuZmlsdGVyKHggPT4gISF4KTtcclxuXHJcbiAgICAgICAgbGV0IHQxID0gd3guY2xvdWQuZGVsZXRlRmlsZSh7XHJcbiAgICAgICAgICAgIGZpbGVMaXN0OiBmaWxlSURzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHQyID0gdGhpcy5kYi5jb2xsZWN0aW9uKFwid2FycmFudHlcIikuZG9jKGlkKS5yZW1vdmUoKTtcclxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbdDEsIHQyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2FtcGxpbmdEYXRhYmFzZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNhbXBsaW5nIERhdGFcIilcclxuICAgICAgICBsZXQgaXRlbXMgPSBhd2FpdCB0aGlzLmxvYWRXYXJyYW50eUl0ZW1zKCk7XHJcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA+PSAzKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSAobW9tZW50KCkuc3VidHJhY3QoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKSwgXCJkYXlcIikpO1xyXG4gICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IChtb21lbnQoKS5hZGQoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKSwgXCJkYXlcIikpO1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gYXdhaXQgdGhpcy5kYi5jb2xsZWN0aW9uKFwid2FycmFudHlcIikuYWRkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWw6IGRlZmF1bHRUaHVtYm5haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdGVOdW1iZXI6IFwi57KkQSBERVwiICsgTWF0aC5yb3VuZCgoTWF0aC5yYW5kb20oKSAqIDEwMDApKS50b1N0cmluZygpLnBhZFN0YXJ0KDMsICcwJyksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUudG9EYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogZW5kRGF0ZS50b0RhdGUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyB1cGxvYWRQbGF0ZUltYWdlKHdhcnJhbnR5SUQ6IHN0cmluZywgbG9jYWxGaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxVcGxvYWRQbGF0ZUltYWdlUmVzdWx0PiB7XHJcblxyXG4gICAgICAgIGxldCBtYW5hZ2VyID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVEYXRhID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBtYW5hZ2VyLnJlYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBsb2NhbEZpbGVQYXRoLFxyXG4gICAgICAgICAgICAgICAgZW5jb2Rpbmc6ICdiYXNlNjQnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgZmlsZUV4dCA9IGxvY2FsRmlsZVBhdGguc3Vic3RyKGxvY2FsRmlsZVBhdGgubGFzdEluZGV4T2YoJy4nKSk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCB3eC5jbG91ZC5jYWxsRnVuY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3VwbG9hZHNjYW5wbGF0ZScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZURhdGE6IGZpbGVEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVFeHQ6IGZpbGVFeHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2FycmFudHlJRDogd2FycmFudHlJRFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzLnJlc3VsdC5lcnJvcl9tc2cpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXMucmVzdWx0LmVycm9yX21zZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlSUQ6IHJlcy5yZXN1bHQuZmlsZUlELFxyXG4gICAgICAgICAgICAgICAgcGxhdGVOdW1iZXI6IHJlcy5yZXN1bHQubnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcHJvYmFiaWxpdHk6IHJlcy5yZXN1bHQucHJvYmFiaWxpdHlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldFBsYXRlTnVtYmVyKGZpbGVJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IHd4LmNsb3VkLmNhbGxGdW5jdGlvbih7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzY2FuUGxhdGUnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlSUQ6IGZpbGVJRFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICBpZiAocmVzLnJlc3VsdC5lcnJvcl9tc2cpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlcy5yZXN1bHQuZXJyb3JfbXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpbGVJRDogZmlsZUlELFxyXG4gICAgICAgICAgICBwbGF0ZU51bWJlcjogcmVzLnJlc3VsdC5udW1iZXIsXHJcbiAgICAgICAgICAgIHByb2JhYmlsaXR5OiByZXMucmVzdWx0LnByb2JhYmlsaXR5XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHVwbG9hZEltYWdlKHdhcnJhbnR5SUQ6IHN0cmluZywgbG9jYWxGaWxlUGF0aDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaSA9IGxvY2FsRmlsZVBhdGgubGFzdEluZGV4T2YoXCIuXCIpO1xyXG4gICAgICAgIGxldCBleHQgPSBcIi5qcGdcIjtcclxuICAgICAgICBpZiAoaSAhPSAtMSkge1xyXG4gICAgICAgICAgICBleHQgPSBsb2NhbEZpbGVQYXRoLnN1YnN0cihpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldCA9IGF3YWl0IHd4LmNsb3VkLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICBjbG91ZFBhdGg6IGB3YXJyYW50eS8ke3dhcnJhbnR5SUR9LyR7bmFtZX0ke2V4dH1gLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogbG9jYWxGaWxlUGF0aFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmRiLmNvbGxlY3Rpb24oXCJ3YXJyYW50eVwiKS5kb2Mod2FycmFudHlJRCkudXBkYXRlKHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgW25hbWUgKyBcIkltYWdlRmlsZUlEXCJdOiByZXQuZmlsZUlEXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldC5maWxlSUQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCBkZWZhdWx0VGh1bWJuYWlsID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUdRQUFBQmtDQU1BQUFCSFBHVm1BQUFCUzJsVVdIUllUVXc2WTI5dExtRmtiMkpsTG5odGNBQUFBQUFBUEQ5NGNHRmphMlYwSUdKbFoybHVQU0x2dTc4aUlHbGtQU0pYTlUwd1RYQkRaV2hwU0hweVpWTjZUbFJqZW10ak9XUWlQejRLUEhnNmVHMXdiV1YwWVNCNGJXeHVjenA0UFNKaFpHOWlaVHB1Y3pwdFpYUmhMeUlnZURwNGJYQjBhejBpUVdSdlltVWdXRTFRSUVOdmNtVWdOUzQyTFdNeE5ESWdOemt1TVRZd09USTBMQ0F5TURFM0x6QTNMekV6TFRBeE9qQTJPak01SUNBZ0lDQWdJQ0FpUGdvZ1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNEtJQ0E4Y21SbU9rUmxjMk55YVhCMGFXOXVJSEprWmpwaFltOTFkRDBpSWk4K0NpQThMM0prWmpwU1JFWStDand2ZURwNGJYQnRaWFJoUGdvOFAzaHdZV05yWlhRZ1pXNWtQU0p5SWo4K25oeGc3d0FBQUFSblFVMUJBQUN4and2OFlRVUFBQUFCYzFKSFFnQ3V6aHpwQUFBREFGQk1WRVVBQUFBZEhSMS9nWUNhbTV2eDhmSHA2dW50N2UyRmhZWHc3ZTd1N3U2b3FhbU5qbzNFeE1USXlNamEydHExdGJXUWtKRHE2dXA5ZlgyV2w1WnhjWEtlbnA2NHVMaDJkM1lsSlNWVFUxTmlZMkxCdkx5Y25KeXVyNjZMaTR0aVkyUFEwZEJpWTJPVGs1UE95OHp6OC9QVzFOU2ZvSit4c3JHOHZiMXpjM044Zkh3a0pDUUlDQWh3Y25FY0hCd3RMUzJQajQ4QkFRRTlQVDJKaVluYTI5cFZWbFV2THkvczYrelMwdEwvLy85M2VYaGVYbDZkbloxNmUzcWhvNkkvUVVDK3dMK1ptWm12cjYrOXZiMVFVVkZBUUVCZlgxK0lpSWhKU1VtVGs1TXBLU21XbHBWRlIwWlJVVkZlWGw3eDhmR3p0TFR4OGZIcDZlbmMzZDNEeE1PM3Q3ZFlXRmhnWUdEZDNkMmtwS1NlbjU1d2NISFUxTlJEUlVYS3lzcERRMFBlMHRONGVIbVFrSkM4dkx5MnViaCtmbjRBQUFBeU16UC8vLzhPRHc5QlEwTWZJU0FSRWhFV0ZoWXhNakZNVFV4RlJrWWhJaUZ4YzNNM09EaFZWMVlqSkNRdExpMCtQejRlSHg0L1FFQlBVRTliWEZ3Wkdoa01EQXhBUWtFMU5UVlJVbEk0T2prVUZCUmdZbUUxTnpkWldsbGZZR0FyTEN5QmdvSVhHQmdpSXlOS1Mwc2xKU1ZOVDA1RFJrWndjbkp1YjI5a1pXWUlDQWhEUkVSbWFHYzZPanRqWkdPcnJhd2JHeHQzZVhsVFZWUklTVWtLQ2dwNWUzbzdQRHlscDZZcEtTbUVob1dQa1pDSmk0b25LQ2M4UFQxc2JXMlptcG9GQlFWOGZYd3VMeTkwZFhSSVMwcC9nSDlTVTFNREF3TXFLeXNrSmlaZFgxNkRoSVNUbFpRYkhoMW9hV21Mam8xR1IwZFdXRmt3TURDeHNyRnFhMnVTa3BJNU9UbEhTRWlHaDRmRXhNUXpOVFc0dXJtanBhU29xcW5HeU1kYlhWNjh2YjNRMHRFOFB6N04wTkNLakl6YjNOeUlpWW0ydDdkMWRuYTB0cldYbDVldnNiRWRIUjFsWjJhZW9KOU9VVkxKeXNsNmZZRG41K2ZYMmRpZ29xTFUxdGFVbDVxUWtwYlMwOU45Z0lLTmpvN0p6TXpOemMzajQrT2JuWjI5djcreXRMU0dpSXVNanBKcmJuQy93OE9jbjZIZjROK2lwYW5Cd2NHNnVybHpkM2lscUt3QkFRSHM3ZXlCaFlidzhQRDI5dlpvYTI3SXpOR0Nnb2Y3Ky92TjBkZGZZV1hCdjcrNzBxaWhBQUFBWm5SU1RsTUEzYjkvQzBrVmZ4QXVncDFBYUVSK2dLdmN2TnBDVXJxQnd0c0s3OFM4OG9XQVhMb1prcm1paTRXQXl2VzZnSUhpOWVxR0crem1aVC9lck1qSDd2Zlg4dDNmM2ZSbFllelFHdHh3Z0lHdUhHSnJvMlh4OWRYMTROK0k5T0RsMy9MV3pQdSsvTmNtN003SUFBQUxKa2xFUVZSbzN1MlhaWEJiVnhiSDI2UkpnODJHeXR4dW1ibmRkb3ZMek13emt0OFRNejB4TTFwb3lSYlpsa0dXWk1zZ2syekxiTXZNTWtNY08wd050TTIrSk4zTzdrelVObW0vN0l4K0krbnBnM1QvNTl4ejdqbm4zbkJEaGd3Wk1tVElrQ0ZEaHY4WE51L2MrZXJXcjIrNXUzNitiZHM5ait5OWQ4TnR0ejM5OUcwYk50eTdkKzhqZjl6MVpuRi83cThmdXY4cjYyeTkvOUh0Yit5NzgyV2NSaFFyQ2pWenFqVkdEZGpGYjBZaWkwUWFEYzVzUzFaNWN4L2E5RlVrdG13WE94aGdpUktITXlMRFVZcklKZUtEU28yeGhLbG1Nb004YW5PKzFtNWtNc2VLQTkrOGZvMWI3eHVwRkl0TjhKc2NMR0ZveUVHTnFLaFpVOUpZb3ViWnlVSjludDBraWdKSUVTSHM0ajE2MDNWcWJEY045aFI3RDdmMDQweDZuVHJmclNTQkpVWStWaVRDeG1JeEpJK3BNUE9oNnE1bXBaR1BST1c5OWF2cjJxbzNBcGI2K3FHMjdxRklmakd4d3FZM2o2bVZ1R284NkhmeHNYd09ZNlFyeE9LTm1ZVmRvTmdzdEl1TTd1dUkvK1o5ZzhjTFdoZlBIMXIwYU11THF4SXljUTJMek5LeW1EdzdzN0ZTNWhheThvenRKeXdGMmdpdHNuVTBMbVpWM25QTkdqditWSHNzdDJPNnU2MzdnTXlUdENWU1JGT2xYbWp5RWlPU3VvaXdZS2FLcUlacW5NVFdReXNCTzg0eVVGdHVEc2l1TmNkMkJDNjIxUzRlbVpxYTZtMVpTZFJYRE9TVzJtekZXbTFWcVZickpKb3FWcnlsWUZUb1Rnemxydlo1UktuT3RrUzh2dUx1YXdqKzVvMXYvOFd6MU5uVU96bTkxTlowd0dKcFhWa2RiNmxQZXN0TDNZbkJubVRTVGF5d3BHUllxbTAwd2JlS0lySUc3K201Sll1bnR1TCtMNi94bHBSZE9kWFdNajUzcUc5Z3RYWm90YloycUtXbHo1SklGQlNrRXFNcmd3dWVub3FCeFg0NW1HcHppOVRWWFR5eGJuTHk5UGpvVUZ2eTRTK3RVaTcwTnZVZTZaM3FYdXBlSEc4NjF0SFIwbEpyYVlVZHlrMFZlT0x1aWdxUEp4bGZVSWVDbmIybFZENUxLMUVyNTdMT1RuVTJIU2QrcVRQNThLc1BiMzNzMjdYZEhiRGx1YW1Wd1FyUFFvODM3cGJKWk9XbGNFaDB1bnlUWGxMRHcxV0RKQnFPMlRrZVE3QUpVbDlRNWgxY3FQSlU5Y2dxdmppTk4rLzZkcXJVUkhUTHRIVWpack5aS0JSS0pKSklKTkl1TkxlejdFdzdqNG5EZDduNGZnWUh4T09aWWxhL0RZMDJGK3VJeFVTaHBESmZaN1BGM2U5L2tjWXQ5OVVSMVV5SjJCN2s4WGhNSHZNUzZrc3YrMWlqQm8vRGFmeXVMaEJuNS9GWWtrdUxtaXBySXNFYTIzcWxNTUlrazROa01WbktxaU0vOXJrS2p6NmlMT0V4cWgwYUl3aUNIQmpHRldnZ1NPUHpRWTVMSlBLRGpjcHFUcEJGaHFrUnM5ckZaRW1OUm9PdllRR29FZk9JYnAxZjQweGUzSkplWStmWW1COEo4a1Y4a2FqNVU1Qkk1T1ducUJrcElzRzEvZEpYYWhRbFVxc1pIRTFKVFg2L0xaOGxFWXNqcG9rek5lMEhlN3dIZTJiT25LczZuajcyVzUzYUV6elFVWUxINDQwZ3A0c1BseWMrQ1Y0ZEMxTkVwWVo5dmxCUk03K0xSdFo2ZThoK3ZLWXhpTVBKVHM1T1RNelBUMHc0NTJjT3p4NjJEUFd0SHA2WTZQeDdXbGYrcFF2WTRqWmR3S2x6eWtwTDQxNnRMWmxNZXIzeGNuZDVxYk4vcEw0MU41Rm9iVTE1UGJtSlZCMERweFp6UWhSS1QxdkZ6TUNoeGM3cDZhbnA3cVhPeGFYbGNRdVM4OUJkNlRLM3ZsU0pkQ25GM0dERUg4STdoSU1MYmhJM0d5dHRKbUdwRFl3WVhsWXFLeTkzeTV3NlpsQ2Z6V1hWbUhBK2tqRWNiWm5zSE1ndDhBWjBRcnZhU0VMS2sxa3NCT0tCdE0wSksrWmxHMmw0RXErZGhyVG51OHZqOVJLYzNZZ0ZjZjZpYkFlV2pDdkNrL1g1ZXZPSVVnME9sNndUaFZRWE44YVJSODdtUTRxb1hDNkhJRG9xU2tjN1BCQ1YvdlpMNmJxVEQyZVVVbW00Wm1RMlZvSEYxMTRzaVB1YnBYUXFWMG9QWlZPeGZyaTdONEIrRG8yR3A4WHM2K2RPYUxoNUNBU2FSdkEzNTBsRFBsK1lvcUFvQ0lSd1RFQUJETkpicjY1eDB3ZUlIQXJKWldjWmxjS2dzVjFTRjNjNnNvVmtCazVpWitDRERvNngwYUYwTk1KSndXZ1EwTmRQeksrTHFHV0ZDSVNWUktmbWhXRUZCUUZGUU5HamluQklqa0FJTnFieDVCMlBNaXlQRGtNUUpvZU56akd3cVFvQ3hBWWdkQTZBd1FoeUNnVUNOTUNHQWRBRXp2enNtWmwyS1pWTEl3a1ExSkF2ckZDZ1VIUjZsRUNQV2dtd053M3NzalJCMmZwT1U5dFFqN09ZbUMrVWlNbGtPNDdEb0hGb0xrNUo0NldUNmVmeVFSeFpNcEpmSEtnL05ObWRtK3B4SWJrRXRLcVJQa3dsWEpHSVFwQUFZQXZDS3BKUmxmUGpxNHU4T2Vhc2FKdnVuSnBzNnpzeU56ZmVOTjA1ZnV4WVIxUHVpbVYwcHNwOXBtZHRyU2N1Y3hicjZzenRZblBBNHZURmtHZUdlQVJTekJkRjBTRU1VRmpHanVhSndEQWtkY3gyc1orOXVzaTNFSkRDTWJxYVNpVXZubDJlUEpJWVRmVk5MaTkvMk5FQ2Q4YnB1YVcrZ2xKYlA1RlliQ3N2R0RoMm9MVkZTS0ZsSDhpYXhTbG9WS0FzQndvNWlCNUxTK2ZVMUlFdXlOaFhaN2o5NmlKM0lBQU1RSkNHQ2ZTQzdtTnRuVTJXanNYbDVlV3pUV1M5MXJrd2VqRFNpRWVxNEJ4UytXSktkOHZaYmxjUkFsSHdjZU9ZZzBvSmxWc09MQzZPSCtoWTdldm9tSk1CcEpsK3dRUHBSQXpocU54cXRjSWZDZ1VGNlFMeGpVeXlub3hDS1JTS2NEZ3M5WGVoZ0J3QUxRQVEwWkllSWtybEpHcFhOU1M5VkpWcUcwMGs2dVBlZ29MNitpUVIzNkQvWkozNzROVkY3dEdhc0lXSU1rTU9HMkFYbmtKOGhnQ0R3Y2loNGJBMHBsRVhXZEZvTktiUU1BWlNCYnFzcFd3OUpiUW1VVUVvV1Z3VzZOZXhPRVVLdW0vWVBOdCs4SVA5VnhmWjREZExLU0IxMkNvZ29Bd0dROW1uT2tEWjVVZE9qcHdxcWxrUkUzd2hMRTFkb3ZINWpwNWNCOEhzYytmWElEcE4zT0N6V2hWU3JBczBHbjFHejRVTC8zZ3BYZUQ5Vm9LUzBaQjlCUktwZ2N2bElwRTBralNVcHdxUmtERUtYei9DTCtLRGFyMU9GSks3enArc1VmSW1aczZ2cWJoVUg1YmtvdEZvRGZDL3NDb0thK2JrdldubW9nMWxORGFpOElyNWhZVUdBQkJnSURxZFRpQVFWQ3FDQ3N0dGxsdmxoVDZrQ3NNR3l1UWh1cEk0b1crOVFEejNDWkdFSlRVMGtMaFVsUlgrYlI2RUp0V3NIZDZiUnVTM2hTR3FpbzR1TEN2N3I0QjhCZ0FBY3JRY3pScW9yUFBub0tFUUlHdHRscXpFNVFiYmFnTUJmZG0yUWpTOHF3STBtM1J3Ylg1N3VpSnNvSnJFVENXZVFjc21jWkd4SW1tZVR3VVhwR0dyVlM0UVlHQWpLUW82Uk9kd1NUNEJwT0lTZUgyc2JQMEpodURnMFNKNXFGb1lHS3hkV3E2MHdzZUFYWFJ5dnYxSGFac3Ztb3JrK28xNEJqd3VWRHVDUERDYkFXZXhRNGxUd29XeHVyb2FqOGN4b0RLMEFJSTMwSWNoTFFWTUUrZG16TE5hK2x6V2YxaEZ5T1dBYjU1STJwRzIvZjRVemlHNEFLSnkySkNya1NMd01iaFlxbzlnbFdNRUFNQ0dNeHNOQ0FqU1liaHhES01ndVgrQmVHaVdjREkxbytSOHBwRjF1dENBUVdOd09rNzZRZUkxQkZzaEtEekY5U08xUkNrQ3NmVFJoNVBMdlhOTHh6cFdMUWw0YWd3VUI1Sy9leDRPMktXa0dNYUNheCtEaVBhakV4UldSMjF0WDh2eEEwM2oweCtwRWZCSm94aGUvSnpMN2QwSXd6QWF5TWtUaVRBSVJIM1cvL0xSaDh1OXZiOTUrWVVYWG5ucUZDQ1FLNVFuajVZWmxMTmtTQ2tPc3U2OGM5KytQWHYyUExmbmh6ZkMzUEY1WTlmckJhZGdROUE1OElFSGNpK3ZlM3E1dDdPdG83WjFkTkNUaEtlSlltZEYvY0xkMzM5ZUlKY1BTL1VIWStRTFkvUy92WGp6L2g5Y3czM2s5YXhwdkFIZWoxTUlnK25pS0R3RGU5M3dtRUxVNWRkVnd0VGw2N1RFZnB1ejlMa25FV2lCd0lkMDZDcExmTmI5MTNqcDJiUjh1dGZpQ2RSRnlDd3lxY0ZQb3pFNFJpUGUwYWpFcVhtOElKa1ZrWmhOZGRyK2hlODlDY2RGNE1NMnh5RGd3V3UrdnYxaTkrN2R2OXo5K3ovLzlmMzMzdnZEdSsvK0UyNVRwUUZiOFNWZjZrd212Um1ldllYbUVYMy9mVGMreFFZRTlGRGVLOWV1QVY5MnQyeTU2V2ViTm0yNjVaWmJYdHV4WStkanUzYnQyclp0MjhhTkc3OEJjL01Wbm5qaThjZS8rNTFuYjMvbW1kdC9zditHREJreVpNaVFJVU9HREJreVpQaDYrRGVDTDRabVFhN0dQUUFBQUFCSlJVNUVya0pnZ2c9PVwiXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHdhcnJhbnR5U2VydmljZSA9IG5ldyBXYXJyYW50eVNlcnZpY2UoKTsiXX0=