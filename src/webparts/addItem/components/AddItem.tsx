import * as React from 'react';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import Form from "./Form/Form";
import Formbts from "./Formbts/Formbts";
import "bootstrap/dist/css/bootstrap.min.css"


export interface IColaboradores{
  listItems: any;
}

export default class AddItem extends React.Component<IAddItemProps, IColaboradores,{}> {



  constructor(props){
    super(props);
    this.state = {
      listItems: []
    };
  }
  public async componentDidMount(){
    this.loadList();
  }

  public async loadList(){

    const items: any[] = await sp.web.lists.getById(this.props.lists).items.getAll();
    console.log(items);
    console.log(this.props.lists);
    this.setState({
      listItems: items
    });

  }

  public async componentDidUpdate(){
    console.log(this.state.listItems.length)
  }

  public render(): React.ReactElement<IAddItemProps> {
    return (
      <div className={ styles.addItem }>
        <div className={ styles.container }>

        <TableContainer component={Paper}>
            <Table className={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">Matricula</TableCell>
                  <TableCell align="center">Departamento</TableCell>
                  <TableCell align="center">Cargo</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.listItems.map((row) => (
                  <TableRow key={row.Title}>
                    <TableCell component="th" scope="row">
                      {row.Title}
                    </TableCell>
                    <TableCell align="center">{row.Matricula}</TableCell>
                    <TableCell align="center">{row.Departamento}</TableCell>
                    <TableCell align="center">{row.Cargo}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            {/*
              <Formbts />
            */}
          </div>
          <div>
            <Form handleSave={() => {
              this.loadList();
            }}/>
          </div>
        </div>
      </div>
    );
  }
}
