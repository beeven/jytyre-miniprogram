"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var warranty_service_1 = require("./warranty.service");
var WarrantyListItem = (function () {
    function WarrantyListItem(warrantyID, plateNumber, description, thumbnail, approvalStatus, isDeleting) {
        if (isDeleting === void 0) { isDeleting = false; }
        this.warrantyID = warrantyID;
        this.plateNumber = plateNumber;
        this.description = description;
        this.thumbnail = thumbnail;
        this.approvalStatus = approvalStatus;
        this.isDeleting = isDeleting;
        this.status = '';
        this.statusIconClass = '';
        if (this.approvalStatus == warranty_service_1.ApprovalStatus.drafting) {
            this.status = '继续填写';
        }
        else if (this.approvalStatus == warranty_service_1.ApprovalStatus.pending) {
            this.status = '审核中';
        }
        if (this.approvalStatus == warranty_service_1.ApprovalStatus.approved) {
            this.statusIconClass = 'icon-chenggong';
        }
        if (this.approvalStatus == warranty_service_1.ApprovalStatus.rejected) {
            this.statusIconClass = 'icon-tishi';
        }
    }
    return WarrantyListItem;
}());
exports.WarrantyListItem = WarrantyListItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FycmFudExpc3RJdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2FycmFudExpc3RJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQW9EO0FBRXBEO0lBSUksMEJBQ08sVUFBa0IsRUFDbEIsV0FBbUIsRUFDbkIsV0FBbUIsRUFDbkIsU0FBaUIsRUFDakIsY0FBOEIsRUFDOUIsVUFBMkI7UUFBM0IsMkJBQUEsRUFBQSxrQkFBMkI7UUFMM0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksaUNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDeEI7YUFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksaUNBQWMsQ0FBQyxPQUFPLEVBQUU7WUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksaUNBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztTQUMzQztRQUNELElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxpQ0FBYyxDQUFDLFFBQVEsRUFBRTtZQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQztTQUN2QztJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwcm92YWxTdGF0dXMgfSBmcm9tIFwiLi93YXJyYW50eS5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FycmFudHlMaXN0SXRlbSB7XHJcbiAgICBwdWJsaWMgc3RhdHVzOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3RhdHVzSWNvbkNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgd2FycmFudHlJRDogc3RyaW5nLFxyXG4gICAgcHVibGljIHBsYXRlTnVtYmVyOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyB0aHVtYm5haWw6IHN0cmluZyxcclxuICAgIHB1YmxpYyBhcHByb3ZhbFN0YXR1czogQXBwcm92YWxTdGF0dXMsXHJcbiAgICBwdWJsaWMgaXNEZWxldGluZzogYm9vbGVhbiA9IGZhbHNlKSB7IFxyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gJyc7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNJY29uQ2xhc3MgPSAnJztcclxuICAgICAgICBpZih0aGlzLmFwcHJvdmFsU3RhdHVzID09IEFwcHJvdmFsU3RhdHVzLmRyYWZ0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ+e7p+e7reWhq+WGmSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5hcHByb3ZhbFN0YXR1cyA9PSBBcHByb3ZhbFN0YXR1cy5wZW5kaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ+WuoeaguOS4rSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuYXBwcm92YWxTdGF0dXMgPT0gQXBwcm92YWxTdGF0dXMuYXBwcm92ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXNJY29uQ2xhc3MgPSAnaWNvbi1jaGVuZ2dvbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmFwcHJvdmFsU3RhdHVzID09IEFwcHJvdmFsU3RhdHVzLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzSWNvbkNsYXNzID0gJ2ljb24tdGlzaGknO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==