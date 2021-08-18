import axios from 'axios'

const http = axios.create({
  baseURL : 'https://minhastarefas-api.herokuapp.com'
})
const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE'
}

const ESTADO_INICIAL = {
  tarefas:[]
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) =>{
    switch(action.type){
      case ACTIONS.LISTAR:
        return {...state, tarefas: action.tarefas}
      default:
        return state;
    }
}

export function listar(){
    return dispatch =>{
      http.get('/tarefas',{
        headers: {
          'x-tenant-id': localStorage.getItem('email_usuario_logado')
        }
      }).then(response =>{
        dispatch({
          type: ACTIONS.LISTAR,
          tarefas: response.data
        })
      })
    }  
}
