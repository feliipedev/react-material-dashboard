import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { TarefasToolbar, TarefasTable } from './components';
import Button from '@material-ui/core/Button'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar, salvar, deletar, alterarStatus } from '../../store/tarefasReducer'
import {esconderMensagem} from '../../store/mensagensReducer'
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

  useEffect(() => {
    props.listar();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable deleteAction={props.deletar} alterarStatus={props.alterarStatus} tarefas={props.tarefas} />
      </div>
      <Dialog open={props.openDialog} onClose={props.esconderMensagem}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {props.mensagem}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.esconderMensagem}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state =>({
    tarefas: state.tarefas.tarefas,
    mensagem: state.mensagens.mensagem,
    openDialog: state.mensagens.mostrarMensagem
})

const mapDispatchToProps = dispatch => 
  bindActionCreators({listar, salvar, deletar, alterarStatus,esconderMensagem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
