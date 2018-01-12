"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var constant = /** @class */ (function () {
    function constant() {
    }
    constant.isDevelopmentMode = function () {
        return core_1.isDevMode();
    };
    constant.setPreviousObject = function (obj) {
        if (obj == null) {
            console.log("obj is null");
        }
        else {
            constant.objArray.push(obj);
        }
    };
    constant.getPreviousUI = function () {
        console.log("array len " + constant.objArray.length);
        return constant.objArray.pop();
    };
    constant.objArray = new Array();
    return constant;
}());
exports.constant = constant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25zdGFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwQztBQUMxQztJQUFBO0lBc0JDLENBQUM7SUFuQlMsMEJBQWlCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLGdCQUFTLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sMEJBQWlCLEdBQXhCLFVBQXlCLEdBQVU7UUFDL0IsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDTCxDQUFDO0lBQ00sc0JBQWEsR0FBcEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFoQk0saUJBQVEsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0lBcUJ6QyxlQUFDO0NBQUEsQUF0QkYsSUFzQkU7QUF0QlcsNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBjbGFzcyBjb25zdGFudHtcbiAgICBzdGF0aWMgb2JqQXJyYXkgPSBuZXcgQXJyYXk8T2JqZWN0PigpO1xuXG4gICAgc3RhdGljIGlzRGV2ZWxvcG1lbnRNb2RlKCl7XG4gICAgICAgIHJldHVybiBpc0Rldk1vZGUoKTtcbiAgICB9IFxuIFxuICAgIHN0YXRpYyBzZXRQcmV2aW91c09iamVjdChvYmo6T2JqZWN0KXtcbiAgICAgICAgaWYob2JqID09IG51bGwpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvYmogaXMgbnVsbFwiKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdGFudC5vYmpBcnJheS5wdXNoKG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGdldFByZXZpb3VzVUkoKTphbnl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJyYXkgbGVuIFwiICsgY29uc3RhbnQub2JqQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIGNvbnN0YW50Lm9iakFycmF5LnBvcCgpO1xuICAgIH1cbiAgICAvKnN0YXRpYyBnZXRSYW5kb21TdHJpbmdVVUlEKCl7XG4gICAgICAgIHZhciB1dWlkID0gdXVpZHYxKCk7ICAgIFxuICAgICAgICByZXR1cm4gdXVpZDtcbiAgICB9Ki9cbiB9Il19