Meteor.methods({
  /*
    data[0] = 111 (obrigatorio)
    data[1] = name (obrigatorio)
    data[2] = image (obrigatorio)
    data[3] = *status (default: 1)

    * status:
      0 = inativo
      1 = ativo
  */
  'insertCity': function(data){
    var msgError = '';
    if(data[0] !== 111){
      msgError = Meteor.call('msgFeedback', 'error', '000');
    }else if(!data[1]){
      msgError = Meteor.call('msgFeedback', 'error', '001');
    }else if(!data[2]){
      msgError = Meteor.call('msgFeedback', 'error', '004');
    }

    if(!msgError){
      City.insert(
        {
          name:                     data[1],
          image:                    data[2],
          status:                   data[3],
          user_record:              data[4],
          user_change:              data[4],
          date_record:              Meteor.call('dateNow')['dateNow'],
          date_change:              Meteor.call('dateNow')['dateNow']
        }
      );

      return Meteor.call('msgFeedback', 'sucess', '000');
    }else{
      throw new Meteor.Error(500, msgError);
    }
  },

  /*
    data[0] = 222 (obrigatorio)
    data[1] = name (obrigatorio)
    data[2] = image (obrigatorio)
    data[2] = *status (default: 1)
    data[3] = id da cidade (obrigatorio)

    * status:
      0 = inativo
      1 = ativo
  */
  'updateCity': function(data){
    var msgError = '';
    if(data[0] !== 222){
      msgError = Meteor.call('msgFeedback', 'error', '000');
    }else if(!data[1]){
      msgError = Meteor.call('msgFeedback', 'error', '001');
    }else if(!data[2]){
      msgError = Meteor.call('msgFeedback', 'error', '004');
    }else if(!data[4]){
      msgError = Meteor.call('msgFeedback', 'error', '005') + ' cidade.';
    }

    if(!msgError){
        City.update(
          {_id:data[4]},
          {$set:
            {
              name:           data[1],
              image:          data[2],
              status:         data[3],
              user_change:    data[5],
              date_change:    Meteor.call('dateNow')['dateNow']
            }
          }
        );

      return Meteor.call('msgFeedback', 'sucess', '001');
    }else{
      throw new Meteor.Error(500, msgError);
    }
  },

  /*
    data[0] = 333 (obrigatorio)
    data[1] = id da categoria (obrigatorio)
  */
  'disableCity': function(data){
    var msgError = '';
    if(data[0] !== 333){
      msgError = Meteor.call('msgFeedback', 'error', '000');
    }else if(!data[1]){
      msgError = Meteor.call('msgFeedback', 'error', '005') + ' cidade.';
    }

    if(!msgError){
      City.update(
        {_id:data[1]},
        {$set:
          {
            status:0,
            user_change:data[2],
            date_change:Meteor.call('dateNow')['dateNow']
          }
        }
      );

      return Meteor.call('msgFeedback', 'sucess', '002');
    }else{
      throw new Meteor.Error(500, msgError);
    }
  }
});