/**
* Cheers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    user: {
      type: 'integer',
      required: true
    },

    count: {
      type: 'integer'
    }

  },

  beforeCreate: function (values, next) {
    values.count = 1;
    next();
  }

};
