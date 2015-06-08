export default function() {

  // this.get('/users', ['user', 'profile_response']);
  this.get('/users', function(db, request){
    if (request.queryParams.uid !== undefined){
      var users = db.users.filter((user) => user.uid === request.queryParams.uid);
      var profile_responses = db.profile_responses.where({user_id: users[0].id.toString()});
      return ({users: users, profile_responses: profile_responses});
    }
    return {users: db.users};
  });

  this.get('/newsitems', function(db){
    return {newsitems: db.newsitems};
  });

  this.post('/newsitems', function(db, request) {
    var attrs = JSON.parse(request.requestBody);
    attrs.newsitem.timestamp = new Date();
    var newsitem = db.newsitems.insert(attrs.newsitem);
    return {newsitem: newsitem};
  });

  this.get('/users/:user_id/profile_responses', function(db){
    return {profile_responses: db.profile_responses.where({user_id: request.params.user_id})}
  });

  // this.post('/profile_responses');
  this.post('/profile_responses', function(db, request) {
    var attrs = JSON.parse(request.requestBody);
    var profile_response = db.profile_responses.insert(attrs.profile_response);
    var user = db.users.where({id: parseInt(profile_response.user_id, 10)});
    user[0].profile_responses = [profile_response.id];
    return {profile_response: profile_response};
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Default config
  */
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection} // returns all the data defined in /app/mirage/fixtures/{collection}.js
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;
      var contact = db.contacts.find(contactId);
      var addresses = db.addresses
        .filterBy('contact_id', contactId);

      return {
        contact: contact,
        addresses: addresses
      };
    });

  */
}
