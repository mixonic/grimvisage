This is an app for sharing your photo before meeting
someone in real life. For use in business meetings, blind dates,
and war that hath smooth'd his wrinkled front.

Also the domain was available.

![](http://f.cl.ly/items/12082r0j3b1j2a0O2k38/Screen%20Shot%202013-09-30%20at%2010.33.31%20PM.png)

Once you are running grimvisage, you can take a webcam photo of yourself
and share it from your profile's URL. You can also see other peoples
profiles, but may not edit them.

The codebase uses [Firebase](https://www.firebase.com/) for storage via a hang-wrought adapter. This
ended up much more complex than planned and could probably use some
refactoring. The session controller itself doesn't know anything about the
authentication adapter's implementation, which should make refactoring
pretty straight-ahead.

Grimvisage uses [Ember App Kit](https://github.com/stefanpenner/ember-app-kit) To get going:

```
git clone git@github.com:mixonic/grimvisage.git
cd grimvisage
npm install
bower install
grunt server
```

Some exercises:

* Implement remember me.
* Show a status bar with the current user.

PRs are welcome.
