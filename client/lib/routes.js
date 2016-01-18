Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'layout',
        subscriptions: function() {
            var _id = Meteor.userId();

            this.subscribe('posts', _id);

            this.subscribe('friendship', _id);
        },
        data: function() {
            var _id = Meteor.userId();

            return {
                posts: Post.find({}, {sort: {time: -1, name: 1}}),
                followers: Friendship.followers(_id),
                followings: Friendship.followings(_id)
            }
        }
    });

    this.route('user', {
        path: '/user/:_id',
        template: 'user',
        layoutTemplate: 'layout',
        subscriptions: function() {
            var _id = this.params._id;

            var userId = Meteor.userId();

            this.subscribe('posts', _id);

            this.subscribe('friendship', _id);

            this.subscribe('isFollowing', userId, _id).wait();

            this.subscribe('user', _id);
        },
        data: function() {
            var _id = this.params._id;

            var userId = Meteor.userId();

            var isFollowing = Friendship.isFollowing(userId, _id).count();

            Session.set('currentUserId', _id);

            Session.set('isFollowing', isFollowing);

            return {
                posts: Post.find({}, {sort: {time: -1, name: 1}}),
                user: Meteor.users.findOne({_id: _id}),
                followers: Friendship.followers(_id),
                followings: Friendship.followings(_id)
            }
        }
    });

    this.route('follow', {
        path: '/user/:_id/follow',
        action: function() {
            var _id = this.params._id;

            Meteor.call('followUser', _id);

            this.redirect('/user/' + _id);
        }
    });

    this.route('unfollow', {
        path: '/user/:_id/unfollow',
        action: function() {
            var _id = this.params._id;

            Meteor.call('unfollowUser', _id);

            this.redirect('/user/' + _id);
        }
    });
});