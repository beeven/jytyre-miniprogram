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
var warranty_service_1 = require("../warranty.service");
var moment = require("moment-mini-ts");
var warrantListItem_1 = require("../warrantListItem");
Page({
    data: {
        viewMode: true,
        canDelete: false
    },
    onLoad: function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var warrantyID, ret, viewData, fileIDs, urls, updates_1, ctx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        warrantyID = options["id"];
                        return [4, warranty_service_1.warrantyService.getWarrantyItemDetail(warrantyID)];
                    case 1:
                        ret = _a.sent();
                        viewData = {
                            warrantyID: warrantyID,
                            thumbnail: ret.thumbnail || "",
                            plateNumber: ret.plateNumber || "",
                            plateImageFileID: ret.plateImageFileID || "",
                            shopName: ret.shopName || "",
                            shopImageFileID: ret.shopImageFileID || "",
                            shopAddress: ret.shopAddress || "",
                            tyreModelImageFileID: ret.tyreModelImageFileID || "",
                            tyreInstallationImageFileID: ret.tyreInstallationImageFileID || "",
                            datePurchased: moment(ret.datePurchased).format("YYYY-MM-DD"),
                            endDate: moment(ret.endDate).format("YYYY-MM-DD"),
                            approvalStatus: ret.approvalStatus || warranty_service_1.ApprovalStatus.drafting,
                            viewMode: ret.approvalStatus == warranty_service_1.ApprovalStatus.pending || ret.approvalStatus == warranty_service_1.ApprovalStatus.approved,
                            canDelete: ret.approvalStatus == warranty_service_1.ApprovalStatus.drafting,
                        };
                        if (ret.shopLocation) {
                            viewData["shopLocation"] = {
                                longtitude: ret.shopLocation.longtitude,
                                latitude: ret.shopLocation.latitude
                            };
                        }
                        this.setData(viewData);
                        fileIDs = [{ name: "plateImageFileID", value: this.data.plateImageFileID },
                            { name: "shopImageFileID", value: this.data.shopImageFileID },
                            { name: "tyreModelImageFileID", value: this.data.tyreModelImageFileID },
                            { name: "tyreInstallationImageFileID", value: this.data.tyreInstallationImageFileID }].filter(function (x) { return !!x.value; });
                        if (!(fileIDs.length > 0)) return [3, 3];
                        return [4, wx.cloud.getTempFileURL({
                                fileList: fileIDs.map(function (x) { return x.value; }),
                            })];
                    case 2:
                        urls = _a.sent();
                        updates_1 = {};
                        urls.fileList.forEach(function (f) {
                            var x = fileIDs.find(function (i) { return i.value == f.fileID; });
                            if (x && f.status == 0) {
                                updates_1[x.name.replace("ImageFileID", "ImageFileUrl")] = f.tempFileURL;
                            }
                        });
                        this.setData(__assign({}, updates_1));
                        _a.label = 3;
                    case 3:
                        if (this.data.thumbnail) {
                            console.log("drawing thumbnail");
                            ctx = wx.createCanvasContext("cropCanvas");
                            ctx.drawImage(this.data.thumbnail, 0, 0, 50, 50);
                            ctx.draw();
                        }
                        return [2];
                }
            });
        });
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onUnload: function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages, page, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pages = getCurrentPages();
                        page = pages[pages.length - 2];
                        item = new warrantListItem_1.WarrantyListItem(this.data.warrantyID, this.data.plateNumber || '车牌未填写', '', this.data.thumbnail, this.data.approvalStatus, this.data.isDeleting);
                        return [4, page.UpdateItem(this.data.warrantyID, item)];
                    case 1:
                        _a.sent();
                        if (!!this.data.isDeleting) return [3, 3];
                        return [4, warranty_service_1.warrantyService.updateWarrantyItem(this.data.warrantyID, {
                                plateImageFileID: this.data.plateImageFileID,
                                plateNumber: this.data.plateNumber,
                                datePurchased: moment(this.data.datePurchased).toDate(),
                                shopAddress: this.data.shopAddress,
                                shopImageFileID: this.data.shopImageFileID,
                                shopName: this.data.shopName,
                                tyreModelImageFileID: this.data.tyreModelImageFileID,
                                tyreInstallationImageFileID: this.data.tyreInstallationImageFileID,
                                approvalStatus: this.data.approvalStatus,
                                thumbnail: this.data.thumbnail
                            }, this.data.shopLocation ? {
                                longtitude: this.data.shopLocation.longtitude,
                                latitude: this.data.shopLocation.latitude
                            } : undefined)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    },
    onDateChanged: function (e) {
        this.setData({
            datePurchased: e.detail.value
        });
    },
    onGetLocation: function () {
        var _this = this;
        wx.chooseLocation({
            success: function (res) {
                _this.setData({
                    shopAddress: res.address,
                    shopLocation: {
                        latitude: res.latitude,
                        longtitude: res.longitude
                    },
                    shopName: res.name
                });
            },
            fail: function (err) {
                wx.showToast({
                    title: '获取定位失败',
                    icon: 'none',
                    duration: 2000
                });
            }
        });
    },
    onScanPlate: function () {
        return __awaiter(this, void 0, void 0, function () {
            var imgFileUrl, imgFile, err_1, thumbnailData, ret, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.viewMode) {
                            wx.previewImage({
                                urls: [this.data.plateImageFileUrl]
                            });
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, new Promise(function (resolve, reject) {
                                wx.chooseImage({
                                    count: 1,
                                    sizeType: ['compressed'],
                                    sourceType: ['album', 'camera'],
                                    success: function (res) {
                                        resolve(res.tempFiles[0]);
                                    },
                                    fail: function (err) {
                                        reject(err);
                                    }
                                });
                            })];
                    case 2:
                        imgFile = _a.sent();
                        imgFileUrl = imgFile.path;
                        this.setData({
                            plateImageFileUrl: imgFileUrl
                        });
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2];
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4, this.getThumbnail(imgFileUrl)];
                    case 5:
                        thumbnailData = _a.sent();
                        wx.showLoading({
                            title: '图片上传中'
                        });
                        return [4, warranty_service_1.warrantyService.uploadPlateImage(this.data.warrantyID, imgFileUrl)];
                    case 6:
                        ret = _a.sent();
                        wx.hideLoading();
                        this.setData({
                            thumbnail: thumbnailData,
                            plateNumber: ret.plateNumber,
                            plateImageFileID: ret.fileID
                        });
                        return [3, 8];
                    case 7:
                        err_2 = _a.sent();
                        wx.hideLoading();
                        wx.showModal({
                            title: '提示',
                            content: '照片识别失败，请重新上传，或手动填入车牌',
                            showCancel: false
                        });
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    },
    onPlateInput: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setData({
                    plateNumber: e.detail.value
                });
                return [2];
            });
        });
    },
    chooseImage: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, imageName, imageFilePath, imageFile, err_3, fileID, fileIDProperty, fileUrlProperty;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.data.viewMode) {
                            name_1 = e.currentTarget.dataset["name"];
                            wx.previewImage({
                                urls: [this.data[name_1 + "ImageFileUrl"]],
                            });
                            return [2];
                        }
                        imageName = e.currentTarget.dataset["name"];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, new Promise(function (resolve, reject) {
                                wx.chooseImage({
                                    sizeType: ['original'],
                                    success: function (res) {
                                        resolve(res.tempFiles[0]);
                                    },
                                    fail: function (err) {
                                        reject(err);
                                    }
                                });
                            })];
                    case 2:
                        imageFile = _b.sent();
                        imageFilePath = imageFile.path;
                        return [3, 4];
                    case 3:
                        err_3 = _b.sent();
                        return [2];
                    case 4:
                        wx.showLoading({ "mask": true, "title": "图片上传中" });
                        return [4, warranty_service_1.warrantyService.uploadImage(this.data.warrantyID, imageFilePath, imageName)];
                    case 5:
                        fileID = _b.sent();
                        fileIDProperty = imageName + "ImageFileID";
                        fileUrlProperty = imageName + "ImageFileUrl";
                        this.setData((_a = {},
                            _a[fileIDProperty] = fileID,
                            _a[fileUrlProperty] = imageFilePath,
                            _a));
                        wx.hideLoading();
                        return [2];
                }
            });
        });
    },
    onRemoveWarranty: function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({
                            title: '提交中'
                        });
                        this.setData({
                            isDeleting: true
                        });
                        return [4, warranty_service_1.warrantyService.removeWarrantyItem(this.data.warrantyID)];
                    case 1:
                        _a.sent();
                        pages = getCurrentPages();
                        console.log(pages);
                        page = pages[pages.length - 2];
                        wx.hideLoading();
                        wx.navigateBack({
                            delta: 1,
                        });
                        return [2];
                }
            });
        });
    },
    previewImage: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                name = e.currentTarget.dataset["name"];
                wx.previewImage({
                    urls: [this.data[name + "ImageFileUrl"]]
                });
                return [2];
            });
        });
    },
    onSubmit: function (e) {
        var _this = this;
        if (!this.data.shopAddress) {
            wx.showModal({ title: "提示", content: "门店地址还没有填写哦！", showCancel: false });
            return;
        }
        if (!this.data.shopName) {
            wx.showModal({ title: "提示", content: "门店名称还没有填写哦！", showCancel: false });
            return;
        }
        if (!this.data.shopImageFileID) {
            wx.showModal({ title: "提示", content: "门店照片还没有上传哦！", showCancel: false });
            return;
        }
        if (!this.data.plateNumber) {
            wx.showModal({ title: "提示", content: "车牌号码还没有填写哦！", showCancel: false });
            return;
        }
        if (!this.data.tyreModelImageFileID) {
            wx.showModal({ title: "提示", content: "轮胎型号照片还没有上传哦！", showCancel: false });
            return;
        }
        if (!this.data.tyreInstallationImageFileID) {
            wx.showModal({ title: "提示", content: "轮胎安装照片还没有上传哦！", showCancel: false });
            return;
        }
        wx.showModal({
            title: '提示',
            content: '提交后将进入审核环节，无法修改，请确认资料是否填写无误',
            confirmText: '提交',
            cancelText: '返回',
            success: function (res) {
                if (res.confirm) {
                    _this.setData({
                        approvalStatus: warranty_service_1.ApprovalStatus.pending,
                        canDelete: false,
                        viewMode: true,
                    });
                    wx.navigateBack({
                        delta: 1
                    });
                }
            }
        });
    },
    getThumbnail: function (imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, path, manager, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = wx.createCanvasContext('cropCanvas');
                        ctx.drawImage(imageUrl, 0, 0, 50, 50);
                        return [4, new Promise(function (resolve, reject) { return ctx.draw(false, resolve); })];
                    case 1:
                        _a.sent();
                        return [4, new Promise(function (resolve, reject) {
                                wx.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: 50,
                                    height: 50,
                                    canvasId: 'cropCanvas',
                                    fileType: "jpg",
                                    quality: 1,
                                    success: function (res) {
                                        resolve(res.tempFilePath);
                                    },
                                    fail: function (err) {
                                        console.error(err);
                                        reject(err);
                                    }
                                });
                            })];
                    case 2:
                        path = _a.sent();
                        manager = wx.getFileSystemManager();
                        return [4, new Promise(function (resolve, reject) {
                                manager.readFile({
                                    filePath: path,
                                    encoding: 'base64',
                                    success: function (res) {
                                        resolve(res.data);
                                    },
                                    fail: function (err) {
                                        reject(err);
                                    }
                                });
                            })];
                    case 3:
                        data = _a.sent();
                        return [2, "data:image/jpeg;base64," + data];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFzRTtBQUV0RSx1Q0FBeUM7QUFFekMsc0RBQXNEO0FBNkJ0RCxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxLQUFLO0tBQ087SUFFckIsTUFBTSxFQUFaLFVBQWEsT0FBTzs7Ozs7O3dCQUNaLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUM7d0JBRXRCLFdBQU0sa0NBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsRUFBQTs7d0JBQTdELEdBQUcsR0FBRyxTQUF1RDt3QkFFN0QsUUFBUSxHQUFHOzRCQUNYLFVBQVUsRUFBRSxVQUFVOzRCQUN0QixTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFOzRCQUM5QixXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFOzRCQUNsQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRTs0QkFDNUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRTs0QkFDNUIsZUFBZSxFQUFFLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRTs0QkFDMUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRTs0QkFDbEMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLG9CQUFvQixJQUFJLEVBQUU7NEJBQ3BELDJCQUEyQixFQUFFLEdBQUcsQ0FBQywyQkFBMkIsSUFBSSxFQUFFOzRCQUNsRSxhQUFhLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUM3RCxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxP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QUMsT0FBTyxFQUFDLE1BQU07Z0NBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQztvQ0FDckUsUUFBUSxFQUFFLElBQUk7b0NBQ2QsUUFBUSxFQUFFLFFBQVE7b0NBQ2xCLE9BQU8sRUFBRSxVQUFBLEdBQUc7d0NBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFjLENBQUMsQ0FBQztvQ0FDaEMsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsVUFBQSxHQUFHO3dDQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDaEIsQ0FBQztpQ0FDSixDQUFDLENBQUE7NEJBQUEsQ0FBQyxDQUFDLEVBQUE7O3dCQVRBLElBQUksR0FBVSxTQVNkO3dCQUNKLFdBQU8seUJBQXlCLEdBQUMsSUFBSSxFQUFDOzs7O0tBQ3pDO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IHdhcnJhbnR5U2VydmljZSwgQXBwcm92YWxTdGF0dXMgfSBmcm9tICcuLi93YXJyYW50eS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50LW1pbmktdHNcIjtcclxuaW1wb3J0IHsgV2FycmFudHlQYWdlIH0gZnJvbSAnLi4vd2FycmFudHknO1xyXG5pbXBvcnQgeyBXYXJyYW50eUxpc3RJdGVtIH0gZnJvbSAnLi4vd2FycmFudExpc3RJdGVtJztcclxuXHJcbmludGVyZmFjZSBXYXJyYW50eURldGFpbFBhZ2VEYXRhIHtcclxuICAgIHdhcnJhbnR5SUQ6IHN0cmluZztcclxuICAgIHRodW1ibmFpbDogc3RyaW5nO1xyXG4gICAgc2hvcE5hbWU6IHN0cmluZztcclxuICAgIHNob3BJbWFnZUZpbGVJRDogc3RyaW5nO1xyXG4gICAgc2hvcEltYWdlRmlsZVVybDogc3RyaW5nO1xyXG4gICAgc2hvcEFkZHJlc3M6IHN0cmluZztcclxuICAgIHNob3BMb2NhdGlvbj86IHtcclxuICAgICAgICBsb25ndGl0dWRlOiBudW1iZXIsXHJcbiAgICAgICAgbGF0aXR1ZGU6IG51bWJlclxyXG4gICAgfVxyXG4gICAgZGF0ZVB1cmNoYXNlZDogc3RyaW5nO1xyXG4gICAgZW5kRGF0ZTogc3RyaW5nO1xyXG4gICAgYXBwcm92YWxTdGF0dXM6IEFwcHJvdmFsU3RhdHVzO1xyXG4gICAgcGxhdGVOdW1iZXI6IHN0cmluZztcclxuICAgIHBsYXRlSW1hZ2VGaWxlSUQ6IHN0cmluZztcclxuICAgIHBsYXRlSW1hZ2VGaWxlVXJsOiBzdHJpbmc7XHJcbiAgICB0eXJlTW9kZWxJbWFnZUZpbGVJRDogc3RyaW5nO1xyXG4gICAgdHlyZU1vZGVsSW1hZ2VGaWxlVXJsOiBzdHJpbmc7XHJcbiAgICB0eXJlSW5zdGFsbGF0aW9uSW1hZ2VGaWxlSUQ6IHN0cmluZztcclxuICAgIHR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVVcmw6IHN0cmluZztcclxuICAgIHZpZXdNb2RlOiBib29sZWFuO1xyXG4gICAgY2FuRGVsZXRlOiBib29sZWFuO1xyXG4gICAgaXNEZWxldGluZzogYm9vbGVhbjtcclxufVxyXG5cclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIHZpZXdNb2RlOiB0cnVlLFxyXG4gICAgICAgIGNhbkRlbGV0ZTogZmFsc2VcclxuICAgIH0gYXMgV2FycmFudHlEZXRhaWxQYWdlRGF0YSxcclxuXHJcbiAgICBhc3luYyBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCB3YXJyYW50eUlEID0gb3B0aW9uc1tcImlkXCJdITtcclxuXHJcbiAgICAgICAgbGV0IHJldCA9IGF3YWl0IHdhcnJhbnR5U2VydmljZS5nZXRXYXJyYW50eUl0ZW1EZXRhaWwod2FycmFudHlJRCk7XHJcblxyXG4gICAgICAgIGxldCB2aWV3RGF0YSA9IHtcclxuICAgICAgICAgICAgd2FycmFudHlJRDogd2FycmFudHlJRCxcclxuICAgICAgICAgICAgdGh1bWJuYWlsOiByZXQudGh1bWJuYWlsIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIHBsYXRlTnVtYmVyOiByZXQucGxhdGVOdW1iZXIgfHwgXCJcIixcclxuICAgICAgICAgICAgcGxhdGVJbWFnZUZpbGVJRDogcmV0LnBsYXRlSW1hZ2VGaWxlSUQgfHwgXCJcIixcclxuICAgICAgICAgICAgc2hvcE5hbWU6IHJldC5zaG9wTmFtZSB8fCBcIlwiLFxyXG4gICAgICAgICAgICBzaG9wSW1hZ2VGaWxlSUQ6IHJldC5zaG9wSW1hZ2VGaWxlSUQgfHwgXCJcIixcclxuICAgICAgICAgICAgc2hvcEFkZHJlc3M6IHJldC5zaG9wQWRkcmVzcyB8fCBcIlwiLFxyXG4gICAgICAgICAgICB0eXJlTW9kZWxJbWFnZUZpbGVJRDogcmV0LnR5cmVNb2RlbEltYWdlRmlsZUlEIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIHR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRDogcmV0LnR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRCB8fCBcIlwiLFxyXG4gICAgICAgICAgICBkYXRlUHVyY2hhc2VkOiBtb21lbnQocmV0LmRhdGVQdXJjaGFzZWQpLmZvcm1hdChcIllZWVktTU0tRERcIiksXHJcbiAgICAgICAgICAgIGVuZERhdGU6IG1vbWVudChyZXQuZW5kRGF0ZSkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSxcclxuICAgICAgICAgICAgYXBwcm92YWxTdGF0dXM6IHJldC5hcHByb3ZhbFN0YXR1cyB8fCBBcHByb3ZhbFN0YXR1cy5kcmFmdGluZyxcclxuICAgICAgICAgICAgdmlld01vZGU6IHJldC5hcHByb3ZhbFN0YXR1cyA9PSBBcHByb3ZhbFN0YXR1cy5wZW5kaW5nIHx8IHJldC5hcHByb3ZhbFN0YXR1cyA9PSBBcHByb3ZhbFN0YXR1cy5hcHByb3ZlZCxcclxuICAgICAgICAgICAgY2FuRGVsZXRlOiByZXQuYXBwcm92YWxTdGF0dXMgPT0gQXBwcm92YWxTdGF0dXMuZHJhZnRpbmcsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmV0LnNob3BMb2NhdGlvbikge1xyXG4gICAgICAgICAgICB2aWV3RGF0YVtcInNob3BMb2NhdGlvblwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGxvbmd0aXR1ZGU6IHJldC5zaG9wTG9jYXRpb24hLmxvbmd0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogcmV0LnNob3BMb2NhdGlvbiEubGF0aXR1ZGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHZpZXdEYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVJRHMgPSBbeyBuYW1lOiBcInBsYXRlSW1hZ2VGaWxlSURcIiwgdmFsdWU6IHRoaXMuZGF0YS5wbGF0ZUltYWdlRmlsZUlEIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcInNob3BJbWFnZUZpbGVJRFwiLCB2YWx1ZTogdGhpcy5kYXRhLnNob3BJbWFnZUZpbGVJRCB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJ0eXJlTW9kZWxJbWFnZUZpbGVJRFwiLCB2YWx1ZTogdGhpcy5kYXRhLnR5cmVNb2RlbEltYWdlRmlsZUlEIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcInR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRFwiLCB2YWx1ZTogdGhpcy5kYXRhLnR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRCB9XS5maWx0ZXIoeCA9PiAhIXgudmFsdWUpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGZpbGVJRHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdXJscyA9IGF3YWl0IHd4LmNsb3VkLmdldFRlbXBGaWxlVVJMKHtcclxuICAgICAgICAgICAgICAgIGZpbGVMaXN0OiBmaWxlSURzLm1hcCh4ID0+IHgudmFsdWUpLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVzOiB7IFt4OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xyXG4gICAgICAgICAgICB1cmxzLmZpbGVMaXN0LmZvckVhY2goZiA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGZpbGVJRHMuZmluZChpID0+IGkudmFsdWUgPT0gZi5maWxlSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHggJiYgZi5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZXNbeC5uYW1lLnJlcGxhY2UoXCJJbWFnZUZpbGVJRFwiLCBcIkltYWdlRmlsZVVybFwiKV0gPSBmLnRlbXBGaWxlVVJMO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHsgLi4udXBkYXRlcyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGF0YS50aHVtYm5haWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkcmF3aW5nIHRodW1ibmFpbFwiKVxyXG4gICAgICAgICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwiY3JvcENhbnZhc1wiKTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmRhdGEudGh1bWJuYWlsLCAwLDAsNTAsNTApO1xyXG4gICAgICAgICAgICBjdHguZHJhdygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmRhdGFbXCJjcm9wQ2FudmFzQ29udGV4dFwiXSA9IGN0eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgb25SZWFkeSgpe1xyXG4gICAgfSxcclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwib25TaG93XCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBvblVubG9hZCgpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwib25VbmxvYWRcIilcclxuXHJcbiAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXSBhcyB1bmtub3duIGFzIFdhcnJhbnR5UGFnZTtcclxuXHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gbmV3IFdhcnJhbnR5TGlzdEl0ZW0odGhpcy5kYXRhLndhcnJhbnR5SUQsIHRoaXMuZGF0YS5wbGF0ZU51bWJlciB8fCAn6L2m54mM5pyq5aGr5YaZJywgJycsIHRoaXMuZGF0YS50aHVtYm5haWwsIHRoaXMuZGF0YS5hcHByb3ZhbFN0YXR1cywgdGhpcy5kYXRhLmlzRGVsZXRpbmcpO1xyXG4gICAgICAgIGF3YWl0IHBhZ2UuVXBkYXRlSXRlbSh0aGlzLmRhdGEud2FycmFudHlJRCwgaXRlbSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLmlzRGVsZXRpbmcpIHtcclxuICAgICAgICAgICAgYXdhaXQgd2FycmFudHlTZXJ2aWNlLnVwZGF0ZVdhcnJhbnR5SXRlbSh0aGlzLmRhdGEud2FycmFudHlJRCwge1xyXG4gICAgICAgICAgICAgICAgcGxhdGVJbWFnZUZpbGVJRDogdGhpcy5kYXRhLnBsYXRlSW1hZ2VGaWxlSUQsXHJcbiAgICAgICAgICAgICAgICBwbGF0ZU51bWJlcjogdGhpcy5kYXRhLnBsYXRlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgZGF0ZVB1cmNoYXNlZDogbW9tZW50KHRoaXMuZGF0YS5kYXRlUHVyY2hhc2VkKS50b0RhdGUoKSxcclxuICAgICAgICAgICAgICAgIHNob3BBZGRyZXNzOiB0aGlzLmRhdGEuc2hvcEFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBzaG9wSW1hZ2VGaWxlSUQ6IHRoaXMuZGF0YS5zaG9wSW1hZ2VGaWxlSUQsXHJcbiAgICAgICAgICAgICAgICBzaG9wTmFtZTogdGhpcy5kYXRhLnNob3BOYW1lLFxyXG4gICAgICAgICAgICAgICAgdHlyZU1vZGVsSW1hZ2VGaWxlSUQ6IHRoaXMuZGF0YS50eXJlTW9kZWxJbWFnZUZpbGVJRCxcclxuICAgICAgICAgICAgICAgIHR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRDogdGhpcy5kYXRhLnR5cmVJbnN0YWxsYXRpb25JbWFnZUZpbGVJRCxcclxuICAgICAgICAgICAgICAgIGFwcHJvdmFsU3RhdHVzOiB0aGlzLmRhdGEuYXBwcm92YWxTdGF0dXMsXHJcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6IHRoaXMuZGF0YS50aHVtYm5haWxcclxuICAgICAgICAgICAgfSwgdGhpcy5kYXRhLnNob3BMb2NhdGlvbiA/IHtcclxuICAgICAgICAgICAgICAgIGxvbmd0aXR1ZGU6IHRoaXMuZGF0YS5zaG9wTG9jYXRpb24hLmxvbmd0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5kYXRhLnNob3BMb2NhdGlvbiEubGF0aXR1ZGVcclxuICAgICAgICAgICAgfSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRhdGVDaGFuZ2VkKGU6IGV2ZW50LklucHV0KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgZGF0ZVB1cmNoYXNlZDogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkdldExvY2F0aW9uKCkge1xyXG4gICAgICAgIHd4LmNob29zZUxvY2F0aW9uKHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvcEFkZHJlc3M6IHJlcy5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3BMb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogcmVzLmxhdGl0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25ndGl0dWRlOiByZXMubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzaG9wTmFtZTogcmVzLm5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+iOt+WPluWumuS9jeWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgb25TY2FuUGxhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS52aWV3TW9kZSkge1xyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogW3RoaXMuZGF0YS5wbGF0ZUltYWdlRmlsZVVybF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbWdGaWxlVXJsOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBpbWdGaWxlID0gYXdhaXQgbmV3IFByb21pc2U8d3guSW1hZ2VGaWxlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy50ZW1wRmlsZXNbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaW1nRmlsZVVybCA9IGltZ0ZpbGUucGF0aDtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHBsYXRlSW1hZ2VGaWxlVXJsOiBpbWdGaWxlVXJsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IHRodW1ibmFpbERhdGEgPSBhd2FpdCB0aGlzLmdldFRodW1ibmFpbChpbWdGaWxlVXJsKTtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6J+WbvueJh+S4iuS8oOS4rSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSBhd2FpdCB3YXJyYW50eVNlcnZpY2UudXBsb2FkUGxhdGVJbWFnZSh0aGlzLmRhdGEud2FycmFudHlJRCwgaW1nRmlsZVVybCk7XHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6IHRodW1ibmFpbERhdGEsXHJcbiAgICAgICAgICAgICAgICBwbGF0ZU51bWJlcjogcmV0LnBsYXRlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgcGxhdGVJbWFnZUZpbGVJRDogcmV0LmZpbGVJRFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnhafniYfor4bliKvlpLHotKXvvIzor7fph43mlrDkuIrkvKDvvIzmiJbmiYvliqjloavlhaXovabniYwnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIG9uUGxhdGVJbnB1dChlOiBldmVudC5JbnB1dEJsdXIpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwbGF0ZU51bWJlcjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgYXN5bmMgY2hvb3NlSW1hZ2UoZTogZXZlbnQuVG91Y2gpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnZpZXdNb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRbXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogW3RoaXMuZGF0YVtuYW1lICsgXCJJbWFnZUZpbGVVcmxcIl1dLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW1hZ2VOYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRbXCJuYW1lXCJdO1xyXG4gICAgICAgIGxldCBpbWFnZUZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGltYWdlRmlsZSA9IGF3YWl0IG5ldyBQcm9taXNlPHd4LkltYWdlRmlsZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMudGVtcEZpbGVzWzBdKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpbWFnZUZpbGVQYXRoID0gaW1hZ2VGaWxlLnBhdGg7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHsgXCJtYXNrXCI6IHRydWUsIFwidGl0bGVcIjogXCLlm77niYfkuIrkvKDkuK1cIiB9KVxyXG5cclxuICAgICAgICBsZXQgZmlsZUlEID0gYXdhaXQgd2FycmFudHlTZXJ2aWNlLnVwbG9hZEltYWdlKHRoaXMuZGF0YS53YXJyYW50eUlELCBpbWFnZUZpbGVQYXRoLCBpbWFnZU5hbWUpO1xyXG4gICAgICAgIGxldCBmaWxlSURQcm9wZXJ0eSA9IGltYWdlTmFtZSArIFwiSW1hZ2VGaWxlSURcIjtcclxuICAgICAgICBsZXQgZmlsZVVybFByb3BlcnR5ID0gaW1hZ2VOYW1lICsgXCJJbWFnZUZpbGVVcmxcIjtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBbZmlsZUlEUHJvcGVydHldOiBmaWxlSUQsXHJcbiAgICAgICAgICAgIFtmaWxlVXJsUHJvcGVydHldOiBpbWFnZUZpbGVQYXRoXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgb25SZW1vdmVXYXJyYW50eSgpIHtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk5LitJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzRGVsZXRpbmc6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIGF3YWl0IHdhcnJhbnR5U2VydmljZS5yZW1vdmVXYXJyYW50eUl0ZW0odGhpcy5kYXRhLndhcnJhbnR5SUQpO1xyXG4gICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhZ2VzKTtcclxuICAgICAgICBsZXQgcGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdIGFzIHVua25vd24gYXMgV2FycmFudHlQYWdlO1xyXG4gICAgICAgIC8vYXdhaXQgcGFnZS5vbkl0ZW1SZW1vdmVkKHRoaXMuZGF0YS53YXJyYW50eUlEKTtcclxuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgIGRlbHRhOiAxLFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHByZXZpZXdJbWFnZShlOiBldmVudC5Ub3VjaCkge1xyXG4gICAgICAgIGxldCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRbXCJuYW1lXCJdO1xyXG4gICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgIHVybHM6IFt0aGlzLmRhdGFbbmFtZSArIFwiSW1hZ2VGaWxlVXJsXCJdXVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG9uU3VibWl0KGU6IGV2ZW50LlRvdWNoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuc2hvcEFkZHJlc3MpIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6IFwi5o+Q56S6XCIsIGNvbnRlbnQ6IFwi6Zeo5bqX5Zyw5Z2A6L+Y5rKh5pyJ5aGr5YaZ5ZOm77yBXCIsIHNob3dDYW5jZWw6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5zaG9wTmFtZSkge1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogXCLmj5DnpLpcIiwgY29udGVudDogXCLpl6jlupflkI3np7Dov5jmsqHmnInloavlhpnlk6bvvIFcIiwgc2hvd0NhbmNlbDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLnNob3BJbWFnZUZpbGVJRCkge1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoeyB0aXRsZTogXCLmj5DnpLpcIiwgY29udGVudDogXCLpl6jlupfnhafniYfov5jmsqHmnInkuIrkvKDlk6bvvIFcIiwgc2hvd0NhbmNlbDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLnBsYXRlTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7IHRpdGxlOiBcIuaPkOekulwiLCBjb250ZW50OiBcIui9pueJjOWPt+eggei/mOayoeacieWhq+WGmeWTpu+8gVwiLCBzaG93Q2FuY2VsOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEudHlyZU1vZGVsSW1hZ2VGaWxlSUQpIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6IFwi5o+Q56S6XCIsIGNvbnRlbnQ6IFwi6L2u6IOO5Z6L5Y+354Wn54mH6L+Y5rKh5pyJ5LiK5Lyg5ZOm77yBXCIsIHNob3dDYW5jZWw6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS50eXJlSW5zdGFsbGF0aW9uSW1hZ2VGaWxlSUQpIHtcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHsgdGl0bGU6IFwi5o+Q56S6XCIsIGNvbnRlbnQ6IFwi6L2u6IOO5a6J6KOF54Wn54mH6L+Y5rKh5pyJ5LiK5Lyg5ZOm77yBXCIsIHNob3dDYW5jZWw6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmj5DkuqTlkI7lsIbov5vlhaXlrqHmoLjnjq/oioLvvIzml6Dms5Xkv67mlLnvvIzor7fnoa7orqTotYTmlpnmmK/lkKbloavlhpnml6Dor68nLFxyXG4gICAgICAgICAgICBjb25maXJtVGV4dDogJ+aPkOS6pCcsXHJcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICfov5Tlm54nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwcm92YWxTdGF0dXM6IEFwcHJvdmFsU3RhdHVzLnBlbmRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbkRlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRUaHVtYm5haWwoaW1hZ2VVcmw6IHN0cmluZyk6UHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdjcm9wQ2FudmFzJyk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZVVybCwgMCwgMCwgNTAsIDUwKTtcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT4gY3R4LmRyYXcoZmFsc2UsIHJlc29sdmUpKTtcclxuXHJcbiAgICAgICAgbGV0IHBhdGg6IHN0cmluZyA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUwLFxyXG4gICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdjcm9wQ2FudmFzJyxcclxuICAgICAgICAgICAgICAgIGZpbGVUeXBlOiBcImpwZ1wiLFxyXG4gICAgICAgICAgICAgICAgcXVhbGl0eTogMSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbWFuYWdlciA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKCk7XHJcbiAgICAgICAgbGV0IGRhdGE6c3RyaW5nID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+eyBtYW5hZ2VyLnJlYWRGaWxlKHtcclxuICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0JyxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSl9KTtcclxuICAgICAgICByZXR1cm4gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiK2RhdGE7XHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==