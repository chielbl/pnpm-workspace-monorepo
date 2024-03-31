"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ui_1 = require("@repo/ui");
require("./App.css");
function App() {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    return (<>
      <h1>Vite + React</h1>
      <div>
        <ui_1.Button text={"count is ".concat(count)} onClick={function () { return setCount(function (count) { return count + 1; }); }}/>
      </div>
    </>);
}
exports.default = App;
