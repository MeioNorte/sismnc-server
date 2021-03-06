Meteor.methods({
  	/*
    data[0] = 111 (obrigatorio)
    data[1] = *nivel (obrigatorio)
    data[2] = nome (obrigatorio)
	data[3] = avatar (obrigatorio)
	data[4] = email (obrigatorio)
	data[5] = senha
	data[6] = facebook ID
	data[7] = google ID
	data[8] = programa ID (obrigatorio se tiver marcado o nivel como administrador do programa)
    data[9] = *status (default: 1)
	data[10] = id do usuario que cadastrou
	data[11] = telefone

    *
	level:
		0 = usuario comun
		1 = administrador do programa
		2 = administrador do sistema

    status:
      0 = inativo
      1 = ativo
  	*/
	'insertUser': function(data){
	    var msgError = '';
	    if(data[0] !== 111){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1] || !data[2] || !data[3] || !data[4]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }else if(data[1] === 1 && !data[8]){
	      msgError = Meteor.call('msgFeedback', 'error', '009');
	    }

		if(!msgError){
		    var userId = User.insert(
		    	{
	    			level: data[1],
		    		name: data[2],
		    		avatar: data[3],
		    		email: data[4],
		    		password:CryptoJS.MD5(data[11] + data[5]).toString(),
		    		facebook_id: data[6],
		    		google_id: data[7],
		    		program_id: data[8],
		    		status: data[9],
		    		user_record: data[10],
		    		user_change: data[10],
		    		phone: data[11],
		    		confirmphone: true,
		    		date_record:Meteor.call('dateNow')['dateNow'],
		    		date_change:Meteor.call('dateNow')['dateNow']
		    	}
	    	);
	    	return [Meteor.call('msgFeedback', 'sucess', '000'), userId];
		}else{
			throw new Meteor.Error(500, msgError);
		}
	},

	/*
    data[0] = 111 (obrigatorio)
    data[1] = *nivel (obrigatorio)
    data[2] = nome (obrigatorio)
	data[3] = avatar (obrigatorio)
	data[4] = email (obrigatorio)
	data[5] = senha (obrigatorio)
	data[6] = facebook ID
	data[7] = google ID
    data[8] = *status (default: 1)
	data[9] = usuario id (obrigatorio)

    *
	level:
		0 = usuario comun
		1 = administrador do programa
		2 = administrador do sistema

    status:
      0 = inativo
      1 = ativo
  	*/
	'updateUser': function(data){
	    var msgError = '';
	    if(data[0] !== 222){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1] || !data[2] || !data[3] || !data[4] || !data[5]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }else if(data[1] === 1 && !data[8]){
	      msgError = Meteor.call('msgFeedback', 'error', '009');
	    }else if(!data[9]){
	      msgError = Meteor.call('msgFeedback', 'error', '005') + ' usuario.';
	    }

		if(!msgError){
	   		User.update(
	   			{_id:data[10]},
	   			{$set:
	   				{
		    			level: data[1],
			    		name: data[2],
			    		avatar: data[3],
			    		email: data[4],
			    		password:CryptoJS.MD5(data[4] + data[5]).toString(),
			    		facebook_id: data[6],
			    		google_id: data[7],
			    		program_id: data[8],
			    		status: data[9],
			    		user_change: data[11],
			    		date_change:Meteor.call('dateNow')['dateNow']
	   				}
	   			}
   			);

   			return Meteor.call('msgFeedback', 'sucess', '001');
		}else{
		  	throw new Meteor.Error(500, msgError);
		}
	},

	/*
    data[0] = 111 (obrigatorio)
    data[1] = nome (obrigatorio)
	data[2] = email (obrigatorio)
	data[3] = phone
	data[4] = usuario id (obrigatorio)
  	*/
	'updatePerfil': function(data){
	    var msgError = '';
	    if(data[0] !== 222){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1] || !data[2]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }else if(!data[4]){
	      msgError = Meteor.call('msgFeedback', 'error', '005') + ' usuario.';
	    }

		if(!msgError){
	   		User.update(
	   			{_id:data[4]},
	   			{$set:
	   				{
			    		name: data[1],
			    		email: data[2],
			    		phone: (data[3])? data[3] : null,
			    		confirmphone: (data[3])? true : false,
			    		user_change: data[4],
			    		date_change:Meteor.call('dateNow')['dateNow']
	   				}
	   			}
   			);

   			return Meteor.call('msgFeedback', 'sucess', '001');
		}else{
		  	throw new Meteor.Error(500, msgError);
		}
	},

	/*
    data[0] = 111 (obrigatorio)
    data[1] = nome (obrigatorio)
	data[2] = usuario id (obrigatorio)
  	*/
	'updatePerfilPhone': function(data){
	    var msgError = '';
	    if(data[0] !== 222){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }else if(!data[3]){
	      msgError = Meteor.call('msgFeedback', 'error', '005') + ' usuario.';
	    }

		if(!msgError){
	   		User.update(
	   			{_id:data[3]},
	   			{$set:
	   				{
			    		phone: data[1],
			    		confirmphone: (data[2])? data[2] : false,
			    		user_change: data[3],
			    		date_change:Meteor.call('dateNow')['dateNow']
	   				}
	   			}
   			);

   			return Meteor.call('msgFeedback', 'sucess', '001');
		}else{
		  	throw new Meteor.Error(500, msgError);
		}
	},

	/*
    data[0] = 111 (obrigatorio)
    data[1] = confirm phone (obrigatorio)
	data[2] = usuario id (obrigatorio)
  	*/
	'updatePerfilConfirmPhone': function(data){
	    var msgError = '';
	    if(data[0] !== 222){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }else if(!data[2]){
	      msgError = Meteor.call('msgFeedback', 'error', '005') + ' usuario.';
	    }

		if(!msgError){
	   		User.update(
	   			{_id:data[2]},
	   			{$set:
	   				{
			    		confirmphone: (data[1])? data[1] : false,
			    		user_change: data[2],
			    		date_change:Meteor.call('dateNow')['dateNow']
	   				}
	   			}
   			);

   			return Meteor.call('msgFeedback', 'sucess', '001');
		}else{
		  	throw new Meteor.Error(500, msgError);
		}
	},

	/*
    data[0] = 111 (obrigatorio)
    data[1] = avatar (obrigatorio)
	data[2] = usuario id (obrigatorio)
  	*/
	'updatePerfilAvatar': function(data){
	    var msgError = '';
	    if(data[0] !== 222){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }else if(!data[2]){
	      msgError = Meteor.call('msgFeedback', 'error', '005') + ' usuario.';
	    }

		if(!msgError){
	   		User.update(
	   			{_id:data[2]},
	   			{$set:
	   				{
			    		avatar: data[1],
			    		user_change: data[2],
			    		date_change:Meteor.call('dateNow')['dateNow']
	   				}
	   			}
   			);

   			return Meteor.call('msgFeedback', 'sucess', '001');
		}else{
		  	throw new Meteor.Error(500, msgError);
		}
	},

	'deleteUser': function(data){
		if(data[0] === 333){
		  	User.update(
		  		{_id:data[1]},
		  		{$set:
		  			{
		  				status:0,
		  				user_change:Meteor.userId(),
		  				date_change:Meteor.call('dateNow')['dateNow']
		  			}
		  		}
	  		);
		}
	},

	'updateUserPassword': function(data){
		var msgError = '';
	    if(data[0] !== 222){
	      msgError = Meteor.call('msgFeedback', 'error', '000');
	    }else if(!data[1]){
	      msgError = Meteor.call('msgFeedback', 'error', '005');
    	}else if(!data[2] && !data[3]){
	      msgError = Meteor.call('msgFeedback', 'error', '002');
	    }

		if(!msgError){
	   		User.update(
	   			{_id:data[1]},
	   			{$set:
	   				{
	   					password:CryptoJS.MD5(data[2] + data[3]).toString(),
	   					date_change:Meteor.call('dateNow')['dateNow']
	   				}
	   			}
   			);
   			return Meteor.call('msgFeedback', 'sucess', '001');
		}else{
		  throw new Meteor.Error(500, msgError);
		}
	},

	'insertLevel': function(){
		Level.insert({status:1, level:'0', description:'Usuario'});
		Level.insert({status:1, level:'1', description:'Programa'});
		Level.insert({status:1, level:'2', description:'Administrador'});
		return true;
	},

	'insertUserAdmin': function(){
		User.insert(
	    	{
    			level: '2',
	    		name: 'root',
	    		avatar: '/images/avatar.jpg',
	    		email:'r@gmail.com',
	    		password:CryptoJS.MD5('r@gmail.com' + '123').toString(),
	    		facebook_id: null,
	    		google_id: null,
	    		status: 1,
	    		user_record: 1,
	    		user_change: 1,
	    		date_record:Meteor.call('dateNow')['dateNow'],
	    		date_change:Meteor.call('dateNow')['dateNow']
	    	}
    	);
		return true;
	}

});