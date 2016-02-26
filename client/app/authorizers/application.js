import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize: function(sessionData, setRequestHeader) {
    setRequestHeader('uid', sessionData.user.uid);
    setRequestHeader('access_token', sessionData.auth_info.access_token);
    setRequestHeader('token_type', 'Bearer');
    setRequestHeader('client', sessionData.auth_info.client);
    setRequestHeader('expiry', sessionData.auth_info.expiry);

      // var success = requestOptions.success;
      // requestOptions.success = function(data, textStatus, jqXHR_resp){
      //   var expiry = jqXHR_resp.getResponseHeader('Expiry');
      //   //filter out old header values by old expiry
      //   if (!!expiry && parseInt(expiry, 10) >= parseInt(session.get('auth_info.expiry'), 10)){
      //     session.set('auth_info.expiry', expiry);

      //     var access_token = jqXHR_resp.getResponseHeader('Access-Token');
      //     if (access_token !== undefined){
      //       session.set('auth_info.access_token', access_token);
      //     }
      //     var client = jqXHR_resp.getResponseHeader('Client');
      //     if (client !== undefined){
      //       session.set('auth_info.client', client);
      //     }
      //   }

      //   if (success !== undefined){
      //     success(data, textStatus, jqXHR_resp);
      //   }
      // };
  }
});
