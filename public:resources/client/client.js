//describe('You can also use browser in your tests', function () {
//    var server = meteor();
//    var client = browser(server);
//
//    it('should be able to use webdriver methods', function () {
//        return client
//            .title()
//            .then(function (title) {
//                expect(title).to.contain("Meteor");
//            });
//    });
//
//    var a = 1;
//    it("should be able to access local variable", function () {
//        return client.execute(function (a) {
//            return a + 1;
//        }, [ a ]); // array of arguments
//    });
//
//    var a = 1, b = 2, c = 0;
//    // this is a hack :)
//    closure(['a', 'b', 'c'], function (key, value) {
//        return eval(key + (arguments.length > 1 ? '=' + JSON.stringify(value) : ''));
//    });
//});