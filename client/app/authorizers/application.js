import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(sessionData, setRequestHeader) {
    setRequestHeader('Authorization', `Bearer ${sessionData.jwt}`);
  }
});
