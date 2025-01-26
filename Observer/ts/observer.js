var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.unsubscribe = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    Subject.prototype.notify = function (value) {
        this.observers.forEach(function (e) {
            e.refresh(value);
        });
    };
    return Subject;
}());
var Observer = /** @class */ (function () {
    function Observer(fn) {
        this.fn = fn;
    }
    Observer.prototype.refresh = function (value) {
        this.fn(value);
    };
    return Observer;
}());
var subject = new Subject();
var obs1 = new Observer(function (n) {
    console.log("hello" + n);
});
var obs2 = new Observer(function (n) {
    console.log("Hi" + n);
});
subject.subscribe(obs1);
subject.subscribe(obs2);
subject.notify(1.2);
subject.notify(30);
var subjectString = new Subject();
var obs1String = new Observer(function (s) {
    console.log(s.toUpperCase());
});
var obs2String = new Observer(function (s) {
    console.log(s.toLowerCase());
});
subjectString.subscribe(obs1String);
subjectString.subscribe(obs2String);
subjectString.notify("ale");
subjectString.notify("ALE");
