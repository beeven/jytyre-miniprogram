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
var cloud = require("wx-server-sdk");
var licensePlate_1 = require("./licensePlate");
cloud.init();
function main(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        var fileID, res, buffer, imgData, ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileID = event.fileID;
                    return [4, cloud.downloadFile({
                            fileID: fileID
                        })];
                case 1:
                    res = _a.sent();
                    buffer = res.fileContent;
                    imgData = buffer.toString("base64");
                    return [4, licensePlate_1.scanPlate(imgData)];
                case 2:
                    ret = _a.sent();
                    if (ret.words_result) {
                        return [2, {
                                number: ret.words_result.number,
                                probability: ret.words_result.probability[0],
                                error_code: null,
                                error_msg: null
                            }];
                    }
                    else {
                        return [2, {
                                error_msg: ret.error_msg,
                                error_code: ret.error_code
                            }];
                    }
                    return [2];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEscUNBQXVDO0FBQ3ZDLCtDQUE2RDtBQUU3RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7QUFLWixTQUFzQixJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU87Ozs7OztvQkFFL0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ2hCLFdBQU0sS0FBSyxDQUFDLFlBQVksQ0FBQzs0QkFDakMsTUFBTSxFQUFFLE1BQU07eUJBQ2pCLENBQUMsRUFBQTs7b0JBRkksR0FBRyxHQUFHLFNBRVY7b0JBQ0ksTUFBTSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7b0JBQzNCLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixXQUFNLHdCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUE5QixHQUFHLEdBQUcsU0FBd0I7b0JBQ2xDLElBQUcsR0FBRyxDQUFDLFlBQVksRUFBRTt3QkFDakIsV0FBTztnQ0FDSCxNQUFNLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dDQUMvQixXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dDQUM1QyxVQUFVLEVBQUUsSUFBSTtnQ0FDaEIsU0FBUyxFQUFFLElBQUk7NkJBQ2xCLEVBQUE7cUJBQ0o7eUJBQU07d0JBQ0gsV0FBTztnQ0FDSCxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVM7Z0NBQ3hCLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVTs2QkFDN0IsRUFBQTtxQkFDSjs7Ozs7Q0FVSjtBQS9CRCxvQkErQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDkupHlh73mlbDlhaXlj6Pmlofku7ZcclxuLy9jb25zdCBjbG91ZCA9IHJlcXVpcmUoJ3d4LXNlcnZlci1zZGsnKTtcclxuaW1wb3J0ICogYXMgY2xvdWQgZnJvbSAnd3gtc2VydmVyLXNkayc7XHJcbmltcG9ydCB7c2NhblBsYXRlLCBzY2FuUGxhdGVGcm9tRmlsZSB9IGZyb20gXCIuL2xpY2Vuc2VQbGF0ZVwiO1xyXG5cclxuY2xvdWQuaW5pdCgpXHJcblxyXG5cclxuXHJcbi8vIOS6keWHveaVsOWFpeWPo+WHveaVsFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWFpbihldmVudCwgY29udGV4dCkge1xyXG4gICAgLy9jb25zdCB3eENvbnRleHQgPSBjbG91ZC5nZXRXWENvbnRleHQoKVxyXG4gICAgY29uc3QgZmlsZUlEID0gZXZlbnQuZmlsZUlEO1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgY2xvdWQuZG93bmxvYWRGaWxlKHtcclxuICAgICAgICBmaWxlSUQ6IGZpbGVJRFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBidWZmZXIgPSByZXMuZmlsZUNvbnRlbnQ7XHJcbiAgICBsZXQgaW1nRGF0YSA9IGJ1ZmZlci50b1N0cmluZyhcImJhc2U2NFwiKTtcclxuICAgIGxldCByZXQgPSBhd2FpdCBzY2FuUGxhdGUoaW1nRGF0YSk7XHJcbiAgICBpZihyZXQud29yZHNfcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbnVtYmVyOiByZXQud29yZHNfcmVzdWx0Lm51bWJlcixcclxuICAgICAgICAgICAgcHJvYmFiaWxpdHk6IHJldC53b3Jkc19yZXN1bHQucHJvYmFiaWxpdHlbMF0sXHJcbiAgICAgICAgICAgIGVycm9yX2NvZGU6IG51bGwsXHJcbiAgICAgICAgICAgIGVycm9yX21zZzogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3JfbXNnOiByZXQuZXJyb3JfbXNnLFxyXG4gICAgICAgICAgICBlcnJvcl9jb2RlOiByZXQuZXJyb3JfY29kZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyByZXR1cm4ge1xyXG4gICAgLy8gICAgIGV2ZW50LFxyXG4gICAgLy8gICAgIG9wZW5pZDogd3hDb250ZXh0Lk9QRU5JRCxcclxuICAgIC8vICAgICBhcHBpZDogd3hDb250ZXh0LkFQUElELFxyXG4gICAgLy8gICAgIHVuaW9uaWQ6IHd4Q29udGV4dC5VTklPTklELFxyXG4gICAgLy8gfVxyXG59Il19