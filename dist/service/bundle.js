/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ejs */ \"ejs\");\n/* harmony import */ var ejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ejs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! connect-flash */ \"connect-flash\");\n/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(connect_flash__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redis */ \"redis\");\n/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var connect_redis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! connect-redis */ \"connect-redis\");\n/* harmony import */ var connect_redis__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(connect_redis__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var parse_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! parse-json */ \"parse-json\");\n/* harmony import */ var parse_json__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(parse_json__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var sha256__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! sha256 */ \"sha256\");\n/* harmony import */ var sha256__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(sha256__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _routes_passport__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./routes/passport */ \"./routes/passport.js\");\n/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./routes/auth */ \"./routes/auth.js\");\n/* harmony import */ var _routes_board__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./routes/board */ \"./routes/board.js\");\n/* harmony import */ var _routes_note__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./routes/note */ \"./routes/note.js\");\n/* harmony import */ var _routes_mypage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./routes/mypage */ \"./routes/mypage.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nvar RedisStore = connect_redis__WEBPACK_IMPORTED_MODULE_7___default()(express_session__WEBPACK_IMPORTED_MODULE_4___default.a);\nvar client = redis__WEBPACK_IMPORTED_MODULE_6___default.a.createClient();\napp.use(express_session__WEBPACK_IMPORTED_MODULE_4___default()({\n  secret: 'yewon kim',\n  resave: false,\n  saveUninitialized: true,\n  cookie: {\n    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간\n\n  },\n  store: new RedisStore({\n    client: client,\n    logErrors: true\n  })\n}));\napp.use(passport__WEBPACK_IMPORTED_MODULE_12___default.a.initialize());\napp.use(passport__WEBPACK_IMPORTED_MODULE_12___default.a.session());\nObject(_routes_passport__WEBPACK_IMPORTED_MODULE_13__[\"default\"])();\napp.use(function (req, res, next) {\n  // header에서 사용해야하는 값\n  if (req.user) {\n    res.locals.sess = true;\n  } else {\n    res.locals.sess = false;\n  }\n\n  res.locals.badge_cal = 0; // console.log('전달되진 않는 req.session.userid값 '+req.session.userid);\n  // console.log('전달되는 res.locals.sess 값 : '+res.locals.sess);\n  // console.log('전달되는 badge_cal 값 : '+res.locals.badge_cal);\n\n  next();\n}); // const language = require('@google-cloud/language');\n// view engine setup\n\napp.set('views', './views');\napp.set('view engine', 'ejs');\napp.engine('.ejs', ejs__WEBPACK_IMPORTED_MODULE_2___default.a.renderFile);\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n  extended: false\n}));\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"](path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(__dirname, 'assets'))); // routes 사용\n\napp.use('/', _routes_auth__WEBPACK_IMPORTED_MODULE_14__[\"default\"]);\napp.use('/board', _routes_board__WEBPACK_IMPORTED_MODULE_15__[\"default\"]);\napp.use('/note', _routes_note__WEBPACK_IMPORTED_MODULE_16__[\"default\"]);\napp.use('/mypage', _routes_mypage__WEBPACK_IMPORTED_MODULE_17__[\"default\"]);\napp.use(function (req, res, next) {\n  // 404 처리 부분\n  res.status(404).send('일치하는 주소가 없습니다!');\n  res.end();\n});\napp.use(function (err, req, res, next) {\n  // 에러 처리 부분\n  console.error(err.stack); // 에러 메시지 표시\n\n  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송\n\n  res.end();\n});\napp.listen(3000, function () {\n  console.log('zteam on port 3000!');\n}); // 이전과 동일\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./models/Connection.js":
/*!******************************!*\
  !*** ./models/Connection.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar url = 'mongodb://localhost:27017/zteam';\nvar connection = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.createConnection(url, {\n  useNewUrlParser: true,\n  useFindAndModify: false,\n  useCreateIndex: true,\n  useUnifiedTopology: true\n}, function (err) {\n  if (err) {\n    console.log('Connected failed');\n  }\n\n  console.log('Connected successfully to server');\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (connection);\n\n//# sourceURL=webpack:///./models/Connection.js?");

/***/ }),

/***/ "./models/contest.js":
/*!***************************!*\
  !*** ./models/contest.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\n/* harmony import */ var mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Connection */ \"./models/Connection.js\");\n\n\n\nmongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default.a.initialize(_Connection__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar contestSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  num: {\n    type: Number,\n    required: true,\n    unique: true\n  },\n  // A.I\n  kind: {\n    type: String,\n    required: true\n  },\n  mem: {\n    type: String,\n    required: true\n  },\n  topic: {\n    type: String,\n    required: true\n  },\n  part: {\n    type: String,\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  content: {\n    type: String,\n    required: true\n  },\n  wantNum: {\n    type: Number,\n    required: true\n  },\n  applyNum: {\n    type: Number,\n    \"default\": 0\n  },\n  // startDay는 createdAt 으로 대신한다\n  endDay: {\n    type: Date,\n    required: true\n  },\n  hit: {\n    type: Number,\n    \"default\": 0\n  },\n  teamChk: {\n    type: Number,\n    \"default\": 0\n  }\n}, {\n  timestamps: true\n});\ncontestSchema.plugin(mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default.a.plugin, {\n  model: 'Contest',\n  field: 'num',\n  startAt: 1,\n  incrementBy: 1\n});\ncontestSchema.statics = {\n  // contest 등록\n  createContest: function createContest(userId, req) {\n    return this.create({\n      kind: req.body.kind,\n      mem: userId,\n      topic: req.body.topic,\n      part: req.body.part,\n      title: req.body.title,\n      content: req.body.content,\n      wantNum: req.body.wantNum,\n      applyNum: req.body.applyNum,\n      endDay: req.body.endDay\n    });\n  },\n  // 모든 contest 받아오기\n  getContests: function getContests() {\n    return this.find({});\n  },\n  // 내가 작성한 모든 contest 받아오기 - listNum과 연결\n  getContestById: function getContestById(userId) {\n    return this.find({\n      mem: userId\n    });\n  },\n  // 내가 작성한 conteset 종류별로 받아오기\n  getContestByKind: function getContestByKind(userId, kind) {\n    return this.find({\n      mem: userId,\n      kind: kind\n    });\n  },\n  // 현재 contest 받아오기'\n  getContestByNum: function getContestByNum(num) {\n    return this.find({\n      num: num\n    });\n  },\n  // 검색\n  searchContest: function searchContest(keyword) {\n    // keyword 하나 받아서 id, 이름, 주제, 파트, 제목, 내용 검색\n    return this.find().or([{\n      id: {\n        $regex: keyword\n      }\n    }, {\n      name: {\n        $regex: keyword\n      }\n    }, {\n      topic: {\n        $regex: keyword\n      }\n    }, {\n      part: {\n        $regex: keyword\n      }\n    }, {\n      title: {\n        $regex: keyword\n      }\n    }, {\n      content: {\n        $regex: keyword\n      }\n    }]);\n  },\n  // 내가 작성한 contest 변경하기\n  updateContest: function updateContest(userId, req) {\n    return this.findOneAndUpdate({\n      mem: userId,\n      num: req.body.num\n    }, {\n      part: req.body.part,\n      title: req.body.title,\n      content: req.body.content,\n      wantNum: req.body.wantNum,\n      endDay: req.body.endDay\n    }, {\n      returnNewDocument: true\n    });\n  },\n  // 내거 작성한 contest 삭제하기\n  removeContest: function removeContest(userId, num) {\n    return this.findOneAndDelete({\n      mem: userId,\n      num: num\n    });\n  },\n  // 조회수 하나 올리기\n  updateHit: function updateHit(num) {\n    return this.findOneAndUpdate({\n      num: num\n    }, {\n      $inc: {\n        hit: 1\n      }\n    });\n  },\n  // applyNum 하나 올리기\n  updateApplyNum: function updateApplyNum(num) {\n    return this.findOneAndUpdate({\n      num: num\n    }, {\n      $inc: {\n        applyNum: 1\n      }\n    });\n  },\n  // 수정이 가능한지 확인 - 신청 인원이 한 명 이상이라면 수정할 수 없음\n  enableModify: function enableModify(num) {\n    this.find({\n      num: num,\n      applyNum: 0\n    }, function (err, result) {\n      if (err) {\n        return false;\n      } // 조건을 충족하면 true\n\n\n      if (result.length) {\n        return true;\n      }\n    });\n  },\n  // 신청이 가능한지 확인\n  enableApply: function enableApply(num) {\n    this.find({\n      num: num,\n      teamChk: 0\n    }, function (err, result) {\n      if (err) {\n        return false;\n      } // 조건을 충족하면 true\n\n\n      if (!result.length) {\n        return true;\n      }\n    });\n  }\n}; // 정렬 (1, -1)\n\ncontestSchema.query.sortByNum = function (order) {\n  return this.sort({\n    num: order\n  });\n};\n\ncontestSchema.query.sortById = function (order) {\n  return this.sort({\n    id: order\n  });\n};\n\ncontestSchema.query.sortByAuthor = function (order) {\n  return this.sort({\n    name: order\n  });\n};\n\ncontestSchema.query.sortByTitle = function (order) {\n  return this.sort({\n    title: order\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Connection__WEBPACK_IMPORTED_MODULE_2__[\"default\"].model('contestBoards', contestSchema));\n\n//# sourceURL=webpack:///./models/contest.js?");

/***/ }),

/***/ "./models/counting.js":
/*!****************************!*\
  !*** ./models/counting.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Connection */ \"./models/Connection.js\");\n\n\nvar countingSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  member: {\n    type: Number,\n    \"default\": 0\n  },\n  list: {\n    type: Number,\n    \"default\": 0\n  },\n  apply: {\n    type: Number,\n    \"default\": 0\n  },\n  team: {\n    type: Number,\n    \"default\": 0\n  },\n  visit: {\n    type: Number,\n    \"default\": 0\n  }\n});\n\ncountingSchema.statics.updateMember = function () {\n  this.updateOne({}, {\n    $inc: {\n      member: 1\n    }\n  });\n};\n\ncountingSchema.statics.updateList = function () {\n  this.updateOne({}, {\n    $inc: {\n      list: 1\n    }\n  });\n};\n\ncountingSchema.statics.updateApply = function () {\n  this.updateOne({}, {\n    $inc: {\n      apply: 1\n    }\n  });\n};\n\ncountingSchema.statics.updateTeam = function () {\n  this.updateOne({}, {\n    $inc: {\n      team: 1\n    }\n  });\n};\n\ncountingSchema.statics.updateVisit = function () {\n  this.updateOne({}, {\n    $inc: {\n      visit: 1\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Connection__WEBPACK_IMPORTED_MODULE_1__[\"default\"].model('countings', countingSchema));\n\n//# sourceURL=webpack:///./models/counting.js?");

/***/ }),

/***/ "./models/member.js":
/*!**************************!*\
  !*** ./models/member.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Connection */ \"./models/Connection.js\");\n\n\nvar memberSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  id: {\n    type: String,\n    required: true,\n    unique: true\n  },\n  name: {\n    type: String,\n    required: true\n  },\n  pwd: {\n    type: String,\n    required: true\n  },\n  sNum: {\n    type: Number,\n    required: true\n  },\n  interest1: {\n    type: String,\n    required: true\n  },\n  interest2: {\n    type: String,\n    required: true\n  },\n  interest3: {\n    type: String,\n    required: true\n  },\n  profile: {\n    type: String,\n    required: true\n  },\n  listNum: {\n    type: Number,\n    \"default\": 0\n  },\n  // 가입일은 createdAt 으로 대신한다\n  notiApply: {\n    type: Number,\n    \"default\": 1\n  },\n  notiRecv: {\n    type: Number,\n    \"default\": 1\n  },\n  notiVol: {\n    type: Number,\n    \"default\": 1\n  },\n  image: {\n    data: Buffer,\n    contentsType: String,\n    \"default\": {}\n  },\n  friend: {\n    type: [{\n      fId: {\n        type: String,\n        requied: true\n      },\n      fDate: {\n        type: Date,\n        \"default\": Date.now()\n      }\n    }],\n    \"default\": []\n  }\n}, {\n  minimize: false,\n  timestamps: true\n});\nmemberSchema.statics = {\n  createMember: function createMember(req) {\n    return this.create({\n      id: req.body.id,\n      name: req.body.name,\n      pwd: req.body.pwd,\n      sNum: req.body.sNum,\n      interest1: req.body.interest1,\n      interest2: req.body.interest2,\n      interest3: req.body.interest3,\n      profile: req.body.profile\n    });\n  },\n  getMember: function getMember(userId) {\n    return this.find({\n      id: userId\n    });\n  },\n  updateMember: function updateMember(userId, req) {\n    return this.findOneAndUpdate({\n      id: userId\n    }, {\n      $set: {\n        name: req.body.name,\n        sNum: req.body.sNum,\n        interest1: req.body.interest1,\n        interest2: req.body.interest2,\n        interest3: req.body.interest3,\n        profile: req.body.profile\n      }\n    });\n  },\n  updatePwd: function updatePwd(userId, newPwd) {\n    var pwd = this.find({\n      id: userId\n    }).select('pwd');\n\n    if (pwd === newPwd) {\n      return false; // eslint-disable-next-line no-else-return\n    } else {\n      this.update({\n        id: userId\n      }, {\n        $set: {\n          pwd: newPwd\n        }\n      });\n      return true;\n    }\n  },\n  updateNoti: function updateNoti(userId, req) {\n    return this.update({\n      id: userId\n    }, {\n      $set: {\n        notiApply: req.body.notiApply,\n        notiRecv: req.body.notiRecv,\n        notiVol: req.body.notiVol\n      }\n    });\n  },\n  removeMember: function removeMember(userId) {\n    return this.findOneAndDelete({\n      id: userId\n    });\n  },\n  addFriend: function addFriend(userId, req) {\n    this.update({\n      id: userId\n    }, {\n      // 내쪽에 추가\n      $push: {\n        friend: {\n          fId: req.body.fId\n        }\n      }\n    }).update({\n      id: req.body.fId\n    }, {\n      // 쟤쪽에 추가\n      $push: {\n        friend: {\n          fId: userId\n        }\n      }\n    });\n  },\n  removeFriend: function removeFriend(userId, friendId) {\n    this.update( // 내쪽에서 삭제\n    {\n      id: userId\n    }, {\n      $pull: {\n        friend: {\n          fId: friendId\n        }\n      }\n    }).update( // 쟤쪽에서 삭제\n    {\n      id: friendId\n    }, {\n      $pull: {\n        friend: {\n          fId: userId\n        }\n      }\n    });\n  }\n}; // TODO: 이미지 처리 필요\n// TODO: 친구 신청 처리 필요\n// TODO: 친구 추가 (양쪽)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Connection__WEBPACK_IMPORTED_MODULE_1__[\"default\"].model('members', memberSchema));\n\n//# sourceURL=webpack:///./models/member.js?");

/***/ }),

/***/ "./models/study.js":
/*!*************************!*\
  !*** ./models/study.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\");\n/* harmony import */ var mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Connection */ \"./models/Connection.js\");\nvar _this = undefined;\n\n\n\n\nmongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default.a.initialize(_Connection__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar studySchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({\n  num: {\n    type: Number,\n    required: true,\n    unique: true\n  },\n  // A.I\n  kind: {\n    type: String,\n    required: true\n  },\n  mem: {\n    type: String,\n    required: true\n  },\n  topic: {\n    type: String,\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  content: {\n    type: String,\n    required: true\n  },\n  wantNum: {\n    type: Number,\n    required: true\n  },\n  applyNum: {\n    type: Number,\n    \"default\": 0\n  },\n  // startDay는 createdAt 으로 대신한다\n  endDay: {\n    type: Date,\n    required: true\n  },\n  hit: {\n    type: Number,\n    \"default\": 0\n  },\n  teamChk: {\n    type: Number,\n    \"default\": 0\n  }\n}, {\n  timestamps: true\n});\nstudySchema.plugin(mongoose_auto_increment__WEBPACK_IMPORTED_MODULE_1___default.a.plugin, {\n  model: 'Study',\n  field: 'num',\n  startAt: 1,\n  incrementBy: 1\n});\nstudySchema.statics = {\n  // study 등록\n  createStudy: function createStudy(userId, req) {\n    return this.create({\n      kind: req.body.kind,\n      mem: userId,\n      topic: req.body.topic,\n      title: req.body.title,\n      content: req.body.content,\n      wantNum: req.body.wantNum,\n      applyNum: req.body.applyNum,\n      endDay: req.body.endDay\n    });\n  },\n  // 모든 study 받아오기\n  getStydies: function getStydies() {\n    return this.find({});\n  },\n  // 내가 작성한 모든 study 받아오기 - listNum과 연결\n  getStudyById: function getStudyById(userId) {\n    return this.find({\n      mem: userId\n    });\n  },\n  // 내가 작성한 study 종류별로 받아오기\n  getSutydByKind: function getSutydByKind(userId, kind) {\n    return this.find({\n      mem: userId,\n      kind: kind\n    });\n  },\n  // 현재 study 받아오기'\n  getStudyByNum: function getStudyByNum(num) {\n    return this.find({\n      num: num\n    });\n  },\n  // 검색\n  searchStudy: function searchStudy(keyword) {\n    // keyword 하나 받아서 id, 이름, 주제, 파트, 제목, 내용 검색\n    return this.find().or([{\n      id: {\n        $regex: keyword\n      }\n    }, {\n      name: {\n        $regex: keyword\n      }\n    }, {\n      topic: {\n        $regex: keyword\n      }\n    }, {\n      title: {\n        $regex: keyword\n      }\n    }, {\n      content: {\n        $regex: keyword\n      }\n    }]);\n  },\n  // 내가 작성한 study 변경하기\n  updateStudy: function updateStudy(userId, req) {\n    return this.findOneAndUpdate({\n      mem: userId,\n      num: req.body.num\n    }, {\n      part: req.body.part,\n      title: req.body.title,\n      content: req.body.content,\n      wantNum: req.body.wantNum,\n      endDay: req.body.endDay\n    }, {\n      returnNewDocument: true\n    });\n  },\n  // 내거 작성한 study 삭제하기\n  removeStudy: function removeStudy(userId, num) {\n    return this.findOneAndDelete({\n      mem: userId,\n      num: num\n    });\n  },\n  // 조회수 하나 올리기\n  updateHit: function updateHit(num) {\n    return this.findOneAndUpdate({\n      num: num\n    }, {\n      $inc: {\n        hit: 1\n      }\n    });\n  },\n  // applyNum 하나 올리기\n  updateApplyNum: function updateApplyNum(num) {\n    return this.findOneAndUpdate({\n      num: num\n    }, {\n      $inc: {\n        applyNum: 1\n      }\n    });\n  },\n  // 수정이 가능한지 확인 - 신청 인원이 한 명 이상이라면 수정할 수 없음\n  enableModify: function enableModify(num) {\n    this.find({\n      num: num,\n      applyNum: 0\n    }, function (err, result) {\n      if (err) {\n        return false;\n      } // 조건을 충족하면 true\n\n\n      if (result.length) {\n        return true;\n      }\n    });\n  },\n  // 신청이 가능한지 확인\n  enableApply: function enableApply(num) {\n    this.find({\n      num: num,\n      teamChk: 0\n    }, function (err, result) {\n      if (err) {\n        return false;\n      } // 조건을 충족하면 true\n\n\n      if (!result.length) {\n        return true;\n      }\n    });\n  }\n}; // 정렬 (1, -1)\n\nstudySchema.query.sortByNum = function (order) {\n  return _this.sort({\n    num: order\n  });\n};\n\nstudySchema.query.sortById = function (order) {\n  return _this.sort({\n    id: order\n  });\n};\n\nstudySchema.query.sortByAuthor = function (order) {\n  return _this.sort({\n    name: order\n  });\n};\n\nstudySchema.query.sortByTitle = function (order) {\n  return _this.sort({\n    title: order\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Connection__WEBPACK_IMPORTED_MODULE_2__[\"default\"].model('studyboards', studySchema));\n\n//# sourceURL=webpack:///./models/study.js?");

/***/ }),

/***/ "./routes/auth.js":
/*!************************!*\
  !*** ./routes/auth.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connect-flash */ \"connect-flash\");\n/* harmony import */ var connect_flash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(connect_flash__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! nodemailer */ \"nodemailer\");\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _models_member__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/member */ \"./models/member.js\");\n/* harmony import */ var _models_counting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../models/counting */ \"./models/counting.js\");\n\n\n\n\n\n\n\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\nrouter.use(connect_flash__WEBPACK_IMPORTED_MODULE_3___default()());\nrouter.use(express_session__WEBPACK_IMPORTED_MODULE_5___default()({\n  secret: 'yewon kim',\n  resave: false,\n  saveUninitialized: true,\n  cookie: {\n    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간\n\n  }\n}));\nrouter.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n  extended: false\n}));\nrouter.use(cookie_parser__WEBPACK_IMPORTED_MODULE_4___default()());\nrouter.get('/', function (req, res) {\n  console.log('index page');\n  _models_counting__WEBPACK_IMPORTED_MODULE_8__[\"default\"].find({}, function (err, counting) {\n    console.log(\"returned document : \".concat(counting.length));\n    if (counting.length === 0) _models_counting__WEBPACK_IMPORTED_MODULE_8__[\"default\"].create({});\n  });\n  _models_counting__WEBPACK_IMPORTED_MODULE_8__[\"default\"].findOneAndUpdate({}, {\n    $inc: {\n      visit: 1\n    }\n  });\n  res.setHeader('Content-Type', 'text/html');\n  console.log(\"signin : \".concat(req.session.userid)); // 접근 권한 없이 board, note, mypage에 접근했을 경우\n\n  _models_counting__WEBPACK_IMPORTED_MODULE_8__[\"default\"].findOne({}, function (err, counting) {\n    console.log(counting);\n\n    if (!counting) {\n      // eslint-disable-next-line no-param-reassign\n      counting = {\n        member: 0,\n        list: 0,\n        apply: 0,\n        team: 0,\n        visit: 0\n      };\n    }\n\n    res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'index.ejs'), {\n      message: req.flash('message'),\n      c: counting\n    });\n  }); // res.end();\n}); // 문의 메일\n\nrouter.post('/', function (req, res) {\n  console.log('question email');\n  var transporter = nodemailer__WEBPACK_IMPORTED_MODULE_6___default.a.createTransport({\n    service: 'Gmail',\n    auth: {\n      user: 's2017s04@e-mirim.hs.kr',\n      pass: ''\n    }\n  });\n  var message = req.body.question_content;\n  var mResult = message.replace(/(?:\\r\\n|\\r|\\n)/g, '<br />');\n  var mailOptions = {\n    from: 's2017s04@e-mirim.hs.kr',\n    to: req.body.question_recv,\n    subject: \"[ZTEAM question]\".concat(message.substring(0, 10)),\n    html: \"<h1>\\uBB38\\uC758\\uC0AC\\uD56D</h1>\".concat(mResult)\n  };\n  transporter.sendMail(mailOptions, function (err, info) {\n    if (err) {\n      console.log(err);\n    } else {\n      console.log(\"Message sent : \".concat(info.response));\n    }\n\n    transporter.close();\n  });\n  res.redirect('/');\n}); // login, signup, logout\n\nrouter.get('/signup', function (req, res) {\n  console.log('signup page');\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'signup.ejs'), {\n    message: req.flash('message')\n  });\n  res.end();\n});\nrouter.post('/signup', function (req, res) {\n  console.log('signup db connect page');\n  var str;\n  var flag;\n  var regxEmail = /[A-Za-z0-9]{8}@e-mirim.hs.kr/;\n  var regxPwd = /(?=.*\\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,15}$/;\n  var resultEmail = regxEmail.exec(req.body.signup_email);\n  var resultPwd = regxPwd.exec(req.body.signup_pwd);\n\n  if (!resultEmail) {\n    str = '학교 이메일 형식은 @e-mirim.hs.kr 입니다';\n    flag = 1;\n  } else if (!resultPwd) {\n    str = '비밀번호 형식이 틀립니다';\n    flag = 1;\n  }\n\n  if (flag === 1) {\n    req.flash('message', str);\n    return res.redirect('/signup');\n  }\n\n  _models_member__WEBPACK_IMPORTED_MODULE_7__[\"default\"].create({\n    id: req.body.signup_email,\n    name: req.body.signup_name,\n    pwd: req.body.signup_pwd,\n    s_num: req.body.signup_num,\n    interest1: req.body.signup_inter1,\n    interest2: req.body.signup_inter2,\n    interest3: req.body.signup_inter3,\n    profile: req.body.signup_profile\n  }, function (err) {\n    if (err) {\n      if (err.name === 'MongoError' && err.code === 11000) {\n        console.log('go to signup');\n        str = '중복된 이메일로 가입하실 수 없습니다!';\n        req.flash('message', str);\n        return res.redirect('/signup');\n      }\n    }\n\n    _models_counting__WEBPACK_IMPORTED_MODULE_8__[\"default\"].updateMember();\n    console.log('go to signin');\n    return res.redirect('/signin');\n  });\n});\nrouter.get('/signin', function (req, res) {\n  console.log('signin page');\n  var cid = null;\n\n  if (req.cookies.cookie_id !== undefined) {\n    cid = req.cookies.cookie_id;\n    console.log(\"cookie_id : \".concat(cid));\n  }\n\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'signin.ejs'), {\n    message: req.flash('message'),\n    cookie_id: cid\n  });\n  res.end();\n});\nrouter.post('/signin', function (req, res, next) {\n  passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate('local', function (errOut, user, info) {\n    if (errOut) {\n      return next(errOut);\n    }\n\n    if (!user) {\n      // checkbox 체크 시 쿠키\n      if (req.body.id_ck === 'yes') {\n        res.cookie('cookie_id', req.body.signin_email);\n      }\n\n      var str = '해당 이메일 또는 비밀번호가 틀렸습니다';\n      req.flash('message', str);\n      return res.redirect('/signin');\n    }\n\n    req.logIn(user, function (errIn) {\n      if (errIn) {\n        return next(errIn);\n      }\n\n      return res.redirect('/');\n    });\n  })(req, res, next);\n});\nrouter.post('/signin/find', function (req, res) {\n  console.log('find pwd page');\n\n  function sendEmail(pwd) {\n    var transporter = sendEmail(pwd);\n    var message = \"\".concat(req.body.find_email, \"\\uB2D8\\uC758 \\uBE44\\uBC00\\uBC88\\uD638\\uB294 <span style=\\\"background: #efdc05;\\\">\").concat(pwd, \"</span> \\uC785\\uB2C8\\uB2E4.\");\n    var mailOptions = {\n      from: 's2017s04@e-mirim.hs.kr',\n      to: req.body.find_email,\n      subject: '[ZTEAM 비밀번호 찾기]',\n      html: \"<h1>\\uBE44\\uBC00\\uBC88\\uD638 \\uCC3E\\uAE30</h1>\".concat(message)\n    };\n    transporter.sendMail(mailOptions, function (errIn, info) {\n      if (errIn) {\n        console.log(errIn);\n      } else {\n        console.log(\"Message sent : \".concat(info.response));\n      }\n\n      transporter.close();\n    });\n    return nodemailer__WEBPACK_IMPORTED_MODULE_6___default.a.createTransport({\n      service: 'Gmail',\n      auth: {\n        user: 's2017s04@e-mirim.hs.kr',\n        pass: 'LimKimwon7763*'\n      }\n    });\n  }\n\n  try {\n    console.log(req.body.find_email);\n    _models_member__WEBPACK_IMPORTED_MODULE_7__[\"default\"].findOne({\n      id: req.body.find_email\n    }).exec(function (err, idCheckUser) {\n      // 아이디만 가져와서 맞음 or 틀림\n      // eslint-disable-next-line max-len\n      if (idCheckUser && req.body.find_hint === idCheckUser.interest1 && req.body.find_hint === idCheckUser.interest2 && req.body.find_hint === idCheckUser.interest3) {\n        sendEmail(idCheckUser.pwd);\n      }\n    });\n  } catch (e) {\n    console.log(e);\n    return res.redirect('/');\n  }\n\n  return res.redirect('/signin');\n});\nrouter.get('/signout', function (req, res) {\n  console.log('signout page');\n  req.logOut();\n  res.redirect('/');\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./routes/auth.js?");

/***/ }),

/***/ "./routes/board.js":
/*!*************************!*\
  !*** ./routes/board.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models_member__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/member */ \"./models/member.js\");\n/* harmony import */ var _models_study__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/study */ \"./models/study.js\");\n/* harmony import */ var _models_contest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/contest */ \"./models/contest.js\");\n/* eslint-disable prefer-destructuring */\n\n\n\n\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\nrouter.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n  extended: false\n}));\nrouter.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());\nvar cid = null;\nvar cname = null;\nrouter.use(function (req, res, next) {\n  // cookies\n  if (!req.cookies.cookie_id) {\n    cid = req.cookies.cookie_id;\n    console.log(\"cookie_id : \".concat(cid));\n  }\n\n  if (!req.cookies.cookie_id) {\n    cname = req.cookies.cookie_name;\n    console.log(\"cookie_name : \".concat(cname));\n  }\n\n  next();\n}); // board list\n\nrouter.get('/:kind/list', function (req, res) {\n  console.log('It\\'s board list page');\n  var kind = req.params.kind;\n  var sess = req.session;\n  var itemList = null;\n  var pageTitle = null;\n  var page;\n  var scale; // itemList, pageTitle\n\n  if (kind === 'study') {\n    itemList = _models_study__WEBPACK_IMPORTED_MODULE_4__[\"default\"].allItem();\n    pageTitle = '모든 스터디';\n  } else if (kind === 'contest') {\n    itemList = _models_contest__WEBPACK_IMPORTED_MODULE_5__[\"default\"].allItem();\n    pageTitle = '모든 공모전';\n  } // range\n\n\n  var range = null;\n\n  if (req.query.range) {\n    range = req.query.range;\n\n    if (range === 'num') {\n      itemList.sort(function (now, next) {\n        return now.num - next.num;\n      });\n    } else if (range === 'author') {\n      itemList.sort(function (now, next) {\n        return now.author - next.author;\n      });\n    } else if (range === 'topic') {\n      itemList.sort(function (now, next) {\n        return now.topic - next.topic;\n      });\n    } else if (range === 'title') {\n      itemList.sort(function (now, next) {\n        return now.title - next.title;\n      });\n    }\n  } // scale, page\n\n\n  if (req.cookies.scale !== undefined) {\n    scale = req.cookies.scale;\n  } else {\n    var s = 10;\n    res.cookie('scale', s);\n    scale = s;\n  }\n\n  console.log(\"scale : \".concat(scale));\n\n  if (req.query.page) {\n    page = req.query.page;\n  } else {\n    page = 1;\n  } // user_list_num\n\n\n  var user_list_num;\n  _models_member__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n    id: cid\n  }).select('list_num').exec(function (err, userNum) {\n    user_list_num = userNum.list_num;\n  });\n  console.log(\"list_num : \".concat(user_list_num));\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'item_list.ejs'), {\n    cookie_id: cid,\n    cookie_name: cname,\n    list: itemList,\n    ptitle: pageTitle,\n    kind: kind,\n    user_list_num: user_list_num,\n    page: page,\n    scale: scale\n  });\n  res.end();\n});\nrouter.get('/:kind/list/search', function (req, res) {\n  console.log('It\\'s board list search page');\n  var key = req.body.search;\n  var kind = req.params.kind;\n  var sess = req.session;\n  var itemList = null;\n  var pageTitle = null;\n  var page;\n  var scale; // item_list, page_title\n\n  if (kind === 'study') {\n    itemList = _models_study__WEBPACK_IMPORTED_MODULE_4__[\"default\"].findItem(key);\n    pageTitle = '검색된 스터디';\n  } else if (kind === 'contest') {\n    itemList = _models_contest__WEBPACK_IMPORTED_MODULE_5__[\"default\"].findItem(key);\n    pageTitle = '검색된 공모전';\n  } // scale, page\n\n\n  if (req.cookies.scale !== undefined) {\n    scale = req.cookies.scale;\n  } else {\n    var s = 10;\n    res.cookie('scale', s);\n    scale = s;\n  }\n\n  console.log(\"scale : \".concat(scale));\n\n  if (req.query.page) {\n    page = req.query.page;\n  } else {\n    page = 1;\n  } // user_list_num\n\n\n  var user_list_num;\n  _models_member__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n    id: cid\n  }).select('list_num').exec(function (err, userNum) {\n    user_list_num = userNum.list_num;\n  });\n  console.log(\"list_num : \".concat(user_list_num));\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'item_list.ejs'), {\n    cookie_id: cid,\n    cookie_name: cname,\n    list: itemList,\n    ptitle: pageTitle,\n    kind: kind,\n    user_list_num: user_list_num,\n    key: key\n  });\n}); // board list subject\n\nrouter.get('/:kind/list/:subject', function (req, res) {\n  console.log('It\\'s board list subject page');\n  var kind = req.params.kind;\n  var subject = req.params.subject;\n  var itemList = null;\n  var pageTitle = null;\n  var page;\n  var scale;\n  var sess = req.session; // cookies\n\n  if (req.cookies.scale !== undefined) {\n    scale = req.cookies.scale;\n    console.log(\"scale : \".concat(scale));\n  } else {\n    var s = 10;\n    res.cookie('scale', s);\n    scale = s;\n  }\n\n  if (req.query.page) {\n    page = req.query.page;\n  } else {\n    page = 1;\n  } // item_list, page_title\n\n\n  if (kind === 'study') {\n    itemList = _models_study__WEBPACK_IMPORTED_MODULE_4__[\"default\"].subjectItem(subject);\n\n    if (subject === 'develop') {\n      pageTitle = '개발 관련 스터디';\n    } else if (subject === 'design') {\n      pageTitle = '디자인 관련 스터디';\n    } else if (subject === 'etc') {\n      pageTitle = '기타 스터디 및 모임';\n    }\n  } else if (kind === 'contest') {\n    itemList = _models_contest__WEBPACK_IMPORTED_MODULE_5__[\"default\"].subjectItem(subject);\n\n    if (subject === 'develop') {\n      pageTitle = '개발 관련 공모전';\n    } else if (subject === 'design') {\n      pageTitle = '디자인 관련 공모전';\n    } else if (subject === 'etc') {\n      pageTitle = '기타 공모전';\n    } else if (subject === 'idea') {\n      pageTitle = '아이디어 관련 공모전';\n    }\n  }\n\n  var user_list_num;\n  _models_member__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n    id: cid\n  }).select('list_num').exec(function (err, userNum) {\n    user_list_num = userNum.list_num;\n  });\n  console.log(\"list_num : \".concat(user_list_num));\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'item_list.ejs'), {\n    cookie_id: cid,\n    cookie_name: cname,\n    list: itemList,\n    ptitle: pageTitle,\n    kind: kind,\n    subject: subject,\n    user_list_num: user_list_num,\n    page: page,\n    scale: scale\n  });\n  res.end();\n}); // board view\n\nrouter.get('/:kind/view', function (req, res) {\n  console.log('It\\'s board view page');\n  var sess = req.session;\n  var id = req.params.id; // view id\n\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'item_view.ejs'), {\n    cookie_id: cid,\n    cookie_name: cname // 게시판 상세보기용 값들 필요함\n    // list: itemList,\n    // ptitle: pageTitle,\n    // kind,\n    // subject,\n    // user_list_num,\n    // page,\n    // scale,\n\n  });\n  res.end();\n}); // wirte, modify, delete, apply, apply_delete\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./routes/board.js?");

/***/ }),

/***/ "./routes/mypage.js":
/*!**************************!*\
  !*** ./routes/mypage.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models_member__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/member */ \"./models/member.js\");\n\n\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\nrouter.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n  extended: false\n}));\nrouter.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());\nrouter.get('/', function (req, res) {\n  console.log('mypage page');\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'mypage.ejs'));\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./routes/mypage.js?");

/***/ }),

/***/ "./routes/note.js":
/*!************************!*\
  !*** ./routes/note.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models_member__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/member */ \"./models/member.js\");\n\n\n\n\nvar router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\n/* harmony default export */ __webpack_exports__[\"default\"] = (router); // note\n\nrouter.get('/send', function (req, res) {\n  console.log('note_send page');\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'note_send.ejs'));\n});\nrouter.get('/recv', function (req, res) {\n  console.log('note_recv page');\n  res.setHeader('Content-Type', 'text/html');\n  res.render(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '..', 'views', 'note_recv.ejs'));\n});\nrouter.get('/insert', function (req, res) {\n  console.log('note_insert');\n});\nrouter.get('/delete', function (req, res) {\n  console.log('note_delete');\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./routes/note.js?");

/***/ }),

/***/ "./routes/passport.js":
/*!****************************!*\
  !*** ./routes/passport.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport-local */ \"passport-local\");\n/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _models_member__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/member */ \"./models/member.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  passport__WEBPACK_IMPORTED_MODULE_0___default.a.serializeUser(function (member, done) {\n    // Strategy 성공 시 호출됨\n    var user = {\n      id: member.id,\n      pwd: member.pwd\n    };\n    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동\n  });\n  passport__WEBPACK_IMPORTED_MODULE_0___default.a.deserializeUser(function (user, done) {\n    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것\n    done(null, user); // 여기의 user가 req.user가 됨\n  });\n  passport__WEBPACK_IMPORTED_MODULE_0___default.a.use(new passport_local__WEBPACK_IMPORTED_MODULE_1__[\"Strategy\"]({\n    // local 전략을 세움\n    usernameField: 'signin_email',\n    passwordField: 'signin_pwd',\n    session: true,\n    // 세션에 저장 여부\n    passReqToCallback: false\n  }, function (id, password, done) {\n    _models_member__WEBPACK_IMPORTED_MODULE_2__[\"default\"].findOne({\n      id: id\n    }, function (findError, user) {\n      console.log('finding id');\n      console.log(user);\n      if (findError) return done(findError); // 서버 에러 처리\n\n      if (!user) {\n        // req.session.message = '해당 이메일로 가입된 계정이 없습니다';\n        return done(null, false, {\n          message: '해당 이메일로 가입된 계정이 없습니다'\n        }); // 임의 에러 처리\n      }\n\n      return user.comparePassword(password, user.pwd, function (passError, isMatch) {\n        console.log(isMatch);\n        console.log('finding pwd');\n\n        if (isMatch) {\n          return done(null, user); // 검증 성공\n        } // req.session.message = '해당 이메일 또는 비밀번호가 틀렸습니다';\n\n\n        return done(null, false, {\n          message: '해당 이메일 또는 비밀번호가 틀렸습니다'\n        }); // 임의 에러 처리\n      });\n    });\n  }));\n});\n\n//# sourceURL=webpack:///./routes/passport.js?");

/***/ }),

/***/ 0:
/*!**************************************!*\
  !*** multi @babel/polyfill ./app.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"@babel/polyfill\");\nmodule.exports = __webpack_require__(/*! C:\\Users\\Yewon\\Desktop\\dev_workspace\\zteam-node\\app.js */\"./app.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_./app.js?");

/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/polyfill\");\n\n//# sourceURL=webpack:///external_%22@babel/polyfill%22?");

/***/ }),

/***/ "connect-flash":
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-flash\");\n\n//# sourceURL=webpack:///external_%22connect-flash%22?");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-redis\");\n\n//# sourceURL=webpack:///external_%22connect-redis%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ejs\");\n\n//# sourceURL=webpack:///external_%22ejs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-auto-increment":
/*!******************************************!*\
  !*** external "mongoose-auto-increment" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-auto-increment\");\n\n//# sourceURL=webpack:///external_%22mongoose-auto-increment%22?");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nodemailer\");\n\n//# sourceURL=webpack:///external_%22nodemailer%22?");

/***/ }),

/***/ "parse-json":
/*!*****************************!*\
  !*** external "parse-json" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"parse-json\");\n\n//# sourceURL=webpack:///external_%22parse-json%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ }),

/***/ "sha256":
/*!*************************!*\
  !*** external "sha256" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sha256\");\n\n//# sourceURL=webpack:///external_%22sha256%22?");

/***/ })

/******/ });