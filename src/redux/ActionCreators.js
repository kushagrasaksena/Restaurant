import * as ActionTypes from './actionType';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (comment) => ({
    type:ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId,author,rating,comment) => (dispatch) => {
    const newComment={
      dishId:dishId,
      author:author,
      rating:rating,
      comment:comment
    };
    newComment.date=new Date().toISOString();
    return fetch(baseUrl+'comments',{
      method:"POST",
      body:JSON.stringify(newComment),
      headers: {
          "Content-Type":"application/json"
      },
      credentials:"same-origin"
    }
    )
    .then(response=>{
      if(response.ok) return response;
      else{
        var error = new Error('Error '+response.status+': '+response.statusText);
        error.response=response;
        throw error;
      }
    },
    error=>{
      var errmsg = new Error(error.message);
      throw errmsg;
    })
    .then(response=>response.json())
    .then(comments=>dispatch(addComment(comments)))
    .catch(error=>{
      console.log('post comments:',error.message);
      alert("Your comment couldn't be posted\nError "+error.message);
    }); 
  };

  
export const fetchDishes = () => (dispatch) => {
    dispatch(DishLoading());
    
    return fetch(baseUrl+'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmsg = new Error(error.message);
            throw errmsg;
      })
    .then(response=>response.json())
    .then(dishes=>dispatch(addDishes(dishes)))
    .catch(error=>dispatch(DishFailed(error.message)))
}

export const DishLoading=()=>({
    type:ActionTypes.DISHES_LOADING
});

export const DishFailed = (errmsg) => ({
    type:ActionTypes.DISHES_FAILED,
    payload: errmsg
});

export const addDishes = (dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
}); 

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmsg = new Error(error.message);
            throw errmsg;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error=>dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl+'leaders')
  .then(response=>{
    if(response.ok) return response;
    else{
      var error = new Error('Error '+response.status+': '+response.statusText);
      error.response=response;
      throw error;
    }
  },
  error=>{
    var errmsg = new Error(error.message);
    throw errmsg;
  })
  .then(response=>response.json())
  .then(leaders=> dispatch(addLeaders(leaders)))
  .catch(error=> dispatch(leadersFailed(error.message)));
}

export const addLeaders = (leaders) => ({
  type:ActionTypes.ADD_LEADERS,
  payload:leaders
});

export const leadersFailed = (errmsg) => ({
  type:ActionTypes.LEADERS_FAILED,
  payload:errmsg
});

export const leadersLoading = () => ({
  type:ActionTypes.LEADERS_LOADING
});

export const addFeedback = (feedback) => {
  alert("Thank you for your feedback\n"+JSON.stringify(feedback));
  return {
    type:ActionTypes.POST_FEEDBACK,
    payload:feedback
  }
};

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
  const newFeedback = {
      firstname: firstname,
      lastname: lastname,
      telnum: telnum,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message
  };

  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
  })
      .then(response => {
          if (response.ok) {
              return response;
          } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
      },
      error => {
          throw error;
      })
      .then(response => response.json())
      .then(response => dispatch(addFeedback(response)))
      .catch(error => {
          console.log('Post feedbacks ', error.message);
          alert('Your feedback could not be posted\nError: ' + error.message);
      });
};