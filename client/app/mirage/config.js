export default function() {

  this.get('/users', function(db){
    return {users: db.users, profile_responses: db.profile_responses};
  });

  this.get('/newsitems');

  this.post('/newsitems', function(db, request) {
    var attrs = JSON.parse(request.requestBody);
    attrs.newsitem.timestamp = new Date();
    var newsitem = db.newsitems.insert(attrs.newsitem);
    return {newsitem: newsitem};
  });

  this.get('profile_responses/:id');
  this.post('/profile_responses');

  this.get('profile_sections', function(){
    return {profile_sections: [
        {
          id: 1,
          title: "General Information",
          order: 1
        },
        {
          id: 2,
          title: "Professional Networking",
          order: 2
        }
      ]};
  });

  this.get('profile_questions', function(){
    return {profile_questions: [
        {
          id: 1,
          text: "Where did you grow up?",
          order: 6,
          type: "text",
          section_id: 1
        },
        {
          id: 2,
          text: "Where did you attend synagogue?",
          order: 7,
          type: "text",
          section_id: 1
        },
        {
          id: 3,
          text: "Where did you attend high school?",
          order: 8,
          type: "text",
          section_id: 1
        },
        {
          id: 6,
          text: "Home Address",
          description: "Please enter your current address - you might find that you are neighbors with other JMR men!",
          order: 4,
          type: "textarea",
          section_id: 1
        },
        {
          id: 11,
          text: "What do you do?",
          order: 13,
          type: "textarea",
          section_id: 2
        },
        {
          id: 12,
          text: "What services or products do you provide that other men might be interested in?",
          description: "How can they best get in touch with you?",
          order: 14,
          type: "textarea",
          section_id: 2
        }
      ]};
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
