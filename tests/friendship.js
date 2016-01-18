var assert = require('assert');
describe('Friendship', function () {
    var server = meteor();

    it('follow', function () {
        return server.execute(function () {
            Friendship.follow('123');

            return Friendship.findOne({friendId: '123'});
        }).then(function(obj) {
            expect(obj.friendId).to.equal('123');
        });
    });

    it('unfollow', function () {
        return server.execute(function () {
            Friendship.follow('123');

            Friendship.unfollow('123');

            return Friendship.findOne({friendId: '123'});
        }).then(function(obj) {
            expect(obj).to.equal(undefined);
        });
    });
});