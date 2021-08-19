import {combineReducers} from 'redux'
import {tarefaReducer} from './tarefasReducer'
import {mensagensReducer} from './mensagensReducer'
const mainReducer = combineReducers({
  tarefas: tarefaReducer,
  mensagens: mensagensReducer
})

export default mainReducer
