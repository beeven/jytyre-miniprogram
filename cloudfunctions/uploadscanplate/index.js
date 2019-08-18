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
var db = cloud.database();
function main(event, context) {
    return __awaiter(this, void 0, void 0, function () {
        var fileData, fileExt, warrantyID, scanTask, uploadTask, p, scanTaskResult, uploadTaskResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileData = event.fileData;
                    fileExt = event.fileExt;
                    warrantyID = event.warrantyID;
                    scanTask = licensePlate_1.scanPlate(fileData);
                    uploadTask = cloud.uploadFile({
                        cloudPath: "warranty/" + warrantyID + "/licensePlate" + fileExt,
                        fileContent: Buffer.from(fileData, "base64")
                    }).then(function (res) {
                        return Promise.all([Promise.resolve(res.fileID),
                            db.collection("warranty").doc(warrantyID).update({
                                data: {
                                    plateImageFileID: res.fileID
                                }
                            })]);
                    });
                    return [4, Promise.all([scanTask, uploadTask])];
                case 1:
                    p = _a.sent();
                    scanTaskResult = p[0];
                    uploadTaskResult = p[1];
                    if (scanTaskResult.words_result) {
                        return [2, {
                                fileID: uploadTaskResult[0],
                                number: scanTaskResult.words_result.number,
                                probability: scanTaskResult.words_result.probability[0],
                                error_code: null,
                                error_msg: null
                            }];
                    }
                    else {
                        return [2, {
                                error_msg: scanTaskResult.error_msg,
                                error_code: scanTaskResult.error_code
                            }];
                    }
                    return [2];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEscUNBQXVDO0FBQ3ZDLCtDQUE2RDtBQUU3RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7QUFDWixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFLMUIsU0FBc0IsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPOzs7Ozs7b0JBRy9CLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO29CQUMxQixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDeEIsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7b0JBRWhDLFFBQVEsR0FBRyx3QkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUUvQixVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQzt3QkFDOUIsU0FBUyxFQUFFLGNBQVksVUFBVSxxQkFBZ0IsT0FBUzt3QkFDMUQsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQztxQkFDOUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7d0JBQ1IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDOzRCQUMvQyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0NBQzdDLElBQUksRUFBRTtvQ0FDRixnQkFBZ0IsRUFBRSxHQUFHLENBQUMsTUFBTTtpQ0FDL0I7NkJBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxDQUFDLENBQUMsQ0FBQztvQkFFSyxXQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBQTs7b0JBQTdDLENBQUMsR0FBRyxTQUF5QztvQkFDN0MsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU1QixJQUFHLGNBQWMsQ0FBQyxZQUFZLEVBQUU7d0JBQzVCLFdBQU87Z0NBQ0gsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQ0FDM0IsTUFBTSxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTTtnQ0FDMUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQ0FDdkQsVUFBVSxFQUFFLElBQUk7Z0NBQ2hCLFNBQVMsRUFBRSxJQUFJOzZCQUNsQixFQUFBO3FCQUNKO3lCQUFNO3dCQUNILFdBQU87Z0NBQ0gsU0FBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO2dDQUNuQyxVQUFVLEVBQUUsY0FBYyxDQUFDLFVBQVU7NkJBQ3hDLEVBQUE7cUJBQ0o7Ozs7O0NBVUo7QUFoREQsb0JBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5LqR5Ye95pWw5YWl5Y+j5paH5Lu2XHJcbi8vY29uc3QgY2xvdWQgPSByZXF1aXJlKCd3eC1zZXJ2ZXItc2RrJyk7XHJcbmltcG9ydCAqIGFzIGNsb3VkIGZyb20gJ3d4LXNlcnZlci1zZGsnO1xyXG5pbXBvcnQge3NjYW5QbGF0ZSwgc2NhblBsYXRlRnJvbUZpbGUgfSBmcm9tIFwiLi9saWNlbnNlUGxhdGVcIjtcclxuXHJcbmNsb3VkLmluaXQoKVxyXG5sZXQgZGIgPSBjbG91ZC5kYXRhYmFzZSgpO1xyXG5cclxuXHJcblxyXG4vLyDkupHlh73mlbDlhaXlj6Plh73mlbBcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1haW4oZXZlbnQsIGNvbnRleHQpIHtcclxuICAgIC8vY29uc3Qgd3hDb250ZXh0ID0gY2xvdWQuZ2V0V1hDb250ZXh0KCk7XHJcblxyXG4gICAgY29uc3QgZmlsZURhdGEgPSBldmVudC5maWxlRGF0YTtcclxuICAgIGNvbnN0IGZpbGVFeHQgPSBldmVudC5maWxlRXh0O1xyXG4gICAgY29uc3Qgd2FycmFudHlJRCA9IGV2ZW50LndhcnJhbnR5SUQ7XHJcblxyXG4gICAgbGV0IHNjYW5UYXNrID0gc2NhblBsYXRlKGZpbGVEYXRhKTtcclxuXHJcbiAgICBsZXQgdXBsb2FkVGFzayA9IGNsb3VkLnVwbG9hZEZpbGUoe1xyXG4gICAgICAgIGNsb3VkUGF0aDogYHdhcnJhbnR5LyR7d2FycmFudHlJRH0vbGljZW5zZVBsYXRlJHtmaWxlRXh0fWAsXHJcbiAgICAgICAgZmlsZUNvbnRlbnQ6IEJ1ZmZlci5mcm9tKGZpbGVEYXRhLFwiYmFzZTY0XCIpXHJcbiAgICB9KS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtQcm9taXNlLnJlc29sdmUocmVzLmZpbGVJRCksXHJcbiAgICAgICAgZGIuY29sbGVjdGlvbihcIndhcnJhbnR5XCIpLmRvYyh3YXJyYW50eUlEKS51cGRhdGUoe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwbGF0ZUltYWdlRmlsZUlEOiByZXMuZmlsZUlEXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHAgPSBhd2FpdCBQcm9taXNlLmFsbChbc2NhblRhc2ssIHVwbG9hZFRhc2tdKTtcclxuICAgIGxldCBzY2FuVGFza1Jlc3VsdCA9IHBbMF07XHJcbiAgICBsZXQgdXBsb2FkVGFza1Jlc3VsdCA9IHBbMV07XHJcblxyXG4gICAgaWYoc2NhblRhc2tSZXN1bHQud29yZHNfcmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmlsZUlEOiB1cGxvYWRUYXNrUmVzdWx0WzBdLFxyXG4gICAgICAgICAgICBudW1iZXI6IHNjYW5UYXNrUmVzdWx0LndvcmRzX3Jlc3VsdC5udW1iZXIsXHJcbiAgICAgICAgICAgIHByb2JhYmlsaXR5OiBzY2FuVGFza1Jlc3VsdC53b3Jkc19yZXN1bHQucHJvYmFiaWxpdHlbMF0sXHJcbiAgICAgICAgICAgIGVycm9yX2NvZGU6IG51bGwsXHJcbiAgICAgICAgICAgIGVycm9yX21zZzogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3JfbXNnOiBzY2FuVGFza1Jlc3VsdC5lcnJvcl9tc2csXHJcbiAgICAgICAgICAgIGVycm9yX2NvZGU6IHNjYW5UYXNrUmVzdWx0LmVycm9yX2NvZGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gcmV0dXJuIHtcclxuICAgIC8vICAgICBldmVudCxcclxuICAgIC8vICAgICBvcGVuaWQ6IHd4Q29udGV4dC5PUEVOSUQsXHJcbiAgICAvLyAgICAgYXBwaWQ6IHd4Q29udGV4dC5BUFBJRCxcclxuICAgIC8vICAgICB1bmlvbmlkOiB3eENvbnRleHQuVU5JT05JRCxcclxuICAgIC8vIH1cclxufSJdfQ==