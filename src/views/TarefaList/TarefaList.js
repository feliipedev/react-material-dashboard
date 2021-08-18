import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { TarefasToolbar, TarefasTable } from './components';
import Button from '@material-ui/core/Button'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar } from '../../store/tarefasReducer'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
const TarefaList = (props) => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [menssagem, setMensagem] = useState('')
  const BASE_URL = 'https://minhastarefas-api.herokuapp.com/tarefas'

  const salvar = (tarefa) => {
    axios.post(BASE_URL, tarefa, {
      headers: {
        'x-tenant-id': localStorage.getItem('email_usuario_logado')
      }
    }).then(response => {
      setTarefas([...tarefas, response.data])
      setMensagem('Item adicionado com sucesso')
      setOpenDialog(true)
    }).catch(erro => {
      setMensagem("Ocorreu um erro", erro)
      setOpenDialog(true)
    })
  }
  const listarTarefas = () => {
    axios.get(BASE_URL, {
      headers: {
        'x-tenant-id': localStorage.getItem('email_usuario_logado')
      }
    }).then(result => {
      setTarefas(result.data)
    }).catch(erro => {
      setMensagem("Ocorreu um erro", erro)
      setOpenDialog(true)
    })
  }

  useEffect(() => {
    props.listar();
  }, [])

  const alterarStatus = (id) => {
    axios.patch(`${BASE_URL}/${id}`, null, {
      headers: {
        'x-tenant-id': localStorage.getItem('email_usuario_logado')
      }
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if (tarefa.id === id) {
          tarefa.done = !tarefa.done
        }
      })
      setTarefas(lista)
      setOpenDialog(true)
      setMensagem("Item atualizado com sucesso!")
    }).catch(erro => {
      setMensagem("Ocorreu um erro")
      setOpenDialog(true)
    })
  }

  const deletar = (id) => {
    axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        'x-tenant-id': localStorage.getItem('email_usuario_logado')
      }
    })
      .then(response => {
        const lista = tarefas.filter(tarefa => tarefa.id !== id)
        setTarefas(lista)
        setOpenDialog(true)
        setMensagem("Item deletado com sucesso!")
      }).catch(erro => {
        setMensagem("Ocorreu um erro")
        setOpenDialog(true)
      })
  }

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable deleteAction={deletar} alterarStatus={alterarStatus} tarefas={props.tarefas} />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {menssagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state =>({
    tarefas: state.tarefas.tarefas
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({listar}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
