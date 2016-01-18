Friendship = new Meteor.Collection('friendship');

Friendship.follow = function(friendId) {
    userId = Meteor.userId();

    this.insert({
        userId: userId,
        friendId: friendId
    });
};

Friendship.unfollow = function(friendId) {
    userId = Meteor.userId();

    this.remove({
        userId: userId,
        friendId: friendId
    });
};

Friendship.isFollowing = function(userId, friendId) {
    return this.find({
        userId: userId,
        friendId: friendId
    });
};

Friendship.followings = function(userId) {
    return this.find({userId: userId}).count();
};

Friendship.followers = function(friendId) {
    return this.find({friendId: friendId}).count();
};

Friendship.timelineIds = function(userId) {
    var timelineIds = this.find({
        userId: userId
    }).map(function(f) {
        return f.friendId;
    });

    timelineIds.push(userId);

    return timelineIds;
};

Friendship.followersAndFollowings = function(_id) {
    return this.find({
        $or: [
            {userId: _id},
            {friendId: _id}
        ]
    });
};